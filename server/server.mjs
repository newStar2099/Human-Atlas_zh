/** Human Atlas — HTTPS gateway with session auth, password management, and
 * static serving of the built atlas. Default account: admin / admin@2026
 * (seeded on first start; change it from /change-password). */
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import selfsigned from 'selfsigned';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '3443', 10);
const DATA_DIR = process.env.DATA_DIR || '/data';
const DIST_DIR = process.env.DIST_DIR || path.join(__dirname, 'dist');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSION_SECRET_FILE = path.join(DATA_DIR, 'session-secret');
const CERT_DIR = process.env.CERT_DIR || path.join(DATA_DIR, 'certs');
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

fs.mkdirSync(DATA_DIR, {recursive: true});
fs.mkdirSync(CERT_DIR, {recursive: true});

// --- users (scrypt-hashed passwords, seeded with admin/admin@2026) ---------
const hashPassword = (password, salt) => crypto.scryptSync(password, salt, 64).toString('hex');
const verifyPassword = (password, salt, expected) => {
  const actual = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
};
const loadUsers = () => {
  if (fs.existsSync(USERS_FILE)) return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  const salt = crypto.randomBytes(16).toString('hex');
  const seeded = {admin: {salt, hash: hashPassword('admin@2026', salt), createdAt: new Date().toISOString()}};
  fs.writeFileSync(USERS_FILE, JSON.stringify(seeded, null, 2) + '\n');
  console.log('[auth] seeded default account admin / admin@2026 — change it after first login');
  return seeded;
};
let users = loadUsers();
const saveUsers = () => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2) + '\n');

// --- sessions (random tokens, sliding 12h expiry) --------------------------
const sessions = new Map();
const createSession = (username) => {
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, {username, exp: Date.now() + SESSION_TTL_MS});
  return token;
};
const sessionOf = (req) => {
  const match = (req.headers.cookie || '').match(/(?:^|;\s*)atlas_session=([a-f0-9]{64})/);
  if (!match) return null;
  const session = sessions.get(match[1]);
  if (!session || session.exp < Date.now()) {sessions.delete(match[1]); return null;}
  return {token: match[1], ...session};
};

// --- TLS: mounted certs win, otherwise generate a self-signed pair ---------
let credentials;
const certFile = path.join(CERT_DIR, 'cert.pem'), keyFile = path.join(CERT_DIR, 'key.pem');
if (fs.existsSync(certFile) && fs.existsSync(keyFile)) {
  credentials = {key: fs.readFileSync(keyFile), cert: fs.readFileSync(certFile)};
  console.log('[tls] using certificates from', CERT_DIR);
} else {
  const generated = selfsigned.generate([{name: 'commonName', value: 'human-atlas.local'}], {days: 3650, keySize: 2048, algorithm: 'sha256'});
  fs.writeFileSync(certFile, generated.cert);
  fs.writeFileSync(keyFile, generated.private);
  credentials = {key: generated.private, cert: generated.cert};
  console.log('[tls] generated self-signed certificate (browsers will warn — mount certs into', CERT_DIR, 'to trust your own)');
}

const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: '1d'}));
app.use(express.json({limit: '64kb'}));

const page = (title, body) => `<!doctype html><html lang="zh"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${title}</title><style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:11vh;background:radial-gradient(1100px 600px at 50% -8%,#d7ecdf,transparent 70%),linear-gradient(165deg,#f2f9f4,#e3f0e7 55%,#d9ebe0);font-family:system-ui,-apple-system,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;color:#1f3327}
.card{background:#ffffffd9;border:1px solid #16a34a26;border-radius:20px;padding:34px 34px 30px;width:min(92vw,400px);box-shadow:0 24px 60px #14532d18,0 2px 8px #14532d0d;backdrop-filter:blur(10px)}
.hero{display:block;width:112px;height:112px;object-fit:contain;margin:0 auto 6px}
.hero.small{width:84px;height:84px;margin-bottom:10px}
h1{margin:2px 0 4px;font-size:21px;text-align:center;color:#14532d;letter-spacing:.02em}
.sub{margin:0 0 20px;color:#5c7263;font-size:13px;text-align:center}
label{display:block;margin:12px 0 6px;font-size:13px;color:#3d5a4a;font-weight:500}
input{width:100%;padding:10px 12px;border-radius:9px;border:1px solid #16a34a30;background:#f6fbf8;color:#1f3327;font-size:14px;transition:border .15s,box-shadow .15s}
input:focus{outline:none;border-color:#16a34a;box-shadow:0 0 0 3px #16a34a1f;background:#fff}
button{width:100%;margin-top:20px;padding:11px;border:0;border-radius:9px;background:linear-gradient(135deg,#15803d,#16a34a);color:#fff;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 6px 16px #16a34a33;transition:background .15s,transform .1s}
button:hover{background:#15803d}button:active{transform:translateY(1px)}
.msg{margin-top:14px;font-size:13px;min-height:18px;text-align:center}.msg.err{color:#dc2626}.msg.ok{color:#15803d}
a{color:#15803d;font-size:13px;text-decoration:none}a:hover{text-decoration:underline}
.row{display:flex;justify-content:space-between;margin-top:16px}
</style></head><body><div class="card">${body}</div></body></html>`;

