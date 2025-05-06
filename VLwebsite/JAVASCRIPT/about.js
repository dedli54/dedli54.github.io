// Fade-in animation for main content
document.addEventListener("DOMContentLoaded", function() {
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach(el => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200);
  });
});