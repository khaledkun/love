(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const wait=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const AR='٠١٢٣٤٥٦٧٨٩',ar=n=>String(n).replace(/\d/g,d=>AR[d]);
/* ===== EDIT HERE: ميعاد الفرح — مثال: new Date('2026-12-31T20:00:00') ===== */
const WEDDING=new Date('2026-08-19T20:00:00');
const MONTHS=['يناير','فبراير','مارس','إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const SECTIONS=[['hero','البداية'],['timeline','حكايتنا'],['reasons','بحبه فيكي'],['letter','رسالة'],['countdown','الفرح'],['gallery','الذكريات'],['finale','النهاية']];
const REASONS=[['smile','ضحكتك','اللي بتغير مود يومي كله.','<circle cx="12" cy="12" r="10"/><path d="M8 14s1.500 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>'],['presence','وجودك','اللي بيخلي الأيام أحلى.','<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM19 16v4M17 18h4"/>'],['details','تفاصيلك','الحاجات الصغيرة اللي يمكن متعرفيش إني باخد بالي منها.','<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'],['future','مستقبلنا','أجمل حاجة مستنيها في حياتي.','<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM10 21v-6h4v6"/>']];
const COLORS=['#FFD6C2','#E9D8FF','#F6A6C1','#d9c2fa'];
const LETTER=['بصي، أنا مش عارف أبدأ كلامي منين...','بس عارف إن وجودك في حياتي من أجمل الحاجات اللي حصلتلي.','ويمكن مهما قلتلك بحبك، مش هعرف أوصفلك قد إيه أنا مستني الأيام اللي جاية.','نفسي نعيش كل التفاصيل سوا...\nالأيام الحلوة، والمواقف البسيطة، والضحك، وحتى الأيام اللي مش سهلة.','نفسي يبقى لينا بيتنا، وحكاياتنا، وذكرياتنا اللي كل يوم بتزيد.','ومهما كان اللي جاي، أنا مبسوط إنك الشخص اللي هشاركه معاه.','بحبك.'];
const FINALE=['إن كل الحاجات اللي بنحلم بيها سوا...\nتبقى حياتنا الحقيقية.','إن أصحى كل يوم وألاقيكي جنبي.','وأحكيلك عن يومي.','وأضحك معاكي على أبسط الحاجات.','إن يبقى لينا بيتنا، وذكرياتنا، وحكايتنا اللي مش هتنتهي عند الفرح...','دي هتبدأ منه.','بحبك...\nومستني اليوم اللي أقولك فيه كل الكلام ده وأنا جنبك.'];
const PHOTOS=[['assets/photos/1.jpg','يوم كتب الكتاب'],['assets/photos/2.jpg','إيدينا قصاد إيد بعض'],['assets/photos/3.jpg','منديل التواريخ'],['assets/photos/4.jpg','بصمة كتب الكتاب'],['assets/photos/5.jpg','يوم الفرح']];
const brs=t=>t.split('\n').join('<br>');

/* ===== hearts burst ===== */
function burst(x,y,n=9,ic='heart'){
  if(RM)return;
  for(let i=0;i<n;i++){
    const s=document.createElementNS('http://www.w3.org/2000/svg','svg'),u=document.createElementNS('http://www.w3.org/2000/svg','use');
    u.setAttribute('href','#'+(i%4===3?'bf':ic));s.append(u);s.setAttribute('class','pop');
    const a=Math.random()*Math.PI*2,d=40+Math.random()*70;
    s.style.cssText=`left:${x-11}px;top:${y-11}px;--x:${Math.cos(a)*d}px;--y:${Math.sin(a)*d-40}px;--r:${(Math.random()-.5)*90}deg;color:${['#FF6F9F','#C8A5F2','#F6A6C1','#E85D91'][i%4]}`;
    document.body.append(s);setTimeout(()=>s.remove(),1000);
  }
}
const burstEl=(el,n)=>{const r=el.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,n)};
document.addEventListener('click',e=>{const b=e.target.closest('.btn,.env,.card button');if(b)burst(e.clientX||b.getBoundingClientRect().left,e.clientY||b.getBoundingClientRect().top,8)});

/* ===== music ===== */
const au=new Audio('assets/song.mp3');au.loop=true;au.preload='auto';au.volume=0;
let vol=.6,muted=false,fade=0;
const player=$('#player'),pi=$('#pi'),pr=$('#pr'),PLAY='M7 4l13 8-13 8z',PAUSE='M6 4h4v16H6zM14 4h4v16h-4z';
const target=()=>muted?0:vol;
function fadeTo(v,ms,done){cancelAnimationFrame(fade);const s=au.volume,t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/ms);au.volume=s+(v-s)*k;k<1?fade=requestAnimationFrame(f):done&&done()};fade=requestAnimationFrame(f)}
function play(){au.play().then(()=>fadeTo(target(),2200)).catch(()=>{})}
function pause(){fadeTo(0,500,()=>au.pause())}
au.addEventListener('play',()=>{pi.innerHTML=`<path d="${PAUSE}"/>`;$('#pp').setAttribute('aria-label','أوقفي الأغنية')});
au.addEventListener('pause',()=>{pi.innerHTML=`<path d="${PLAY}"/>`;$('#pp').setAttribute('aria-label','شغّلي الأغنية')});
au.addEventListener('timeupdate',()=>{if(au.duration)pr.style.strokeDashoffset=119.4*(1-au.currentTime/au.duration)});
$('#pp').onclick=()=>au.paused?play():pause();
$('#mu').onclick=function(){muted=!muted;cancelAnimationFrame(fade);au.volume=target();this.setAttribute('aria-pressed',muted);this.setAttribute('aria-label',muted?'شغّلي الصوت':'اكتمي الصوت')};
$('#vol').oninput=e=>{vol=+e.target.value;if(muted&&vol>0){muted=false;$('#mu').setAttribute('aria-pressed','false')}cancelAnimationFrame(fade);au.volume=target()};

