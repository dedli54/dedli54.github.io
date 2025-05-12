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
  
  // Function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Apply animations to elements when they enter the viewport
  function animateElementsOnScroll() {
    // Fade-in animations for main content
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('visible')) {
        setTimeout(() => {
          element.classList.add('visible');
        }, 200);
      }
    });
    
    // Slide-in animations from left
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    slideLeftElements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('visible')) {
        setTimeout(() => {
          element.classList.add('visible');
        }, 300);
      }
    });
    
    // Slide-in animations from right
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    slideRightElements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('visible')) {
        setTimeout(() => {
          element.classList.add('visible');
        }, 300);
      }
    });
    
    // Scale-in animations
    const scaleElements = document.querySelectorAll('.scale-in');
    scaleElements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('visible')) {
        setTimeout(() => {
          element.classList.add('visible');
        }, 300);
      }
    });
  }

  // Add animation classes to elements
  const gameOverviewCard = document.querySelector('.card.mb-5');
  gameOverviewCard.classList.add('scale-in');
  
  const controlsCard = document.querySelector('.col-md-6:nth-child(1) .card');
  controlsCard.classList.add('slide-in-left');
  
  const powerupsCard = document.querySelector('.col-md-6:nth-child(2) .card');
  powerupsCard.classList.add('slide-in-right');
  
  const charactersCard = document.querySelector('.row.mb-5:nth-child(4) .col-md-6:nth-child(1) .card');
  charactersCard.classList.add('slide-in-left');
  
  const objectivesCard = document.querySelector('.row.mb-5:nth-child(4) .col-md-6:nth-child(2) .card');
  objectivesCard.classList.add('slide-in-right');
  
  // Gallery image hover effects and modal functionality
  const galleryImages = document.querySelectorAll('.gallery-img');
  galleryImages.forEach(img => {
    // Add gallery-image class for hover effects
    img.classList.add('gallery-image');
    
    // Add click event for modal
    img.addEventListener('click', function() {
      // Get the modal element and image
      const modalElement = document.getElementById('imageModal');
      const modalImage = document.getElementById('modalImage');
      
      // Set the image source
      modalImage.src = this.src;
      
      // Create and show the modal using Bootstrap
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    });
  });
  
  // Add animation on scroll
  window.addEventListener('scroll', animateElementsOnScroll);
  
  // Initial check for animations
  animateElementsOnScroll();
  
  // Highlight active nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath)) {
      link.style.color = '#ffd700 !important';
      link.style.fontWeight = 'bold';
    }
  });
  
  // Add hover effects to list items
  const listItems = document.querySelectorAll('.list-group-item');
  listItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });
});

