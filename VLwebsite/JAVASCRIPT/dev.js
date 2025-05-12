// Wait for DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Fade-in animation for main content
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach(el => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200);
  });
});