/* ===== build dynamic UI ===== */
$('#cards').innerHTML=REASONS.map((r,i)=>`<div class="card rv" style="--c:${COLORS[i]}"><button type="button" aria-pressed="false" aria-label="${r[1]}: ${r[2]}"><span class="face f"><span class="n">${ar('0'+(i+1))}</span><span class="ic"><svg viewBox="0 0 24 24">${r[3]}</svg></span><h3>${r[1]}</h3><small>دوسي علشان تعرفي</small></span><span class="face b"><b>${r[1]}</b><p>${r[2]}</p></span></button></div>`).join('');
$$('.card button').forEach(b=>b.onclick=()=>{const c=b.parentElement;c.classList.toggle('flip');b.setAttribute('aria-pressed',c.classList.contains('flip'))});

$('#album').innerHTML=PHOTOS.map((p,i)=>`<figure class="polaroid rv" data-i="${i}" tabindex="0" role="button" aria-label="عرض الصور ${ar(i+1)}"><span class="tape"></span><img src="${p[0]}" alt="${p[1]}" loading="lazy" decoding="async"><figcaption>${p[1]}</figcaption><svg class="pin"><use href="#${['heart','bf','fl'][i%3]}"/></svg></figure>`).join('');

$('#dots').innerHTML=SECTIONS.map(s=>`<button type="button" data-go="${s[0]}" aria-label="${s[1]}"><i></i><span>${s[1]}</span></button>`).join('');
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(!g)return;e.preventDefault();$('#'+g.dataset.go).scrollIntoView({behavior:RM?'auto':'smooth'})});

