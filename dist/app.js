const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'ปิดเมนู ×' : 'เมนู ☰';
  nav.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'เมนู ☰'; toggle.focus();
  }
});
document.querySelector('[data-copy-line]')?.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('reaw2525'); status.textContent = 'คัดลอก LINE ID แล้ว'; }
  catch { status.textContent = 'กรุณาคัดลอก LINE ID: reaw2525'; }
});


// Three transparent bears bounce off the viewport edges like a screensaver.
(() => {
  const stage = document.querySelector('.bear-sprinkles');
  const bears = [...(stage?.querySelectorAll('.bear-floater') || [])];
  if (!stage || !bears.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const speeds = [[118, 86], [-96, 112], [105, -98]];
  let width = window.innerWidth;
  let height = window.innerHeight;
  const states = bears.map((bear, index) => {
    bear.style.left = '0px';
    bear.style.right = 'auto';
    bear.style.top = '0px';
    const size = bear.getBoundingClientRect().width || 96;
    const starts = [[0.12, 0.2], [0.69, 0.43], [0.37, 0.73]];
    const [vx, vy] = speeds[index % speeds.length];
    return { bear, size, x: starts[index % starts.length][0] * Math.max(0, width - size), y: starts[index % starts.length][1] * Math.max(0, height - size), vx, vy, angle: index * 37, spin: index % 2 ? -105 : 92 };
  });

  function placeStill() {
    for (const state of states) state.bear.style.transform = `translate3d(${state.x}px,${state.y}px,0) rotate(${state.angle}deg)`;
  }
  placeStill();

  let previous = 0;
  function animate(now) {
    const dt = previous ? Math.min((now - previous) / 1000, 0.04) : 0;
    previous = now;
    if (!reducedMotion.matches && !document.hidden) {
      for (const state of states) {
        state.x += state.vx * dt;
        state.y += state.vy * dt;
        state.angle += state.spin * dt;
        if (state.x <= 0 || state.x + state.size >= width) {
          state.x = Math.max(0, Math.min(width - state.size, state.x));
          state.vx *= -1;
        }
        if (state.y <= 0 || state.y + state.size >= height) {
          state.y = Math.max(0, Math.min(height - state.size, state.y));
          state.vy *= -1;
        }
        state.bear.style.transform = `translate3d(${state.x}px,${state.y}px,0) rotate(${state.angle}deg)`;
      }
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    for (const state of states) {
      state.x = Math.max(0, Math.min(width - state.size, state.x));
      state.y = Math.max(0, Math.min(height - state.size, state.y));
    }
    placeStill();
  });
  requestAnimationFrame(animate);
})();

// Let the embedded game use the available screen on supported devices.
document.querySelector('[data-game-fullscreen]')?.addEventListener('click', async () => {
  const frame = document.querySelector('.academy-game-frame');
  const message = document.querySelector('.game-message');
  try {
    if (!frame.requestFullscreen) throw new Error('Fullscreen unavailable');
    await frame.requestFullscreen();
    frame.focus();
    message.textContent = '';
  } catch {
    message.textContent = 'อุปกรณ์นี้ไม่รองรับการเปิดเต็มหน้าจอจากหน้านี้ กรุณากดเปิดเกมแยก';
  }
});

// Preview the local game changes alongside the local academy website.
if (['localhost', '127.0.0.1'].includes(location.hostname)) {
  const localGame = document.querySelector('.academy-game-frame');
  if (localGame) localGame.src = 'http://127.0.0.1:5173/?embed=1';
}
