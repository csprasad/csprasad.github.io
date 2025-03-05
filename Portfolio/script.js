// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark Mode Toggle
const toggle = document.getElementById('modeToggle');
const body = document.body;
const sunIcon = toggle.querySelector('.bi-sun-fill');
const moonIcon = toggle.querySelector('.bi-moon-fill');
const glassElements = document.querySelectorAll('.glassy-light, .glassy-dark');

// Load saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark');
    sunIcon.classList.add('d-none');
    moonIcon.classList.remove('d-none');
    glassElements.forEach(el => {
        el.classList.remove('glassy-light');
        el.classList.add('glassy-dark');
    });
} else {
    body.classList.remove('dark');
    sunIcon.classList.remove('d-none');
    moonIcon.classList.add('d-none');
    glassElements.forEach(el => {
        el.classList.add('glassy-light');
        el.classList.remove('glassy-dark');
    });
}

// Toggle dark mode and icons
toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
        sunIcon.classList.add('d-none');
        moonIcon.classList.remove('d-none');
        glassElements.forEach(el => {
            el.classList.remove('glassy-light');
            el.classList.add('glassy-dark');
        });
    } else {
        localStorage.setItem('darkMode', 'disabled');
        sunIcon.classList.remove('d-none');
        moonIcon.classList.add('d-none');
        glassElements.forEach(el => {
            el.classList.add('glassy-light');
            el.classList.remove('glassy-dark');
        });
    }
});