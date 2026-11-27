const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {createRequire}=require('node:module');
const root=path.join(__dirname,'..'); const read=f=>fs.readFileSync(path.join(root,f),'utf8');
test('panel uses nonce and fixed handlers without persistent credential storage',()=>{
  const h=read('pages/can.html'),c=read('api/sayfa.js');
  assert.match(c,/PANEL_CSP\(n\)/);
  assert.doesNotMatch(c,/script-src[^\n]*unsafe-inline/);
  assert.doesNotMatch(h,/\bon(?:click|input|change|submit)="/);
  assert.doesNotMatch(h,/localStorage\.(?:setItem|getItem)\((?:OTURUM|"kg_gh")/);
  assert.match(h,/TextEncoder/);assert.match(h,/TextDecoder/);
});
test('shared region keys match translated data and archive order',()=>{
  const {ANA,FORMAT,ARSIV,FORMAT_SITEMAP}=require('../data/region-keys');
  assert.equal(new Set(ARSIV).size,ARSIV.length);
  assert.deepEqual([...FORMAT].sort(),[...FORMAT_SITEMAP].sort());
  for(const lang of ['regions','regions.en','regions.ru']){
    const r=require('../data/'+lang);
    for(const k of [...ANA,...FORMAT])assert.ok(r[k],lang+' '+k);
  }
  const r={...require('../data/regions'),...require('../data/regions.ek')};
  const b=require('../data/bolge');
  const canonical=new Set(b.sayfali().map(k=>b.yol(k))); for(const key of canonical)assert.ok(r[key],key);
  for(const key of Object.keys(r))assert.ok(FORMAT.includes(key)||canonical.has(key),key);
});
test('region fallback is temporary and no fabricated current date is rendered',()=>{
  const p=path.join(root,'api','region.js'),mod={exports:{}};
  vm.runInNewContext(read('api/region.js'),{module:mod,require:createRequire(p),fetch:async()=>{throw Error('Unexpected network access')}});
  const reply={writeHead(code,headers){this.code=code;this.headers=headers;},end(){}};
  return Promise.resolve(mod.exports({query:{slug:'girne-merkez-escort',lang:'en'}},reply)).then(()=>{
    assert.equal(reply.code,302);assert.equal(reply.headers['Cache-Control'],'no-store');
    assert.doesNotMatch(read('api/region.js'),/bugun\(dil\)/);
  });
});
test('traffic uses shared server-only secret and does not write when unconfigured',async()=>{
  const mod={exports:{}};
  let called=0;
  vm.runInNewContext(read('data/traffic-server.js'),{module:mod,process:{env:{}},fetch:async()=>{called++;}});
  assert.equal(await mod.exports.writeEvent({},{}),false);
  assert.equal(called,0);
  assert.match(read('api/takip.js'),/writeEvent/);
  assert.match(read('middleware.js'),/traffic\.writeEvent/);
});

test('traffic sends a daily pseudonym rather than a raw IP',async()=>{
  const mod={exports:{}},calls=[];
  const {webcrypto}=require('node:crypto');
  const mockSecret='test-only-32-byte-value-not-production';
  vm.runInNewContext(read('data/traffic-server.js'),{
    module:mod,process:{env:{TRAFFIC_WRITE_SECRET:mockSecret}},
    crypto:webcrypto,TextEncoder,Uint8Array,AbortSignal,
    fetch:async(url,opts)=>{calls.push({url,body:JSON.parse(opts.body)});return {ok:true,json:async()=>true}}
  });
  const result=await mod.exports.writeEvent({'x-vercel-forwarded-for':'192.0.2.17'},{p_yol:'/example',p_tur:'sayfa',p_etiket:'',p_kaynak:'direkt'});
  assert.equal(result,true);assert.equal(calls.length,1);
  assert.match(calls[0].body.p_ip_hash,/^[0-9a-f]{64}$/);
  assert.ok(!JSON.stringify(calls[0]).includes('192.0.2.17'));
});
test('region not found and temporary database failure remain distinct',async()=>{
  const p=path.join(root,'api','region.js');
  for(const [ok,expected] of [[true,404],[false,503]]){
    const mod={exports:{}};
    vm.runInNewContext(read('api/region.js'),{module:mod,require:createRequire(p),fetch:async()=>({ok,json:async()=>[]})});
    const reply={headers:{},setHeader(k,v){this.headers[k]=v},status(n){this.code=n;return this},send(b){this.body=b},writeHead(n,h){this.code=n;Object.assign(this.headers,h)},end(){}};
    await mod.exports({query:{slug:'test-unlisted-page',lang:'tr'}},reply);
    assert.equal(reply.code,expected);assert.equal(reply.headers['Cache-Control'],expected===503?'no-store':'public, max-age=0, s-maxage=300');
  }
});