const loginPage = (error = '') => page('登录 · 人体图谱', `
<img class="hero" src="/assets/robot.png" alt=""/><h1>人体图谱</h1><p class="sub">请登录以继续访问</p>
<form id="f"><label>用户名</label><input name="username" autocomplete="username" required/>
<label>密码</label><input name="password" type="password" autocomplete="current-password" required/>
<button type="submit">登 录</button><div class="msg err">${error}</div></form>
<script>
document.getElementById('f').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target, msg = document.querySelector('.msg');
  msg.className = 'msg'; msg.textContent = '登录中…';
  const response = await fetch('/api/login', {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: form.username.value, password: form.password.value})});
  if (response.ok) { location.href = '/'; return; }
  msg.className = 'msg err'; msg.textContent = (await response.json().catch(() => ({}))).error ?? '登录失败';
});
</script>`);
const changePage = (username, error = '', ok = '') => page('修改密码 · 人体图谱', `
<img class="hero small" src="/assets/userpassword.png" alt=""/><h1>修改密码</h1><p class="sub">当前用户：${username}</p>
<form id="f"><label>当前密码</label><input name="current" type="password" autocomplete="current-password" required/>
<label>新密码（至少 8 位）</label><input name="next" type="password" autocomplete="new-password" required minlength="8"/>
<label>确认新密码</label><input name="confirm" type="password" autocomplete="new-password" required minlength="8"/>
<button type="submit">保存新密码</button><div class="msg err">${error}</div><div class="msg ok">${ok}</div></form>
<div class="row"><a href="/">返回图谱</a><a href="#" id="logout">退出登录</a></div>
<script>
document.getElementById('f').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target, err = document.querySelector('.msg.err'), ok = document.querySelector('.msg.ok');
  err.textContent = ok.textContent = '';
  if (form.next.value !== form.confirm.value) { err.textContent = '两次输入的新密码不一致'; return; }
  const response = await fetch('/api/change-password', {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({currentPassword: form.current.value, newPassword: form.next.value})});
  const data = await response.json().catch(() => ({}));
  if (response.ok) { ok.textContent = '密码已修改，下次登录请使用新密码'; form.reset(); return; }
  err.textContent = data.error ?? '修改失败';
});
document.getElementById('logout').addEventListener('click', async (event) => {
  event.preventDefault(); await fetch('/api/logout', {method: 'POST'}); location.href = '/login';
});
</script>`);

// --- auth API ---------------------------------------------------------------
app.post('/api/login', (req, res) => {
  const {username, password} = req.body ?? {};
  const user = username && users[username];
  if (!user || !verifyPassword(String(password ?? ''), user.salt, user.hash)) {
    return res.status(401).json({error: '用户名或密码错误'});
  }
  const token = createSession(username);
  res.setHeader('Set-Cookie', `atlas_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}`);
  res.json({ok: true});
});

app.post('/api/logout', (req, res) => {
  const session = sessionOf(req);
  if (session) sessions.delete(session.token);
  res.setHeader('Set-Cookie', 'atlas_session=; Path=/; HttpOnly; Max-Age=0');
  res.json({ok: true});
});

app.post('/api/change-password', (req, res) => {
  const session = sessionOf(req);
  if (!session) return res.status(401).json({error: '登录状态已过期，请重新登录'});
  const {currentPassword, newPassword} = req.body ?? {};
  const user = users[session.username];
  if (!currentPassword || !verifyPassword(String(currentPassword), user.salt, user.hash)) {
    return res.status(400).json({error: '当前密码不正确'});
  }
  if (typeof newPassword !== 'string' || newPassword.length < 8) {
    return res.status(400).json({error: '新密码至少需要 8 个字符'});
  }
  const salt = crypto.randomBytes(16).toString('hex');
  users[session.username] = {salt, hash: hashPassword(newPassword, salt), updatedAt: new Date().toISOString()};
  saveUsers();
  sessions.clear();
  const token = createSession(session.username);
  res.setHeader('Set-Cookie', `atlas_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}`);
  res.json({ok: true});
});

// --- pages ------------------------------------------------------------------
app.get('/login', (req, res) => res.type('html').send(loginPage()));
app.get('/change-password', (req, res) => {
  const session = sessionOf(req);
  if (!session) return res.redirect('/login');
  res.type('html').send(changePage(session.username));
});

// --- everything else requires a session -------------------------------------
app.use((req, res, next) => {
  if (sessionOf(req)) return next();
  if (req.method === 'GET' && (req.path === '/' || req.path.startsWith('/assets') || req.path.startsWith('/models'))) {
    return res.redirect('/login');
  }
  return res.status(401).json({error: '未登录'});
});
app.use(express.static(DIST_DIR, {index: false, maxAge: '1h'}));
app.get('/', (req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
app.use((req, res) => res.status(404).send('Not found'));

import {createServer as createHttps} from 'node:https';
createHttps(credentials, app).listen(PORT, '0.0.0.0', () => {
  console.log(`[human-atlas] serving ${DIST_DIR} at https://0.0.0.0:${PORT} (default account: admin / admin@2026)`);
});