/* countdown */
const cd=$('#cd'),cdTitle=$('#cdTitle'),cdSub=$('#cdSub');
function renderCD(){
  if(!WEDDING){cd.innerHTML='<div class="cd-nodate"><p>ميعاد الفرح لسه ربنا هيكتبه، بس قلبي متأكد إنه قرّب.. وأول ما نعرف اليوم، هنعدّ عليه سوا ثانية بثانية.</p></div>';return}
  const t=+new Date(WEDDING)-Date.now(),d=new Date(WEDDING);
  const dateLine=`ميعاد الفرح: <b>${ar(d.getDate())} ${MONTHS[d.getMonth()]} ${ar(d.getFullYear())}</b>`;
  const grid=v=>`<div class="cd-grid" role="timer">${v.map(x=>`<div class="cd-u"><b>${ar(String(x[0]).padStart(2,'0'))}</b><span>${x[1]}</span></div>`).join('')}</div>`;
  if(t<=0){
    const e=-t;
    cdTitle.textContent='من يوم ما بقينا في بيت واحد.. وكل ثانية بتزيدنا قرب.';
    cdSub.textContent='الوقت اللي عدّى على فرحنا.. ولسه في العمر كتير.';
    cd.innerHTML=grid([[Math.floor(e/864e5),'يوم'],[Math.floor(e/36e5%24),'ساعة'],[Math.floor(e/6e4%60),'دقيقة'],[Math.floor(e/1e3%60),'ثانية']])+`<p class="cd-date">${dateLine}</p>`;
    return;
  }
  cdTitle.textContent='مش باقي كتير على اليوم اللي هنبقى فيه في بيت واحد.';
  cdSub.textContent='اليوم اللي هتبقى فيه كل البدايات اللي بنحلم بيها حقيقة.';
  cd.innerHTML=grid([[Math.floor(t/864e5),'يوم'],[Math.floor(t/36e5%24),'ساعة'],[Math.floor(t/6e4%60),'دقيقة'],[Math.floor(t/1e3%60),'ثانية']])+`<p class="cd-date">${dateLine}</p>`;
}
renderCD();if(WEDDING)setInterval(renderCD,1000);

/* ===== reveal on scroll, progress, active dot ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$('.rv').forEach(el=>{el.style.transitionDelay=(el.classList.contains('card')?$$('.card').indexOf(el)*.12:0)+'s';io.observe(el)});
const bar=$('.progress i');
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${m>0?scrollY/m:0})`},{passive:true});
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#dots button').forEach(b=>b.classList.toggle('act',b.dataset.go===e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
SECTIONS.forEach(s=>so.observe($('#'+s[0])));

/* ===== letter ===== */
const env=$('#env'),box=$('#letterBox'),btn=$('#letterBtn'),txt=$('#letterText');
let words=[],timer=0,done=false;
txt.innerHTML=LETTER.map(p=>`<p>${p.split('\n').map(l=>l.split(/\s+/).filter(Boolean).map(w=>`<span class="w">${w}</span>`).join(' ')).join('<br>')}</p>`).join('');
txt.lastElementChild.insertAdjacentHTML('beforeend',' <span class="w">— خالد</span>');
words=$$('.w',txt);
function showAll(){clearTimeout(timer);words.forEach(w=>w.classList.add('on'));finish()}
function finish(){done=true;btn.textContent='اقرأيها تاني'}
function run(){clearTimeout(timer);done=false;btn.textContent='أظهري الرسالة كاملة';words.forEach(w=>w.classList.remove('on'));let i=0;
  (function nx(){if(i>=words.length){finish();return}const w=words[i++];w.classList.add('on');timer=setTimeout(nx,RM?0:w.nextElementSibling&&w.nextSibling.nodeName==='BR'?380:90)})()}
btn.onclick=()=>done?run():showAll();
async function openLetter(){
  if(env.classList.contains('open'))return;env.classList.add('open');burstEl(env,12);
  await wait(2100);$('#envZone').hidden=true;box.hidden=false;
  if(!RM)box.scrollIntoView({behavior:'smooth',block:'center'});run();
}
env.onclick=openLetter;

