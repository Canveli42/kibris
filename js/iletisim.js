(function(){
  var TG = 'kibrisescortvip';
  var GEN = "Merhaba, RedKıbrıs'tan yazıyorum. Bilgi almak istiyorum.";
  var REG = {
    'girne':'Girne','lefkosa':'Lefkoşa','magusa':'Mağusa','iskele':'İskele','guzelyurt':'Güzelyurt',
    'karaoglanoglu':'Karaoğlanlı','alsancak':'Alsancak','lapta':'Lapta','catalkoy':'Çatalköy',
    'bellapais':'Bellapais','esentepe':'Esentepe','long-beach':'Long Beach','bafra':'Bafra','gonyeli':'Gönyeli',
    'otele':'Otele','eve-gelen':'Eve gelen','gecelik':'Gecelik','vip':'VIP','ogrenci':'Öğrenci',
    'turk':'Türk','rus':'Rus'
  };

  function segs(){
    var p = location.pathname.replace(/^\/+|\/+$/g,'');
    return p ? p.split('/') : [];
  }
  function qp(){
    try { return new URLSearchParams(location.search); }
    catch(e){ return { get:function(){ return null; } }; }
  }

  function message(){
    var s = segs(), q = qp();
    var slug = String(q.get('slug') || q.get('b') || '').replace(/-escort$/,'');
    if(!slug && s.length){
      var last = s[s.length-1];
      if(REG[last]) slug = last;
      else { var m = last.match(/^(.+)-escort$/); if(m && REG[m[1]]) slug = m[1]; }
    }
    if(slug && REG[slug]){
      return "Merhaba, RedKıbrıs " + REG[slug] + " bölgesi için yazıyorum. Bilgi almak istiyorum.";
    }
    if(s[0] === 'blog'){
      var h = document.querySelector('h1');
      var t = h ? h.textContent.trim() : '';
      if(t) return 'Merhaba, RedKıbrıs\'ta "' + t + '" yazısını okudum. Bilgi almak istiyorum.';
      return GEN;
    }
    if(s[0] === 'fiyatlar') return "Merhaba, RedKıbrıs fiyatları hakkında bilgi almak istiyorum.";
    if(s[0] === 'iletisim') return "Merhaba, RedKıbrıs iletişim sayfasından yazıyorum.";
    return GEN;
  }

  function base(a){
    var h = a.getAttribute('href') || '';
    var clean = h.split('?')[0];
    if(!/wa\.me|api\.whatsapp\.com|t\.me/.test(clean)) return '';
    if(a.dataset.base !== clean) a.dataset.base = clean;
    return clean;
  }

  function patch(a){
    var b = base(a);
    if(!b) return;
    var next = b + '?text=' + encodeURIComponent(message());
    if(a.getAttribute('href') !== next) a.setAttribute('href', next);
  }

  function all(){
    document.querySelectorAll('a[href*="wa.me"],a[href*="t.me"],a[href*="api.whatsapp.com"]')
      .forEach(patch);
  }

  function tgTwin(){
    var wa = document.querySelector('a.btn[href*="wa.me"]');
    if(!wa) return;
    var sib = wa.parentNode.querySelector('a.tg');
    if(sib) return;
    var a = wa.cloneNode(true);
    a.removeAttribute('id');
    a.removeAttribute('data-base');
    a.classList.add('tg');
    a.setAttribute('href', 'https://t.me/' + TG);
    a.textContent = 'Telegram';
    wa.parentNode.insertBefore(a, wa.nextSibling);
  }

  function style(){
    if(document.getElementById('tg-style')) return;
    var s = document.createElement('style');
    s.id = 'tg-style';
    s.textContent = 'a.btn.tg{background:linear-gradient(180deg,#4bb8ea,#229ed9);color:#04202e;box-shadow:0 10px 26px rgba(34,158,217,.24)}';
    document.head.appendChild(s);
  }

  document.addEventListener('DOMContentLoaded', function(){
    style();
    tgTwin();
    all();
    new MutationObserver(function(muts){
      muts.forEach(function(m){
        if(m.type === 'attributes' && m.target.tagName === 'A') patch(m.target);
      });
    }).observe(document.body, { subtree:true, attributes:true, attributeFilter:['href'] });
    [400,1200,2500,4000].forEach(function(t){ setTimeout(all, t); });
  });
})();
