//logic for navbar
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Mobile menu auto-close on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

//footer logic 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
        }
    });
}, observerOptions);

// Observe footer sections
document.querySelectorAll('.footer-custom .col-lg-4, .footer-custom .col-lg-2').forEach(el => {
    observer.observe(el);
});

// Add fadeInUp animation
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
            @keyframes fadeInUp {
                from { 
                    opacity: 0; 
                    transform: translateY(30px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .footer-custom .col-lg-4, 
            .footer-custom .col-lg-2 {
                opacity: 0;
            }
        `;
document.head.appendChild(additionalStyle);

//signup form logic 
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Add loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.innerHTML = '';

    // Simulate form submission
    setTimeout(() => {
        submitBtn.classList.remove('btn-loading');
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Account Created!';
        submitBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';

        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    }, 2000);
});

// Add floating animation to particles
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.querySelector('.bg-animation').appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Responsive particle management
function manageParticles() {
    const screenWidth = window.innerWidth;
    const particleContainer = document.querySelector('.bg-animation');

    // Adjust particle count based on screen size
    if (screenWidth < 576) {
        // Mobile: fewer particles
        particleContainer.style.display = screenWidth < 400 ? 'none' : 'block';
        if (Math.random() < 0.3) createParticle();
    } else if (screenWidth < 768) {
        // Small tablets: moderate particles
        if (Math.random() < 0.6) createParticle();
    } else {
        // Larger screens: full particles
        createParticle();
    }
}

// Create new particles periodically with responsive logic
setInterval(manageParticles, 1000);

// Handle orientation changes
window.addEventListener('orientationchange', function () {
    setTimeout(() => {
        // Adjust layout after orientation change
        document.body.style.minHeight = window.innerHeight + 'px';

        // Recalculate particle positions
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
        });
    }, 100);
});

// Responsive form validation messages
function showValidationMessage(input, message, isValid) {
    let messageElement = input.parentNode.querySelector('.validation-message');

    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'validation-message';
        messageElement.style.cssText = `
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                    font-size: 0.75rem;
                    transition: all 0.3s ease;
                    z-index: 10;
                `;
        input.parentNode.appendChild(messageElement);
    }

    messageElement.textContent = message;
    messageElement.style.color = isValid ? '#4caf50' : '#f5576c';
    messageElement.style.opacity = message ? '1' : '0';

    // Adjust position for mobile
    if (window.innerWidth < 576) {
        messageElement.style.fontSize = '0.7rem';
        messageElement.style.bottom = '-18px';
    }
}

// Responsive keyboard handling for mobile
if (/iPhone|iPad|iPod|Android/i.test(navigator.UserAgent)) {
    let originalHeight = window.innerHeight;

    window.addEventListener('resize', function () {
        if (window.innerHeight < originalHeight * 0.75) {
            // Keyboard is likely open
            document.body.classList.add('keyboard-open');
            document.querySelector('.main-container').style.paddingTop = '1rem';
            document.querySelector('.main-container').style.paddingBottom = '1rem';
        } else {
            // Keyboard is likely closed
            document.body.classList.remove('keyboard-open');
            document.querySelector('.main-container').style.paddingTop = '';
            document.querySelector('.main-container').style.paddingBottom = '';
        }
    });
}

// Add input focus effects
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function () {
        this.closest('.form-group').style.transform = 'scale(1.02)';
        this.closest('.form-group').style.zIndex = '10';
    });

    input.addEventListener('blur', function () {
        this.closest('.form-group').style.transform = 'scale(1)';
        this.closest('.form-group').style.zIndex = '1';
    });
});

