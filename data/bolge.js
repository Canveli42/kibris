// data/bolge.js — tek bölge kayıt defteri

const K = {
  girne:                { ad:['Girne','Kyrenia','Кирения'], il:'girne', ust:null, alt:true, pg:'girne-escort', hb:'girne' },
  'girne-merkez':       { ad:['Girne Merkez','Kyrenia Centre','Центр Кирении'], il:'girne', ust:'girne', pg:'girne-merkez-escort', hb:'girne-merkez' },
  'girne-liman':        { ad:['Girne Liman','Kyrenia Harbour','Порт Кирении'], il:'girne', ust:'girne', pg:'girne-liman-escort', hb:'girne-liman' },
  'girne-zeytinlik':    { ad:['Zeytinlik','Zeytinlik','Зейтинлик'], il:'girne', ust:'girne', pg:'girne-zeytinlik-escort', hb:'zeytinlik' },
  'girne-karakum':      { ad:['Karakum','Karakum','Каракум'], il:'girne', ust:'girne', pg:'girne-karakum-escort', hb:'karakum' },
  'girne-nusmar':       { ad:['Nusmar','Nusmar','Нусмар'], il:'girne', ust:'girne', pg:'girne-nusmar-escort', hb:'nusmar' },
  'girne-karmi':        { ad:['Karmi','Karmi','Карми'], il:'girne', ust:'girne', pg:'girne-karmi-escort', hb:'karmi' },
  'girne-karaoglanoglu':{ ad:['Karaoğlanoğlu','Karaoglanoglu','Караогланоглу'], il:'girne', ust:'girne', pg:'karaoglanoglu-escort', hb:'karaoglanoglu' },
  'girne-catalkoy':     { ad:['Çatalköy','Catalkoy','Чаталкёй'], il:'girne', ust:'girne', pg:'catalkoy-escort', hb:'catalkoy' },
  'girne-bellapais':    { ad:['Bellapais','Bellapais','Беллапаис'], il:'girne', ust:'girne', pg:'bellapais-escort', hb:'bellapais' },
  'girne-esentepe':     { ad:['Esentepe','Esentepe','Эсентепе'], il:'girne', ust:'girne', pg:'esentepe-escort', hb:'esentepe' },
  'girne-karaman':      { ad:['Karaman','Karaman','Караман'], il:'girne', ust:'girne', pg:'girne-karaman-escort', hb:'karaman' },
  'girne-karsiyaka':    { ad:['Karşıyaka','Karsiyaka','Каршияка'], il:'girne', ust:'girne', pg:'girne-karsiyaka-escort', hb:'karsiyaka' },
  'girne-ozankoy':      { ad:['Ozanköy','Ozankoy','Озанкёй'], il:'girne', ust:'girne', pg:'girne-ozankoy-escort', hb:'ozankoy' },
  'girne-edremit':      { ad:['Edremit','Edremit','Эдремит'], il:'girne', ust:'girne', pg:'girne-edremit-escort', hb:'edremit' },
  'girne-bogaz':        { ad:['Boğaz','Bogaz','Богаз'], il:'girne', ust:'girne', pg:'girne-bogaz-escort', hb:'bogaz' },
  'girne-tatlisu':      { ad:['Tatlısu','Tatlisu','Татлысу'], il:'girne', ust:'girne', pg:'girne-tatlisu-escort', hb:'tatlisu' },
  'girne-arapkoy':      { ad:['Arapköy','Arapkoy','Арапкёй'], il:'girne', ust:'girne', pg:'girne-arapkoy-escort', hb:'arapkoy' },
  'girne-dogankoy':     { ad:['Doğanköy','Dogankoy','Доганкёй'], il:'girne', ust:'girne', pg:'girne-dogankoy-escort', hb:'dogankoy' },
  'girne-bahceli':      { ad:['Bahçeli','Bahceli','Бахчели'], il:'girne', ust:'girne', pg:'girne-bahceli-escort', hb:'bahceli' },
  'girne-carsi':        { ad:['Girne Çarşı','Kyrenia Bazaar','Базар Кирении'], il:'girne', ust:'girne', pg:'girne-carsi-escort', hb:'carsi' },
  'girne-kordonboyu':   { ad:['Kordonboyu','Kordonboyu','Кордонбою'], il:'girne', ust:'girne', pg:'girne-kordonboyu-escort', hb:'kordonboyu' },
  'girne-asagigirne':   { ad:['Aşağı Girne','Lower Kyrenia','Нижняя Кирения'], il:'girne', ust:'girne', pg:'girne-asagigirne-escort', hb:'asagigirne' },
  'girne-yukarigirne':  { ad:['Yukarı Girne','Upper Kyrenia','Верхняя Кирения'], il:'girne', ust:'girne', pg:'girne-yukarigirne-escort', hb:'yukarigirne' },
  lapta:                { ad:['Lapta','Lapta','Лапта'], il:'girne', ust:'girne', pg:'lapta-escort', hb:'lapta' },
  alsancak:             { ad:['Alsancak','Alsancak','Алсанчак'], il:'girne', ust:'girne', pg:'alsancak-escort', hb:'alsancak' },

  lefkosa:              { ad:['Lefkoşa','Nicosia','Никосия'], il:'lefkosa', ust:null, alt:true, pg:'lefkosa-escort', hb:'lefkosa' },
  'lefkosa-merkez':     { ad:['Lefkoşa Merkez','Nicosia Centre','Центр Никосии'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'lefkosa-merkez' },
  'lefkosa-kumsal':     { ad:['Kumsal','Kumsal','Кумсал'], il:'lefkosa', ust:'lefkosa', pg:'lefkosa-kumsal-escort', hb:'kumsal' },
  'lefkosa-surici':     { ad:['Suriçi','Surici','Суриичи'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'surici' },
  'lefkosa-ortakoy':    { ad:['Ortaköy','Ortakoy','Ортакёй'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'ortakoy' },
  'lefkosa-hamitkoy':   { ad:['Hamitköy','Hamitkoy','Хамиткёй'], il:'lefkosa', ust:'lefkosa', pg:'lefkosa-hamitkoy-escort', hb:'hamitkoy' },
  'lefkosa-koskluciftlik':{ ad:['Köşklüçiftlik','Koskluciftlik','Кёшключифтлик'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'koskluciftlik' },
  'lefkosa-gonyeli':    { ad:['Gönyeli','Gonyeli','Гёньели'], il:'lefkosa', ust:'lefkosa', pg:'gonyeli-escort', hb:'gonyeli' },
  'lefkosa-haspolat':   { ad:['Haspolat','Haspolat','Хасполат'], il:'lefkosa', ust:'lefkosa', pg:'lefkosa-haspolat-escort', hb:'haspolat' },
  'lefkosa-yenisehir':  { ad:['Yenişehir','Yenisehir','Енишехир'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'yenisehir' },
  'lefkosa-marmara':    { ad:['Marmara','Marmara','Мармара'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'marmara' },
  'lefkosa-kermiya':    { ad:['Kermiya','Kermiya','Кермия'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'kermiya' },
  'lefkosa-demirhan':   { ad:['Demirhan','Demirhan','Демирхан'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'demirhan' },
  'lefkosa-kucukkaymakli':{ ad:['Küçük Kaymaklı','Kucuk Kaymakli','Кючюк Каймаклы'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'kucukkaymakli' },
  'lefkosa-taskinkoy':  { ad:['Taşkınköy','Taskinkoy','Ташкынкёй'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'taskinkoy' },
  'lefkosa-aydemet':    { ad:['Aydemet','Aydemet','Айдемет'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'aydemet' },
  'lefkosa-alaykoy':    { ad:['Alayköy','Alaykoy','Алайкёй'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'alaykoy' },
  'lefkosa-dereboyu':   { ad:['Dereboyu','Dereboyu','Деребою'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'dereboyu' },
  'lefkosa-kizilbas':   { ad:['Kızılbaş','Kizilbas','Кызылбаш'], il:'lefkosa', ust:'lefkosa', pg:null, hb:'kizilbas' },

  magusa:               { ad:['Mağusa','Famagusta','Фамагуста'], il:'magusa', ust:null, alt:true, pg:'magusa-escort', hb:'magusa' },
  'magusa-merkez':      { ad:['Mağusa Merkez','Famagusta Centre','Центр Фамагусты'], il:'magusa', ust:'magusa', pg:null, hb:'magusa-merkez' },
  'magusa-maras':       { ad:['Maraş','Maras','Мараш'], il:'magusa', ust:'magusa', pg:'magusa-maras-escort', hb:'maras' },
  'magusa-tuzla':       { ad:['Tuzla','Tuzla','Тузла'], il:'magusa', ust:'magusa', pg:'magusa-tuzla-escort', hb:'tuzla' },
  'magusa-sakarya':     { ad:['Sakarya','Sakarya','Сакарья'], il:'magusa', ust:'magusa', pg:'magusa-sakarya-escort', hb:'sakarya' },
  'magusa-canakkale':   { ad:['Çanakkale','Canakkale','Чанаккале'], il:'magusa', ust:'magusa', pg:'magusa-canakkale-escort', hb:'canakkale' },
  'magusa-surici':      { ad:['Mağusa Suriçi','Famagusta Walled City','Старый город Фамагусты'], il:'magusa', ust:'magusa', pg:null, hb:'magusa-surici' },
  'magusa-karakol':     { ad:['Karakol','Karakol','Каракол'], il:'magusa', ust:'magusa', pg:null, hb:'karakol' },
  'magusa-yenibogazici':{ ad:['Yeniboğaziçi','Yenibogazici','Енибогазичи'], il:'magusa', ust:'magusa', pg:null, hb:'yenibogazici' },
  'magusa-akdogan':     { ad:['Akdoğan','Akdogan','Акдоган'], il:'magusa', ust:'magusa', pg:null, hb:'akdogan' },
  'magusa-kaliland':    { ad:['Kaliland','Kaliland','Калиланд'], il:'magusa', ust:'magusa', pg:null, hb:'kaliland' },
  'magusa-baykal':      { ad:['Baykal','Baykal','Байкал'], il:'magusa', ust:'magusa', pg:null, hb:'baykal' },
  'magusa-dumlupinar':  { ad:['Dumlupınar','Dumlupinar','Думлупынар'], il:'magusa', ust:'magusa', pg:null, hb:'dumlupinar' },
  'magusa-gulseren':    { ad:['Gülseren','Gulseren','Гюльсерен'], il:'magusa', ust:'magusa', pg:null, hb:'gulseren' },
  'magusa-salamisyolu': { ad:['Salamis Yolu','Salamis Road','Саламинская дорога'], il:'magusa', ust:'magusa', pg:null, hb:'salamisyolu' },
  'magusa-yenisehir':   { ad:['Mağusa Yenişehir','Famagusta Yenisehir','Енишехир Фамагусты'], il:'magusa', ust:'magusa', pg:null, hb:'magusa-yenisehir' },

  iskele:               { ad:['İskele','Iskele','Искеле'], il:'iskele', ust:null, alt:true, pg:'iskele-escort', hb:'iskele' },
  'long-beach':         { ad:['Long Beach','Long Beach','Лонг-Бич'], il:'iskele', ust:'iskele', pg:'long-beach-escort', hb:'long-beach' },
  bafra:                { ad:['Bafra','Bafra','Бафра'], il:'bafra', ust:'iskele', pg:'bafra-escort', hb:'bafra' },
  guzelyurt:            { ad:['Güzelyurt','Guzelyurt','Гюзельюрт'], il:'guzelyurt', ust:null, alt:true, pg:'guzelyurt-escort', hb:'guzelyurt' }
};

const ALIAS = { 'magusa-longbeach': 'long-beach', 'lefkosa-surlarici': 'lefkosa-surici' };
const ANAHTAR = Object.keys(K).sort((a, b) => b.length - a.length);
const DI = { tr: 0, en: 1, ru: 2 };

const varMi = b => !!K[b];
const ad = (b, dil) => (K[b] ? (K[b].ad[DI[dil] || 0] || K[b].ad[0]) : '');
const il = b => (K[b] ? K[b].il : '');
const ust = b => (K[b] ? K[b].ust : null);
const alt = b => !!(K[b] && K[b].alt);
const pg = b => (K[b] ? K[b].pg : null);
const hb = b => (K[b] ? K[b].hb : '');

const HUBDAN = {};
Object.keys(K).forEach(k => { HUBDAN[K[k].hb] = k; });
const hubdan = kod => HUBDAN[kod] || (K[kod] ? kod : null);

const yol = b => {
  let x = b;
  while (x && !pg(x)) x = ust(x);
  return pg(x) || 'girne-escort';
};

const hub = b => '/modeller/' + (hb(b) || 'girne');

const slugBolge = slug => {
  const m = String(slug || '').match(/^([a-z-]+)-escort-/);
  if (!m) return null;
  const o = m[1];
  if (ALIAS[o]) return ALIAS[o];
  if (K[o]) return o;
  return ANAHTAR.find(k => o.endsWith('-' + k)) || null;
};

const sayfali = () => Object.keys(K).filter(k => pg(k));
const hepsi = () => Object.keys(K);

module.exports = { K, varMi, ad, il, ust, alt, pg, hb, hubdan, yol, hub, slugBolge, sayfali, hepsi };
