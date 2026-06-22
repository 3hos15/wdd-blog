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

function makeDraggable(el, handle) {
  handle = handle || el.querySelector('.win-bar') || el;
  let startMX, startMY, startL, startT, dragging = false, moved = false;

  handle.addEventListener('mousedown', e => {
    if (e.target.closest('.win-x')) return;
    dragging = true;
    moved = false;
    startMX = e.clientX;
    startMY = e.clientY;
    startL = parseInt(el.style.left) || el.getBoundingClientRect().left;
    startT = parseInt(el.style.top) || el.getBoundingClientRect().top;
    el.style.left = startL + 'px';
    el.style.top = startT + 'px';
    el.style.right = 'unset';
    el.style.bottom = 'unset';
    el.style.transform = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    moved = true;
    const nx = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, startL + e.clientX - startMX));
    const ny = Math.max(0, Math.min(window.innerHeight - 52 - el.offsetHeight, startT + e.clientY - startMY));
    el.style.left = nx + 'px';
    el.style.top = ny + 'px';
  });

  document.addEventListener('mouseup', e => {
    if (dragging && !moved) {
      // was a click, not a drag — let click handlers fire normally
    }
    dragging = false;
  });

  // suppress click after a drag
  handle.addEventListener('click', e => {
    if (moved) e.stopImmediatePropagation();
    moved = false;
  }, true);
}

function openAt(el, x, y) {
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.showPopover();
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// leerdoel vensters draggable maken
document.querySelectorAll('[popover].win.leer').forEach(el => makeDraggable(el));

// folders draggable maken
document.querySelectorAll('.folder').forEach(el => makeDraggable(el));

// folder klik: toggle leerdoel venster
document.querySelectorAll('.folder[popovertarget]').forEach(folder => {
  folder.addEventListener('click', () => {
    const targetId = folder.getAttribute('popovertarget');
    const win = document.getElementById(targetId);
    if (!win) return;
    if (win.matches(':popover-open')) {
      win.hidePopover();
      if (!reducedMotion) beep(300, 80);
    } else {
      if (!reducedMotion) beep(500 + Math.random() * 200, 80);
      const x = window.innerWidth / 2 - 155;
      const y = window.innerHeight / 2 - win.offsetHeight / 2;
      openAt(win, x, Math.max(20, y));
    }
  });
});

// deco vensters voorbereiden (maar nog niet tonen)
const allDecos = Array.from(document.querySelectorAll('[popover].win.deco'));
allDecos.forEach(el => makeDraggable(el));

// chaos folder: toggle alles open/dicht
document.getElementById('folder-chaos').addEventListener('click', () => {
  const anyOpen = allDecos.some(el => el.matches(':popover-open'));

  if (anyOpen) {
    allDecos.forEach(el => { if (el.matches(':popover-open')) el.hidePopover(); });
    if (!reducedMotion) beep(200, 150);
  } else {
    allDecos.forEach((el, i) => {
      const delay = reducedMotion ? 0 : i * 120;
      setTimeout(() => {
        const margin = 20;
        const x = margin + Math.random() * (window.innerWidth - 320 - margin);
        const y = margin + Math.random() * (window.innerHeight - 200 - 52 - margin);
        openAt(el, x, y);
        if (!reducedMotion) beep(250 + Math.random() * 500, 70);
      }, delay);
    });
  }
});
