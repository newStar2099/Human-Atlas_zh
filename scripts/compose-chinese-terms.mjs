/** Compose Chinese anatomical names (clean rebuild). */
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const male=read('public/models/atlas.json'),female=read('public/models/atlas-female.json');
const review=read('scripts/chinese-review.json');
const WORDS={"1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","10":"10","11":"11","12":"12","branch":"支","trunk":"干","wall":"壁","cavity":"腔","apex":"尖","base":"底","head":"头","neck":"颈","body":"体","shaft":"体","wing":"翼","process":"突","tubercle":"结节","condyle":"髁","fossa":"窝","foramen":"孔","canal":"管","groove":"沟","sulcus":"沟","gyrus":"回","notch":"切迹","spine":"棘","tuberosity":"粗隆","ramus":"支","hiatus":"裂孔","fovea":"凹","septum":"隔","isthmus":"峡","horn":"角","lobe":"叶","border":"缘","margin":"缘","surface":"面","aspect":"面","part":"部","portion":"部","area":"区","space":"隙","junction":"连接","sinus":"窦","recess":"隐窝","eminence":"隆起","crest":"嵴","line":"线","angle":"角","artery":"动脉","vein":"静脉","nerve":"神经","muscle":"肌","ligament":"韧带","cartilage":"软骨","tendon":"腱","fascia":"筋膜","bone":"骨","membrane":"膜","gland":"腺","organ":"器官","cord":"索","plexus":"丛","ganglion":"神经节","node":"结","duct":"管","valve":"瓣","chamber":"腔","atrium":"房","ventricle":"室","disk":"盘","joint":"关节","bursa":"囊","marrow":"髓","trabecula":"小梁","tonsil":"扁桃体","pedicle":"椎弓根","lamina":"板","meninx":"脑膜","posterior":"后","anterior":"前","superior":"上","inferior":"下","medial":"内侧","lateral":"外侧","intermediate":"中间","middle":"中","internal":"内","external":"外","common":"总","deep":"深","superficial":"浅","proximal":"近端","distal":"远端","dorsal":"背","ventral":"腹","palmar":"掌","plantar":"足底","basal":"底","apical":"尖","upper":"上","lower":"下","inner":"内","outer":"外","descending":"降","ascending":"升","interventricular":"室间","intercostal":"肋间","epigastric":"腹壁","musculophrenic":"肌膈","thyrocervical":"甲状颈","costocervical":"肋颈","subclavian":"锁骨下","carotid":"颈","vertebral":"椎","thoracic":"胸","esophageal":"食管","lingular":"舌段","lobar":"叶","segmental":"段","subsegmental":"亚段","pulmonary":"肺","coronary":"冠","mesenteric":"肠系膜","iliac":"髂","axillary":"腋","brachial":"肱","radial":"桡","ulnar":"尺","femoral":"股","tibial":"胫","peroneal":"腓","jugular":"颈静脉","saphenous":"隐","cephalic":"头静脉","basilic":"贵要","hepatic":"肝","splenic":"脾","gastric":"胃","renal":"肾","cystic":"胆囊","pancreatic":"胰","dorsalis":"背","pollicis":"拇","hallucis":"踇","digiti":"指","digitorum":"指","minimi":"小","brevis":"短","longus":"长","accessorius":"方","princeps":"主要","alveolar":"牙槽","supraorbital":"眶上","infraorbital":"眶下","mental":"颏","nasociliary":"鼻睫","laryngeal":"喉","glosso":"舌","pharyngeal":"咽","palatine":"腭","buccal":"颊","zygomatic":"颧","lacrimal":"泪","ethmoid":"筛","frontal":"额","maxillary":"上颌","sphenoid":"蝶","occipital":"枕","temporal":"颞","parietal":"顶","facial":"面","abducens":"展","trochlear":"滑","oculomotor":"动","hypoglossal":"舌下","vagus":"迷","trigeminal":"三叉","median":"正中","sciatic":"坐","obturator":"闭孔","genicular":"膝","tarsal":"跗","digital":"指","lumbar":"腰","sacral":"骶","coccygeal":"尾","cervical":"颈","abductor":"展","adductor":"收","flexor":"屈","extensor":"伸","opponens":"对掌","varix":"静脉曲张","submandibular":"下颌下","sublingual":"舌下","parotid":"腮","submental":"颏下","suprascapular":"肩胛上","suprarenal":"肾上腺","adrenal":"肾上腺","phrenic":"膈","umbilical":"脐","colic":"结肠","ileal":"回肠","jejunal":"空肠","appendicular":"阑尾","pancreaticoduodenal":"胰十二指肠","gastroepiploic":"胃网膜","cystica":"胆囊","mediana":"正中","basilica":"贵要","profunda":"深","superficialis":"浅","anastomotica":"吻合","magna":"大","media":"中","sinistrum":"","dextrum":"","segment":"段","finger":"指","tributary":"属支","foot":"足","toe":"趾","secondary":"副","tooth":"牙","bronchial":"支气管","proper":"固有","calyx":"盏","liver":"肝","limb":"肢","cerebellar":"小脑","bronchopulmonary":"支气管肺","arch":"弓","compartment":"间隔","hand":"手","symphysis":"联合","ring":"环","knee":"膝","papilla":"乳头","pyramid":"锥体","costal":"肋","interosseous":"骨间","system":"系统","capitis":"头","central":"中央","little":"小","pectoral":"胸","biliary":"胆","index":"示指","hemisphere":"半球","cortex":"皮质","nose":"鼻","thoracis":"胸","free":"游离","thoraco-acromial":"胸肩峰","incisor":"切牙","molar":"磨牙","orbital":"眶","skeleton":"骨骼","a":"","b":"","c":"","kidney":"肾","femur":"股骨","girdle":"带","eyeball":"眼球","eyelid":"眼睑","great":"踇","subcostal":"肋下","leaflet":"瓣尖","cusp":"瓣尖","testis":"睾丸","femoris":"股","carpi":"腕","metatarsus":"跖","phalanx":"指骨","phalanges":"指骨","nucleus":"核","cornu":"角","thoracicus":"胸","lumborum":"腰","servi":"","veins":"静脉","arteries":"动脉","bronchi":"支气管","hilum":"门","urethra":"尿道","rectum":"直肠","appendix":"阑尾","duodenum":"十二指肠","jejunum":"空肠","ileum":"回肠","colon":"结肠","stomach":"胃","esophagus":"食管","pharynx":"咽","larynx":"喉","tongue":"舌","tissue":"组织","plica":"襞","villus":"绒毛","tuber":"隆起","uncus":"钩","sella":"鞍","clivus":"斜坡","torus":"圆枕","ala":"翼","corniculate":"小角","cricoid":"环状","arytenoid":"杓状","epiglottic":"会厌","thyroid":"甲状","hyoid":"舌骨","styloid":"茎突","mastoid":"乳突","zygomaticus":"颧","levator":"提肌","depressor":"降肌","scapulae":"肩胛","clavicula":"锁骨","male-derived":"借自男性","crico-arytenoid":"环杓","donor":"供体","in-vivo":"活体","temporo-occipital":"颞枕","thyro-arytenoid":"甲杓","pre-hepatic":"肝前","supra-orbital":"眶上","schlemm's":"施莱姆管","antero-medial":"前内侧","in":"内","vivo":"活体","shoulder":"肩","postero-medial":"后内侧","antero-superior":"前上","postero-superior":"后上","cricothyroid":"环甲","lens":"晶状体","retina":"视网膜","suspensory":"悬","forebrain":"前脑","parahippocampal":"海马旁","geniculate":"膝状体","conjunctiva":"结膜","nuclei":"核","hth":"","rostral":"嘴侧","ocular":"眼","cruciate":"交叉","enthesis":"附着点","large":"大","rectal":"直肠","sector":"扇区","gluteal":"臀","pudendal":"阴部","penis":"阴茎","rotator":"旋转","intrapulmonary":"肺内","intrinsic":"内在","musculature":"肌系统","colli":"颈","posteromedial":"后内侧","paracentral":"中央旁","pericallosal":"胼周","angular":"角回","postcentral":"中央后","canine":"尖牙","jaw":"颌","stria":"纹","nuclear":"核","complex":"复合体","urinary":"尿","spleen":"脾","abdomen":"腹","fibularis":"腓骨","subscapular":"肩胛下","cervicis":"颈","carpal":"腕","acromial":"肩峰","clavicular":"锁骨","arm":"臂","wrist":"腕","interossei":"骨间肌","first":"第1","second":"第2","third":"第3","diaphragmatic":"膈","mediastinal":"纵隔","interlobar":"叶间","parieto":"顶","occipito":"枕","subclavius":"锁骨下肌"," scalenus":"斜角肌","medialis":"内侧","lateralis":"外侧","cervicalis":"颈","coracoid":"喙","acromion":"肩峰","spinous":"棘","transverse":"横","foramina":"孔","canaliculus":"小管","rete":"网","vasa":"血管","vasorum":"滋养","rectus":"直","obliquus":"斜","gemellus":"孖","piriformis":"梨状","subcutaneous":"皮下","adipose":"脂肪","membranes":"膜","cranii":"颅","colliculus":"丘","chest":"胸","uterine":"子宫","humeral":"肱","forearm":"前臂","ophthalmic":"眼","callosomarginal":"胼缘","layer":"层","matter":"质","thigh":"股","leg":"腿","collateral":"侧副","choroidal":"脉络膜","side":"侧","lung":"肺","extraocular":"眼外","recurrent":"返","systemic":"系统","insular":"岛","pontine":"脑桥","heart":"心","mediastinum":"纵隔","eye":"眼","content":"内容物","tube":"管","intestine":"肠","nasal":"鼻","premolar":"前磨牙","peduncle":"脚","division":"部分","white":"白","myocardium":"心肌","vasculature":"血管系统","muscles":"肌肉","hepatovenous":"肝静脉","pelvis":"骨盆","thumb":"拇指","big":"踇","communicating":"交通","capsule":"囊","brachium":"臂","lobule":"小叶","uterus":"子宫","blood":"血","compact":"密质","spongy":"松质","anterolateral":"前外侧","scalenus":"斜角肌","left":"左","right":"右","rib":"肋","conus":"圆锥","visceral":"脏","pleural":"胸膜","pericardial":"心包","cranial":"颅","spinal":"脊","muscular":"肌","palpebral":"睑","hemi":"半","diaphysis":"骨干","epiphysis":"骺","metaphysis":"干骺端","apophysis":"突起","tree":"树","ligaments":"韧带"};
const BUILTIN={"anterior descending branch":"前降支","posterior interventricular branch":"后室间支","anterior interventricular branch":"前室间支","great toe":"踇趾","little toe":"小趾","biliary tree":"胆道树","hepatic biliary tree":"肝胆道树","proper hepatic artery":"肝固有动脉","proper palmar digital artery":"指掌侧固有动脉","common palmar digital artery":"指掌侧总动脉","splenius capitis":"头夹肌","splenius cervicis":"颈夹肌","longissimus capitis":"头最长肌","semispinalis capitis":"头半棘肌","iliocostalis thoracis":"胸髂肋肌","iliocostalis lumborum":"腰髂肋肌","iliocostalis cervicis":"颈髂肋肌","longissimus thoracis":"胸最长肌","spinalis thoracis":"胸棘肌","flexor digitorum profundus":"指深屈肌","abductor digiti minimi":"小指展肌"};
const {phrases}=read('scripts/anatomy-stems-zh.json');
const table={...phrases,...BUILTIN};
const ORDINALS={first:'第1',second:'第2',third:'第3',fourth:'第4',fifth:'第5',sixth:'第6',seventh:'第7',eighth:'第8',ninth:'第9',tenth:'第10',eleventh:'第11',twelfth:'第12','1st':'第1','2nd':'第2','3rd':'第3','4th':'第4','5th':'第5'};
const SIDE={left:'左',right:'右'};
const translateSegment=(segment)=>{
 let rest=segment.toLowerCase().trim(),side='',ordinal='';
 if(table[rest])return table[rest];
 let m;
 while((m=rest.match(/^(left|right)\b/))){side=SIDE[m[1]];rest=rest.slice(m[0].length).trim();}
 while((m=rest.match(/^(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|[1-5](?:st|nd|rd|th))\b/))){ordinal=ORDINALS[m[1]];rest=rest.slice(m[0].length).trim();}
 if(!rest)return null;
 if(table[rest])return side+ordinal+table[rest];
 const parts=[];
 for(const word of rest.split(/\s+/)){
  const stem=WORDS[word]??table[word]??(word.endsWith('ies')?WORDS[word.slice(0,-3)+'y']:undefined)??(word.endsWith('es')?WORDS[word.slice(0,-2)]:undefined)??(word.endsWith('s')?WORDS[word.slice(0,-1)]??table[word.slice(0,-1)]:undefined);
  if(stem===undefined)return null;
  parts.push(stem);
 }
 return side+ordinal+parts.join('');
};
const compose=(name)=>{
 let rest=name.toLowerCase().trim(),side='';
 let m;
 while((m=rest.match(/\s*\((left|right)\)$/))){side=SIDE[m[1]];rest=rest.slice(0,m.index).trim();}
 while((m=rest.match(/^(left|right)\b/))){side=SIDE[m[1]];rest=rest.slice(m[0].length).trim();}
 rest=rest.replace(/^set of /,'');
 const segments=rest.split(' of ').map(s=>s.trim()).filter(Boolean);
 const composed=[];
 for(const segment of segments){
  const zh=translateSegment(segment);
  if(zh===null)return null;
  composed.push(zh);
 }
 if(side)composed[0]=side+composed[0];
 let zh=composed.reverse().join('');
 if(/\bphalanx\b/.test(name)&&/\bfoot\b|\btoe\b/.test(name))zh=zh.replace(/指骨/g,'趾骨');
 return zh;
};
const names=new Map();
for(const atlas of [male,female]) for(const concept of atlas.concepts){
 const key=concept.name.toLowerCase().trim();
 if(!names.has(key))names.set(key,concept.name);
}
// wikidata labels joined by FMA id from the cached fetch
const cache=new Map(read('scripts/chinese-wikidata.cache.json'));
const fmaOf=id=>/^FMA\d+$/.test(id)?id.slice(3):null;
const byName={};
for(const atlas of [male,female]) for(const concept of atlas.concepts){
 const fma=fmaOf(concept.id);
 if(fma&&!byName[concept.name.toLowerCase().trim()]){
  const label=cache.get(fma);
  if(typeof label==='string'&&label)byName[concept.name.toLowerCase().trim()]=label;
 }
}
const out={...review};
let composedCount=0;
const failures=[];
for(const [key,original] of names){
 if(out[key])continue;
 const wikidata=byName[key];
 if(wikidata){out[key]=wikidata;continue;}
 const zh=compose(original);
 if(zh){out[key]=zh;composedCount++;}
 else failures.push(original);
}
fs.writeFileSync(new URL('app/terms-zh.json',root),JSON.stringify(out,null,1)+'\n');
fs.writeFileSync(new URL('scripts/chinese-compose-failures.json',root),JSON.stringify(failures,null,1)+'\n');
console.log('unique concepts:',names.size);
console.log('final coverage:',Object.keys(out).length,'(',Math.round(Object.keys(out).length/names.size*100),'% )');
console.log('composed this run:',composedCount,'| still english:',failures.length);
