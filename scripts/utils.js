// Smooth Scroll Utility
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
});