/* ===== lightbox ===== */
let li=0,lb;
function openLB(i){
  li=i;lb=document.createElement('div');lb.id='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','عرض الصور');
  const ic=d=>`<svg viewBox="0 0 24 24"><path d="${d}"/></svg>`;
  lb.innerHTML=`<div class="bar"><button class="rb" aria-label="إغلاق">${ic('M18 6 6 18M6 6l12 12')}</button><span id="lc"></span></div><div class="stage"><img alt="" draggable="false"><button class="rb nx" aria-label="الصورة اللي بعدها">${ic('m15 18-6-6 6-6')}</button><button class="rb pv" aria-label="الصورة اللي قبلها">${ic('m9 18 6-6-6-6')}</button></div><div class="foot"></div>`;
  document.body.append(lb);document.body.classList.add('lbl');
  const img=$('img',lb),st=$('.stage',lb);let zoom=false,sx=0,sy=0;
  const set=()=>{img.style.opacity=0;img.src=PHOTOS[li][0];img.style.transform='';zoom=false;$('#lc').textContent=`${ar(li+1)} من ${ar(PHOTOS.length)}`;img.onload=()=>img.style.opacity=1};
  const go=d=>{li=(li+d+PHOTOS.length)%PHOTOS.length;set()};
  const close=()=>{document.removeEventListener('keydown',key);lb.remove();document.body.classList.remove('lbl');$$('#album .polaroid')[li]?.focus({preventScroll:true})};
  const key=e=>{e.key==='Escape'?close():e.key==='ArrowLeft'?go(1):e.key==='ArrowRight'&&go(-1)};
  document.addEventListener('keydown',key);
  $('.bar .rb',lb).onclick=close;$('.nx',lb).onclick=()=>go(1);$('.pv',lb).onclick=()=>go(-1);
  $('.nx',lb).onpointerdown=$('.pv',lb).onpointerdown=e=>e.stopPropagation();
  img.ondblclick=e=>{zoom=!zoom;img.style.transformOrigin=`${(e.offsetX/img.width)*100}% ${(e.offsetY/img.height)*100}%`;img.style.transform=zoom?'scale(2.4)':''};
  st.onpointerdown=e=>{sx=e.clientX;sy=e.clientY};
  st.onpointerup=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(zoom)return;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy))go(dx<0?1:-1);else if(dy>110)close();else if(Math.abs(dx)<6&&Math.abs(dy)<6&&e.target===st)close()};
  set();$('.rb',lb).focus();
}
$$('#album .polaroid').forEach(f=>{f.onclick=()=>openLB(+f.dataset.i);f.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLB(+f.dataset.i)}}});

/* ===== finale ===== */
$('#tell').onclick=async function(){
  const ask=$('#ask'),rv=$('#reveal');this.disabled=true;ask.style.transition='opacity .8s';ask.style.opacity=0;await wait(800);ask.hidden=true;
  rv.innerHTML=FINALE.map((b,i)=>`<p class="${i===5?'em':''}">${brs(b)}</p>`).join('')+`<div class="end"><svg class="sq"><use href="#heart"/></svg><p class="close"><span>كل سنة وإنتِ حبيبتي...</span><span>وكل سنة وإحنا أقرب لحلمنا.</span></p><p class="foot">اتعمل بحب علشانك — خالد</p></div>`;
  rv.hidden=false;
  const ps=$$('p',rv);let stop=false;const halt=()=>stop=true;addEventListener('wheel',halt,{passive:true});addEventListener('touchstart',halt,{passive:true});
  for(const p of ps){await wait(p.classList.contains('foot')?400:900);p.classList.add('on');
    if(!stop){const m=p.getBoundingClientRect().bottom-(innerHeight-110);if(m>0)scrollBy({top:m+40,behavior:RM?'auto':'smooth'})}}
  removeEventListener('wheel',halt);removeEventListener('touchstart',halt);
};

/* ===== intro ===== */
const intro=$('#intro');let entered=false;
const fonts=document.fonts?Promise.race([Promise.all([document.fonts.load('400 1.2rem "Aref Ruqaa"','حكاية'),document.fonts.load('600 1rem Cairo','حكاية')]),new Promise(r=>setTimeout(r,3000))]).catch(()=>{}):Promise.resolve();
Promise.all([fonts,wait(1100)]).then(()=>{if(!intro.isConnected)return;const l=$('#loader'),i=$('#introIn'),s=$('#skip'),e=$('#enter');if(l)l.hidden=true;if(i)i.hidden=false;if(s)s.hidden=false;if(e)e.focus({preventScroll:true})});
function enter(fast){
  if(entered)return;entered=true;play();burstEl($('#enter'),14);
  intro.classList.add('out');
  setTimeout(()=>{intro.remove();document.body.classList.remove('lock');player.hidden=false;$('#dots').classList.add('on');scrollTo(0,0);
    $$('#hero .rv').forEach((el,i)=>setTimeout(()=>{el.classList.add('in')},RM?0:i*180))},fast||RM?300:900);
}
$('#enter').onclick=()=>enter(false);$('#skip').onclick=()=>enter(true);
if(RM)document.documentElement.classList.add('nosmooth');
scrollTo(0,0);
})();
