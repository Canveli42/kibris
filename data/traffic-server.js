// Server-only: secret is configured in Vercel, never shipped to browsers.
const SB='https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY='sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const readHeader=(headers,name)=>typeof headers.get==='function'?headers.get(name):headers[name];
async function writeEvent(headers,event){
  const secret=process.env.TRAFFIC_WRITE_SECRET;
  if (!secret || secret.length<32) {
    // Temporary compatibility: the old RPC is globally capped in the database.
    // After it is revoked this path cannot write.
    try {const r=await fetch(SB+'/rest/v1/rpc/event_yaz',{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify(event),signal:AbortSignal.timeout(4000)});return r.ok;}catch(_){return false;}
  }
  try{
    const raw=String(readHeader(headers,'x-vercel-forwarded-for')||'unknown').trim().slice(0,64);
    const ip=/^[0-9a-fA-F:.]+$/.test(raw)?raw:'unknown';
    const encoder=new TextEncoder();
    const key=await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
    const hash=Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,encoder.encode(new Date().toISOString().slice(0,10)+':'+ip))),n=>n.toString(16).padStart(2,'0')).join('');
    const r=await fetch(SB+'/rest/v1/rpc/event_yaz_v2',{
      method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},
      body:JSON.stringify({...event,p_secret:secret,p_ip_hash:hash}),signal:AbortSignal.timeout(4000)
    });
    return r.ok && await r.json()===true;
  }catch(_){return false;}
}
module.exports={writeEvent};
