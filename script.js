// Fill year
document.getElementById('year').textContent = new Date().getFullYear();

/* -----------------------
   Typewriter effect
   ----------------------- */
const typeTarget = document.getElementById('typewriter');
const typeText = "Hi, I'm Victor Mutai 👋";
let tIdx = 0;
function typeTick() {
  if (tIdx < typeText.length) {
    typeTarget.textContent += typeText.charAt(tIdx);
    tIdx++;
    setTimeout(typeTick, 60 + Math.random()*40);
  } else {
    // small cursor blink at end
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = ' ';
    typeTarget.appendChild(cursor);
  }
}
typeTick();

/* -----------------------
   Simple carousel for hobbies
   ----------------------- */
const carouselImgs = document.querySelectorAll('.carousel-img');
let cIndex = 0;
function showCarousel() {
  if (!carouselImgs.length) return;
  carouselImgs.forEach((img, i) => img.style.display = i === cIndex ? 'block' : 'none');
  cIndex = (cIndex + 1) % carouselImgs.length;
}
showCarousel();
setInterval(showCarousel, 2500);

/* -----------------------
   IntersectionObserver to reveal sections
   ----------------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('inview');
      // unobserve to avoid repeating
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* -----------------------
   Small interactive glow on mousemove for hero
   ----------------------- */
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // shift blob positions slightly for parallax feeling
    document.querySelectorAll('.blob').forEach((b,i) => {
      const moveX = (x - 0.5) * (12 + i*6);
      const moveY = (y - 0.5) * (12 + i*6);
      b.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

/* -----------------------
   Tiny accessibility: enable keyboard focus outlines only when tabbing
   ----------------------- */
function handleFirstTab(e) {
  if (e.key === 'Tab') {
    document.documentElement.classList.add('show-focus');
    window.removeEventListener('keydown', handleFirstTab);
  }
}
window.addEventListener('keydown', handleFirstTab);

