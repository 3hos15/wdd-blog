// ai de posititie van de popover laten bepalen
const w = window.innerWidth;
const h = window.innerHeight;
 
const positions = [
  { x: w * 0.08, y: h * 0.10 },  
  { x: w * 0.55, y: h * 0.10 },  
  { x: w * 0.30, y: h * 0.08 },  
  { x: w * 0.65, y: h * 0.35 },  
  { x: w * 0.05, y: h * 0.55 },  
  { x: w * 0.42, y: h * 0.55 }, 
];
 
 
function beep(freq = 440, duration = 60) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch (e) {}
}
 
 
function makeDraggable(el) {
  const bar = el.querySelector('.win-bar');
  if (!bar) return;
 
  let startMX, startMY, startL, startT, dragging = false;
 
  bar.addEventListener('mousedown', e => {
    if (e.target.closest('.win-x')) return;
    dragging = true;
    startMX = e.clientX;
    startMY = e.clientY;
    startL = parseInt(el.style.left) || 0;
    startT = parseInt(el.style.top) || 0;
    e.preventDefault();
  });
 
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const nx = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, startL + e.clientX - startMX));
    const ny = Math.max(0, Math.min(window.innerHeight - 52 - el.offsetHeight, startT + e.clientY - startMY));
    el.style.left = nx + 'px';
    el.style.top = ny + 'px';
  });
 
  document.addEventListener('mouseup', () => dragging = false);
}
 
 
function openAt(el, x, y) {
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.showPopover();
}
 
 
const allDecos = Array.from(document.querySelectorAll('[popover].win.deco'));
const picked = allDecos.sort(() => Math.random() - 0.5).slice(0, 5);
 
allDecos.forEach(d => { if (!picked.includes(d)) d.remove(); });
 
 
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
 
const subjects = Array.from(document.querySelectorAll('[popover].win.subject'));
 
subjects.forEach((el, i) => {
  makeDraggable(el);
  const delay = reducedMotion ? 0 : i * 180;
  setTimeout(() => {
    const pos = positions[i] ?? {
      x: 40 + Math.random() * (window.innerWidth - 320),
      y: 40 + Math.random() * (window.innerHeight - 250),
    };
    openAt(el, pos.x, pos.y);
    if (!reducedMotion) beep(400 + Math.random() * 300, 80);
  }, delay);
});
 
picked.forEach((el, i) => {
  makeDraggable(el);
  const delay = reducedMotion ? 0 : (subjects.length + i) * 180;
  setTimeout(() => {
    const margin = 20;
    const x = margin + Math.random() * (window.innerWidth - 320 - margin);
    const y = margin + Math.random() * (window.innerHeight - 200 - 52 - margin);
    openAt(el, x, y);
    if (!reducedMotion) beep(300 + Math.random() * 200, 60);
  }, delay);
});
 
 
const forumWin = document.getElementById('win-forum');
makeDraggable(forumWin);
 
document.getElementById('forum-btn').addEventListener('click', () => {
  if (!reducedMotion) beep(550, 60);
  if (forumWin.matches(':popover-open')) return;
  openAt(forumWin, Math.max(20, window.innerWidth / 2 - 155), 80);
});
 

 
document.getElementById('toggle-order').addEventListener('change', e => {
  if (reducedMotion) return;
  if (e.target.checked) {
    beep(660, 80);
    setTimeout(() => beep(880, 100), 100);
  } else {
    beep(200, 200);
  }
});