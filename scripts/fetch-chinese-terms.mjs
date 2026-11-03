/** Build the Chinese anatomical vocabulary the viewer ships.
 * Usage: node scripts/fetch-chinese-terms.mjs
 *
 * Mirrors fetch-arabic-terms.mjs: concepts carry FMA identifiers, and Wikidata
 * records the same identifier via property P1402. The zh rdfs:label is taken
 * as-is — Chinese has no agreement composition, so no post-processing is
 * needed, and concepts without a zh label stay in English.
 *
 * Output: `app/terms-zh.json`, read by the interface.
 */
import fs from 'node:fs';

const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const male=read('public/models/atlas.json'),female=read('public/models/atlas-female.json');
const cachePath=new URL('scripts/chinese-wikidata.cache.json',root);

const reviewPath=new URL('scripts/chinese-review.json',root);
const review=fs.existsSync(reviewPath)?JSON.parse(fs.readFileSync(reviewPath,'utf8')):{};
const fmaOf=id=>/^FMA\d+$/.test(id)?id.slice(3):null;
const nameToFma=new Map();
for(const atlas of [male,female]){
 for(const concept of atlas.concepts){
  const fma=fmaOf(concept.id);
  if(fma && !nameToFma.has(concept.name.toLowerCase().trim())) nameToFma.set(concept.name.toLowerCase().trim(),fma);
 }
}
const wanted=[...new Set(nameToFma.values())];
console.log('concepts:',nameToFma.size,'unique FMA ids:',wanted.length);

let cache=fs.existsSync(cachePath)?new Map(JSON.parse(fs.readFileSync(cachePath,'utf8'))):new Map();
const endpoint='https://query.wikidata.org/sparql';
const size=350;
for(let i=0;i<wanted.length;i+=size){
 const slice=wanted.slice(i,i+size);
 const query=`SELECT ?fma ?zh WHERE { VALUES ?fma { ${slice.map(x=>`"${x}"`).join(' ')} } ?item wdt:P1402 ?fma . OPTIONAL { ?item rdfs:label ?zh . FILTER(LANG(?zh) IN ("zh","zh-cn","zh-hans")) } }`;
 const response=await fetch(`${endpoint}?format=json&query=${encodeURIComponent(query)}`,
  {headers:{Accept:'application/sparql-results+json','User-Agent':'human-atlas/1.0 (anatomy viewer; Chinese terminology build)'}});
 if(!response.ok){console.error(`  Wikidata returned ${response.status} for batch ${i}; keeping what is cached`);continue;}
 for(const row of (await response.json()).results.bindings){
  if(row.zh?.value && !cache.has(row.fma.value)) cache.set(row.fma.value,row.zh.value);
 }
 process.stderr.write(`  ${Math.min(i+size,wanted.length)}/${wanted.length}\r`);
 await new Promise(resolve=>setTimeout(resolve,400));
}
fs.writeFileSync(cachePath,JSON.stringify([...cache],null,0));
console.log(`\nWikidata gave Chinese terms for ${cache.size} of ${wanted.length} identifiers.`);

const out={...review};
let hit=0;
for(const [name,fma] of nameToFma){
 const label=cache.get(fma);
 if(label&&!out[name]){out[name]=label;hit++;}
}
fs.writeFileSync(new URL('app/terms-zh.json',root),JSON.stringify(out,null,1)+'\n');
console.log('zh terms written:',hit,'/',nameToFma.size,'(',Math.round(hit/nameToFma.size*100),'% coverage )');
