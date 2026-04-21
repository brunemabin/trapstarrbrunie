// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

let currentIndex = 0;
const images = [];

// Collect gallery items AND loose imgs inside .full-photo
const clickables = document.querySelectorAll('.gallery-item, .full-photo img');
clickables.forEach((el) => {
  const img = el.tagName === 'IMG' ? el : el.querySelector('img');
  if (!img) return;
  const caption = el.tagName === 'IMG'
    ? (el.parentElement?.querySelector('figcaption')?.textContent || '')
    : (el.querySelector('figcaption')?.textContent || '');
  images.push({ src: img.src, alt: img.alt, caption });
  el.addEventListener('click', () => {
    currentIndex = images.findIndex(i => i.src === img.src);
    openLightbox();
  });
});

function openLightbox() {
  if (images.length === 0) return;
  lightboxImg.src = images[currentIndex].src;
  lightboxImg.alt = images[currentIndex].alt;
  lightboxCaption.textContent = images[currentIndex].caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
  lightboxImg.alt = images[currentIndex].alt;
  lightboxCaption.textContent = images[currentIndex].caption;
}

// Event listeners
document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => navigate(-1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => navigate(1));

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});
