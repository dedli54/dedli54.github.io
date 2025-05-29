document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year dynamically
    const copyrightYear = document.querySelector('.bakery-footer p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2025', currentYear);
    }
});