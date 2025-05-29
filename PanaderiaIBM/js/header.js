document.addEventListener('DOMContentLoaded', function() {
    
    
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            (currentLocation === '/' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});