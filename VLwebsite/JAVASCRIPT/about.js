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
  const galleryImages = document.querySelectorAll('.row.mb-5.text-center .card-img-top');
  galleryImages.forEach(img => {
    // Add gallery-image class for hover effects
    img.classList.add('gallery-image');
    
    // Create container and overlay for zoom icon
    const parent = img.parentNode;
    const container = document.createElement('div');
    container.className = 'card-img-container';
    
    const overlay = document.createElement('div');
    overlay.className = 'card-img-overlay';
    overlay.innerHTML = '<span class="zoom-icon">🔍</span>';
    
    // Rearrange DOM
    parent.insertBefore(container, img);
    container.appendChild(img);
    container.appendChild(overlay);
    
    // Add click event for modal
    img.addEventListener('click', function() {
      // Create modal
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '1000';
      modal.style.opacity = '0';
      modal.style.transition = 'opacity 0.3s';
      
      // Create image in modal
      const modalImg = document.createElement('img');
      modalImg.src = this.src;
      modalImg.style.maxHeight = '80%';
      modalImg.style.maxWidth = '80%';
      modalImg.style.border = '3px solid #bfa14a';
      modalImg.style.boxShadow = '0 0 25px rgba(191, 161, 74, 0.6)';
      
      // Add close button
      const closeBtn = document.createElement('span');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '20px';
      closeBtn.style.right = '30px';
      closeBtn.style.color = '#fff';
      closeBtn.style.fontSize = '40px';
      closeBtn.style.fontWeight = 'bold';
      closeBtn.style.cursor = 'pointer';
      
      // Add click event to close modal
      closeBtn.onclick = function() {
        modal.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 300);
      };
      
      // Append elements to modal
      modal.appendChild(modalImg);
      modal.appendChild(closeBtn);
      document.body.appendChild(modal);
      
      // Fade in modal
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 10);
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