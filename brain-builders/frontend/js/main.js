// ==================== Navigation ====================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== Theme Toggle ====================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Apply saved theme before first paint to avoid flicker
(function applyStoredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
})();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        if (isLight) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ==================== Smooth Scrolling ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== Animation on Scroll ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.program-card, .faculty-card, .feature-item, .review-card, .info-item, .contact-form').forEach(el => {
    observer.observe(el);
});

// ==================== Chatbot Placeholder ====================

const chatbotPlaceholder = document.getElementById('chatbotPlaceholder');
chatbotPlaceholder.addEventListener('click', () => {
    alert('Chat support feature coming soon! 💬\n\nFor now, please contact us via:\n📞 +91 8248727875\n💬 WhatsApp Chat');
});

// ==================== Add hover effect to cards ====================

document.querySelectorAll('.program-card, .faculty-card, .feature-item, .review-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== Section navigation highlighting ====================

const navItems = document.querySelectorAll('.nav-links a[data-link]');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-link') === current) {
            item.classList.add('active');
        }
    });
});

// ==================== Loading animation ====================

window.addEventListener('load', () => {
    // Fade in hero elements
    const heroElements = document.querySelectorAll('.animate-fade-in');
    heroElements.forEach(el => {
        el.style.opacity = '1';
    });
});

// ==================== Form validation utilities ====================

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
}

function validateName(name) {
    return name.trim().length >= 2;
}

// ==================== Ripple effect for buttons ====================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.7)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Keyboard Navigation ====================

document.addEventListener('keydown', (e) => {
    // Press 'r' to scroll to reviews
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'c' to scroll to contact
    if (e.key === 'c' || e.key === 'C') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ==================== Performance optimization ====================

// Lazy load images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Page visibility (pause animations when not visible) ====================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('hidden');
    } else {
        document.body.classList.remove('hidden');
    }
});

// ==================== Utility functions ====================

function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ==================== Print functionality ====================

function printPage() {
    window.print();
}

// Make print function available globally
window.printPage = printPage;

// ==================== Export data function ====================

function exportReviewsAsJSON() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    const reviews = Array.from(reviewsContainer.querySelectorAll('.review-card')).map(card => ({
        author: card.querySelector('.review-author')?.textContent || '',
        rating: card.querySelectorAll('.fa-star.fas').length || 0,
        review: card.querySelector('.review-text')?.textContent || ''
    }));
    
    const dataStr = JSON.stringify(reviews, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'brain-builders-reviews.json';
    link.click();
}

window.exportReviewsAsJSON = exportReviewsAsJSON;

console.log('✨ Brain Builders website loaded successfully!');
