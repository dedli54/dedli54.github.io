// Wait for DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  
    // Typing animation for the main heading
  const heading = document.querySelector('h1.display-4');
  const originalText = heading.textContent;
  heading.textContent = '';
  
  // Function to animate the typing effect
  function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      heading.textContent = text.substring(0, i+1);
      
      // Delay between each character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    } else if (fnCallback) {
      setTimeout(fnCallback, 700);
    }
  }
  
  // Start the typing animation
  setTimeout(() => {
    typeWriter(originalText, 0);
  }, 500);
  
  
  // Fade-in animation for main content
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach(el => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200);
  });
});