'use strict';
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('.progress').style.width = (scrollY / Math.max(max, 1) * 100) + '%';
}, { passive: true });
function revealHash() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  const detail = target.closest('details');
  if (detail) detail.open = true;
  if (id === 'works') {
    const works = document.getElementById('case-ai-content');
    works.open = true;
    works.scrollIntoView({ block: 'start' });
  } else if (detail) target.scrollIntoView({ block: 'start' });
}
addEventListener('hashchange', revealHash);
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  let target;
  try { target = document.getElementById(decodeURIComponent(link.hash.slice(1))); } catch { return; }
  const detail = target?.closest('details');
  if (detail) detail.open = true;
});
revealHash();
const dialog = document.getElementById('video-dialog');
const video = document.getElementById('project-video');
const title = document.getElementById('video-title');
const error = document.getElementById('video-error');
const direct = document.getElementById('video-direct');
document.querySelectorAll('[data-video]').forEach(button => {
  button.addEventListener('click', () => {
    title.textContent = button.dataset.title;
    video.src = button.dataset.video;
    direct.href = button.dataset.video;
    error.hidden = true;
    if (typeof dialog.showModal !== 'function') { location.href = button.dataset.video; return; }
    dialog.showModal();
    document.body.classList.add('video-open');
    video.play().catch(() => {});
  });
});
video.addEventListener('error', () => { error.hidden = false; });
document.getElementById('video-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  video.pause(); video.removeAttribute('src'); video.load();
  document.body.classList.remove('video-open');
});
