const countries={
  novaria:{number:'01',name:'Novaria',population:'25 million people · Lithium & copper',image:'mining.jpg',alt:'A real quarry photographed from above, illustrating resource development',caption:'Illustrative photography · A quarry in Poland',system:'Centrally planned → Market opening',headline:'Open for business.\nKeep control of the resources.',context:'Novaria has valuable lithium and copper, but outdated state factories and tight investment restrictions are holding it back.',recommendation:'Allow private enterprise and foreign investment. Keep majority government ownership in mining partnerships, so new technology arrives without giving away control.',benefit:'More jobs for young adults, modern production and greater consumer choice.',risk:'Greater inequality and foreign influence if contracts and oversight are weak.',politicsTitle:'Presidential democracy',politics:'An elected president coordinates infrastructure and industrial projects. Term limits, independent courts, published mining contracts and spending audits keep that authority accountable.',politicsRisk:'Watch for: favouritism and excessive concentration of executive power.',investor:'Best suited to lithium and copper investors that can bring technology and patient capital. Check entry restrictions, reliable power, transport links and partnership terms first.'},
  solandia:{number:'02',name:'Solandia',population:'40 million people · Agriculture, textiles & tourism',image:'coast.jpg',alt:'A real coastal city seen from the air, illustrating tourism and coastal development',caption:'Illustrative photography · A real coastal city',system:'Market economy → A regulated mixed economy',headline:'Keep the enterprise.\nMake growth reach further.',context:'Solandia has attracted foreign factories and grown quickly. Low wages, concentrated wealth, pollution and underfunded rural services leave too many people behind.',recommendation:'Keep private ownership and competition. Gradually raise taxes on profitable corporations, fund rural healthcare and education, and enforce workplace, environmental and fair-competition rules.',benefit:'Safer work, better public services and a wider share in the gains from international trade.',risk:'Abrupt tax or regulatory changes could deter investment. Phase reforms in so employers can plan.',politicsTitle:'Parliamentary democracy',politics:'Use proportional representation so parliamentary seats reflect voters\' choices. Parliament chooses the prime minister and holds the cabinet accountable. Publish political donations and coalition policy commitments.',politicsRisk:'Watch for: coalition disagreements that delay spending decisions and reforms.',investor:'Best suited to textiles and other labour-intensive production. Low labour costs already attract foreign factories. Budget for fair wages, workplace standards, environmental compliance and phased tax changes.'},
  estoria:{number:'03',name:'Estoria',population:'18 million people · Technology & advanced industry',image:'energy.jpg',alt:'Real wind turbines on green hills, illustrating renewable energy investment',caption:'Illustrative photography · Spencer DeMera / Unsplash',system:'Mixed economy → More market competition',headline:'Lower the cost of business.\nProtect what people rely on.',context:'Estoria has skilled workers, strong infrastructure and established international firms. An aging population and expensive social programs are putting its public finances under pressure.',recommendation:'Cut ineffective spending, gradually reduce business taxes and simplify approvals. Open suitable services to competition, reform pensions around contributions and retirement length, and protect minimum incomes.',benefit:'A more competitive business environment, room for innovation and a more sustainable service budget.',risk:'Tax cuts can reduce revenue before investment rises. Service and pension reforms could hurt lower-income households.',politicsTitle:'Representative democracy, with referendums',politics:'Elected representatives manage everyday laws and budgets. Allow citizen-requested referendums on major tax, pension and service reforms, backed by independent cost estimates and constitutional rights.',politicsRisk:'Watch for: delayed reforms and appealing promises without adequate funding.',investor:'Our strongest general investment choice within these scenarios. Educated workers, infrastructure and market access suit technology, clean energy and advanced manufacturing. Check specialist skills and total project costs; it is not the cheapest location for every business.'}
};
const root=document.documentElement;
const panel=document.querySelector('#country-panel');
const tabs=[...document.querySelectorAll('[data-country]')];
function selectCountry(key,focus=false){
  const c=countries[key]; if(!c)return;
  tabs.forEach(tab=>{const selected=tab.dataset.country===key;tab.setAttribute('aria-selected',selected);tab.tabIndex=selected?0:-1;if(selected&&focus)tab.focus()});
  panel.setAttribute('aria-labelledby',`tab-${key}`);
  const fields={number:`Strategy ${c.number}`,name:c.name,population:c.population,caption:c.caption,system:c.system,headline:c.headline,context:c.context,recommendation:c.recommendation,benefit:c.benefit,risk:c.risk,politics:c.politics,'politics-title':c.politicsTitle,'politics-risk':c.politicsRisk,investor:c.investor};
  Object.entries(fields).forEach(([id,value])=>document.getElementById(`country-${id}`).textContent=value);
  const photo=document.querySelector('#country-photo');photo.style.opacity='';photo.src=`assets/${c.image.replace('.jpg','.webp')}`;photo.alt=c.alt;
  document.querySelectorAll('#country-panel details').forEach(detail=>detail.open=false);
  if(!reduced.matches)panel.animate([{opacity:.55,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'ease-out'});
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectCountry(tab.dataset.country));tab.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(index+1)%tabs.length;if(event.key==='ArrowLeft')target=(index+tabs.length-1)%tabs.length;if(event.key==='Home')target=0;if(event.key==='End')target=tabs.length-1;if(target!==undefined){event.preventDefault();selectCountry(tabs[target].dataset.country,true)}})});
document.querySelectorAll('[data-open-country]').forEach(link=>link.addEventListener('click',()=>selectCountry(link.dataset.openCountry)));
const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',!expanded);nav.classList.toggle('open',!expanded)});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus()}});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const header=document.querySelector('.header');
const hero=document.querySelector('.hero');
const heroMedia=document.querySelector('.hero-media');
const progress=document.querySelector('.reading-progress');
const revealElements=[...document.querySelectorAll('[data-reveal]')];
let queued=false,heroHeight=0,scrollRange=1;
function measure(){heroHeight=hero.offsetHeight;scrollRange=Math.max(1,document.documentElement.scrollHeight-innerHeight)}
function updateScroll(){
 queued=false;
 const y=scrollY;
 header.classList.toggle('scrolled',y>70);
 progress.style.transform=`scaleX(${Math.min(1,y/scrollRange)})`;
 if(!reduced.matches&&innerWidth>900&&y<heroHeight)heroMedia.style.setProperty('--photo-shift',`${Math.min(55,y*.075)}px`);
}
function queueScroll(){if(!queued){queued=true;requestAnimationFrame(updateScroll)}}
window.addEventListener('scroll',queueScroll,{passive:true});
window.addEventListener('resize',()=>{measure();queueScroll()},{passive:true});
const resizeObserver=new ResizeObserver(measure);resizeObserver.observe(document.body);measure();updateScroll();
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -20px 0px'});
function setupReveals(){
 root.classList.toggle('scroll-motion',!reduced.matches);
 revealElements.forEach(el=>{if(reduced.matches||el.getBoundingClientRect().top<innerHeight*.92){el.classList.add('is-visible')}else{revealObserver.observe(el)}});
 if(reduced.matches)heroMedia.style.removeProperty('--photo-shift');
}
setupReveals();reduced.addEventListener('change',setupReveals);
countries.estoria.investor='Our strongest general investment choice. Educated workers, infrastructure and market access suit technology, clean energy and advanced manufacturing. Check specialist skills and total project costs; it is not the cheapest location for every business.';
const dialog=document.querySelector('#sources-dialog');const sourcesButton=document.querySelector('#open-sources');
sourcesButton.addEventListener('click',()=>dialog.showModal());
document.querySelector('#close-sources').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.style.opacity='0';const caption=img.closest('.country-visual')?.querySelector('.photo-caption');if(caption)caption.textContent='Photograph unavailable. The complete country brief is shown alongside.'}));
