const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const panel=fs.readFileSync(path.join(__dirname,'../pages/can.html'),'utf8');
test('cleanup is read-only until the inventory is complete',()=>{
  assert.match(panel,/id="btnSilSec" disabled/);
  const handler=panel.slice(panel.indexOf('el("btnSilSec").onclick='),panel.indexOf('/* DÜZENLE */'));
  assert.doesNotMatch(handler,/api\.remove\s*\(/);
});
test('cleanup refuses incomplete reads and does not nominate protected duplicates',()=>{
  assert.match(panel,/if\(sonHata\)throw new Error/);
  assert.match(panel,/if\(f!==koru&&!korunan\.has\(f\.yol\)&&!korunan\.has\(f\.ad\)\)/);
  assert.match(panel,/Prefer":"count=exact"/);
  assert.doesNotMatch(panel,/api\.tablo\([^\n]+\.catch\(function\(\)\{return\[\]\}\)/);
});
