// data/bolge.js — tek bölge kayıt defteri
// pg: bölgenin kendi sayfası (yoksa null, en yakın üst sayfaya katlanır)
// alt: ana bölge mi (modeller listesi il'i de kapsar)

const K = {
  girne:                { ad:['Girne','Kyrenia','Кирения'], il:'girne', ust:null, alt:true, pg:'girne-escort' },
  'girne-merkez':       { ad:['Girne Merkez','Kyrenia Centre','Центр Кирении'], il:'girne', ust:'girne', pg:null },
  'girne-liman':        { ad:['Girne Liman','Kyrenia Harbour','Порт Кирении'], il:'girne', ust:'girne', pg:null },
  'girne-zeytinlik':    { ad:['Zeytinlik','Zeytinlik','Зейтинлик'], il:'girne', ust:'girne', pg:null },
  'girne-karakum':      { ad:['Karakum','Karakum','Каракум'], il:'girne', ust:'girne', pg:null },
  'girne-nusmar':       { ad:['Nusmar','Nusmar','Нусмар'], il:'girne', ust:'girne', pg:null },
  'girne-karmi':        { ad:['Karmi','Karmi','Карми'], il:'girne', ust:'girne', pg:null },
  'girne-karaoglanoglu':{ ad:['Karaoğlanoğlu','Karaoglanoglu','Караогланоглу'], il:'girne', ust:'girne', pg:'karaoglanoglu-escort' },
  'girne-alsancak':     { ad:['Alsancak','Alsancak','Алсанчак'], il:'girne', ust:'girne', pg:'alsancak-escort' },
  'girne-lapta':        { ad:['Lapta','Lapta','Лапта'], il:'girne', ust:'girne', pg:'lapta-escort' },
  'girne-catalkoy':     { ad:['Çatalköy','Catalkoy','Чаталкёй'], il:'girne', ust:'girne', pg:'catalkoy-escort' },
  'girne-bellapais':    { ad:['Bellapais','Bellapais','Беллапаис'], il:'girne', ust:'girne', pg:'bellapais-escort' },
  'girne-esentepe':     { ad:['Esentepe','Esentepe','Эсентепе'], il:'girne', ust:'girne', pg:'esentepe-escort' },
  'girne-karaman':      { ad:['Karaman','Karaman','Караман'], il:'girne', ust:'girne', pg:null },
  'girne-karsiyaka':    { ad:['Karşıyaka','Karsiyaka','Каршияка'], il:'girne', ust:'girne', pg:null },
  'girne-ozankoy':      { ad:['Ozanköy','Ozankoy','Озанкёй'], il:'girne', ust:'girne', pg:null },
  'girne-edremit':      { ad:['Edremit','Edremit','Эдремит'], il:'girne', ust:'girne', pg:null },
  'girne-bogaz':        { ad:['Boğaz','Bogaz','Богаз'], il:'girne', ust:'girne', pg:null },
  'girne-tatlisu':      { ad:['Tatlısu','Tatlisu','Татлысу'], il:'girne', ust:'girne', pg:null },
  'girne-arapkoy':      { ad:['Arapköy','Arapkoy','Арапкёй'], il:'girne', ust:'girne', pg:null },
  'girne-dogankoy':     { ad:['Doğanköy','Dogankoy','Доганкёй'], il:'girne', ust:'girne', pg:null },
  'girne-bahceli':      { ad:['Bahçeli','Bahceli','Бахчели'], il:'girne', ust:'girne', pg:null },
  'girne-carsi':        { ad:['Girne Çarşı','Kyrenia Bazaar','Базар Кирении'], il:'girne', ust:'girne', pg:null },
  'girne-kordonboyu':   { ad:['Kordonboyu','Kordonboyu','Кордонбою'], il:'girne', ust:'girne', pg:null },
  'girne-asagigirne':   { ad:['Aşağı Girne','Lower Kyrenia','Нижняя Кирения'], il:'girne', ust:'girne', pg:null },
  'girne-yukarigirne':  { ad:['Yukarı Girne','Upper Kyrenia','Верхняя Кирения'], il:'girne', ust:'girne', pg:null },

  lefkosa:              { ad:['Lefkoşa','Nicosia','Никосия'], il:'lefkosa', ust:null, alt:true, pg:'lefkosa-escort' },
  'lefkosa-merkez':     { ad:['Lefkoşa Merkez','Nicosia Centre','Центр Никосии'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-kumsal':     { ad:['Kumsal','Kumsal','Кумсал'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-surici':     { ad:['Suriçi','Surici','Суриичи'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-ortakoy':    { ad:['Ortaköy','Ortakoy','Ортакёй'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-hamitkoy':   { ad:['Hamitköy','Hamitkoy','Хамиткёй'], il:'lefkosa', ust:'lefkosa', pg:'lefkosa-hamitkoy-escort' },
  'lefkosa-koskluciftlik':{ ad:['Köşklüçiftlik','Koskluciftlik','Кёшключифтлик'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-gonyeli':    { ad:['Gönyeli','Gonyeli','Гёньели'], il:'lefkosa', ust:'lefkosa', pg:'gonyeli-escort' },
  'lefkosa-haspolat':   { ad:['Haspolat','Haspolat','Хасполат'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-yenisehir':  { ad:['Yenişehir','Yenisehir','Енишехир'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-marmara':    { ad:['Marmara','Marmara','Мармара'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-kermiya':    { ad:['Kermiya','Kermiya','Кермия'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-demirhan':   { ad:['Demirhan','Demirhan','Демирхан'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-kucukkaymakli':{ ad:['Küçük Kaymaklı','Kucuk Kaymakli','Кючюк Каймаклы'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-taskinkoy':  { ad:['Taşkınköy','Taskinkoy','Ташкынкёй'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-aydemet':    { ad:['Aydemet','Aydemet','Айдемет'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-alaykoy':    { ad:['Alayköy','Alaykoy','Алайкёй'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-dereboyu':   { ad:['Dereboyu','Dereboyu','Деребою'], il:'lefkosa', ust:'lefkosa', pg:null },
  'lefkosa-kizilbas':   { ad:['Kızılbaş','Kizilbas','Кызылбаш'], il:'lefkosa', ust:'lefkosa', pg:null },

  magusa:               { ad:['Mağusa','Famagusta','Фамагуста'], il:'magusa', ust:null, alt:true, pg:'magusa-escort' },
  'magusa-merkez':      { ad:['Mağusa Merkez','Famagusta Centre','Центр Фамагусты'], il:'magusa', ust:'magusa', pg:null },
  'magusa-maras':       { ad:['Maraş','Maras','Мараш'], il:'magusa', ust:'magusa', pg:null },
  'magusa-tuzla':       { ad:['Tuzla','Tuzla','Тузла'], il:'magusa', ust:'magusa', pg:null },
  'magusa-sakarya':     { ad:['Sakarya','Sakarya','Сакарья'], il:'magusa', ust:'magusa', pg:null },
  'magusa-canakkale':   { ad:['Çanakkale','Canakkale','Чанаккале'], il:'magusa', ust:'magusa', pg:null },
  'magusa-surici':      { ad:['Mağusa Suriçi','Famagusta Walled City','Старый город Фамагусты'], il:'magusa', ust:'magusa', pg:null },
  'magusa-karakol':     { ad:['Karakol','Karakol','Каракол'], il:'magusa', ust:'magusa', pg:null },
  'magusa-yenibogazici':{ ad:['Yeniboğaziçi','Yenibogazici','Енибогазичи'], il:'magusa', ust:'magusa', pg:null },
  'magusa-akdogan':     { ad:['Akdoğan','Akdogan','Акдоган'], il:'magusa', ust:'magusa', pg:null },
  'magusa-kaliland':    { ad:['Kaliland','Kaliland','Калиланд'], il:'magusa', ust:'magusa', pg:null },
  'magusa-baykal':      { ad:['Baykal','Baykal','Байкал'], il:'magusa', ust:'magusa', pg:null },
  'magusa-dumlupinar':  { ad:['Dumlupınar','Dumlupinar','Думлупынар'], il:'magusa', ust:'magusa', pg:null },
  'magusa-gulseren':    { ad:['Gülseren','Gulseren','Гюльсерен'], il:'magusa', ust:'magusa', pg:null },
  'magusa-salamisyolu': { ad:['Salamis Yolu','Salamis Road','Саламинская дорога'], il:'magusa', ust:'magusa', pg:null },
  'magusa-yenisehir':   { ad:['Mağusa Yenişehir','Famagusta Yenisehir','Енишехир Фамагусты'], il:'magusa', ust:'magusa', pg:null },

  iskele:               { ad:['İskele','Iskele','Искеле'], il:'iskele', ust:null, alt:true, pg:'iskele-escort' },
  'long-beach':         { ad:['Long Beach','Long Beach','Лонг-Бич'], il:'iskele', ust:'iskele', pg:'long-beach-escort' },
  bafra:                { ad:['Bafra','Bafra','Бафра'], il:'bafra', ust:'iskele', pg:'bafra-escort' },
  guzelyurt:            { ad:['Güzelyurt','Guzelyurt','Гюзельюрт'], il:'guzelyurt', ust:null, alt:true, pg:'guzelyurt-escort' },
  lapta:                { ad:['Lapta','Lapta','Лапта'], il:'lapta', ust:'girne', pg:'lapta-escort' },
  alsancak:             { ad:['Alsancak','Alsancak','Алсанчак'], il:'alsancak', ust:'girne', pg:'alsancak-escort' }
};

const ALIAS = { 'magusa-longbeach': 'long-beach', 'lefkosa-surlarici': 'lefkosa-surici', 'girne-longbeach': 'long-beach' };
const ANAHTAR = Object.keys(K).sort((a, b) => b.length - a.length);
const DI = { tr: 0, en: 1, ru: 2 };

const varMi = b => !!K[b];
const ad = (b, dil) => (K[b] ? (K[b].ad[DI[dil] || 0] || K[b].ad[0]) : '');
const il = b => (K[b] ? K[b].il : '');
const ust = b => (K[b] ? K[b].ust : null);
const alt = b => !!(K[b] && K[b].alt);
const pg = b => (K[b] ? K[b].pg : null);

const yol = b => {
  let x = b;
  while (x && !pg(x)) x = ust(x);
  return pg(x) || 'girne-escort';
};

const hub = b => '/modeller/' + yol(b).replace(/-escort$/, '');

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

module.exports = { K, varMi, ad, il, ust, alt, pg, yol, hub, slugBolge, sayfali, hepsi };
