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
