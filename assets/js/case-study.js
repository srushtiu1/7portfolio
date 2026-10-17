/* case-study.js : shared by the three case study pages (outline, progress, compare slider, lightbox) */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* outline + scroll spy */
const secs=$$('section[data-t]'),ol=$('#outline');
secs.forEach(s=>{const a=document.createElement('a');a.href='#'+s.id;a.title=s.dataset.t;a.innerHTML='<span>'+s.dataset.t+'</span>';ol.appendChild(a)});
const links=$$('#outline a');
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id));}}),{rootMargin:'-30% 0px -60% 0px'});
secs.forEach(s=>spy.observe(s));
/* outline clicks: images and clips above the target can still be settling, so re-aim until the section sits in place */
(function(){
const TOP=80;let tries=0,timer=0;
const off=el=>el.getBoundingClientRect().top-TOP;
function settle(el){clearTimeout(timer);timer=setTimeout(()=>{if(Math.abs(off(el))>3&&tries++<6){scrollBy({top:off(el),behavior:'auto'});settle(el)}},220)}
function go(id,push){const el=document.getElementById(id);if(!el)return;tries=0;
  const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  scrollTo({top:scrollY+off(el),behavior:calm?'auto':'smooth'});
  if(push&&history.pushState)history.pushState(null,'','#'+id);settle(el)}
ol.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();go(a.getAttribute('href').slice(1),true)});
/* landing on page.html#section: wait for layout, then aim */
if(location.hash.length>1)addEventListener('load',()=>{const el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(el){tries=0;scrollBy({top:off(el),behavior:'auto'});settle(el)}});
})();
/* progress */
addEventListener('scroll',()=>{const h=document.documentElement;$('#prog').style.width=(h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});
/* compare */
const cmp=$('#cmp');if(cmp)cmp.querySelector('input').addEventListener('input',e=>cmp.style.setProperty('--p',e.target.value+'%'));
/* lightbox */
const lb=$('#lb'),li=lb.querySelector('img');
$$('.zm').forEach(i=>i.addEventListener('click',()=>{li.src=i.src;li.alt=i.alt;lb.classList.add('on')}));
lb.onclick=()=>lb.classList.remove('on');
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});
/* looping clips: load and play only while in view, never for reduced motion */
(function(){const vs=$$('figure.vid video');if(!vs.length)return;
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(calm||!('IntersectionObserver' in window)){vs.forEach(v=>{v.controls=true});return}
const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.preload='auto';const p=v.play();if(p&&p.catch)p.catch(()=>{})}else v.pause()}),{threshold:.35,rootMargin:'120px 0px'});
vs.forEach(v=>io.observe(v))})();
