// =============================================================================
// Initialize EmailJS
// =============================================================================
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// =============================================================================
// Loading Animation
// =============================================================================
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1500);
});

// =============================================================================
// Custom Cursor
// =============================================================================
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Cursor hover effect
document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(1.5)';
        cursorOutline.style.transform = 'scale(1.5)';
    });
    
    elem.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
    });
});

// =============================================================================
// Navigation
// =============================================================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =============================================================================
// Theme Toggle
// =============================================================================
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
}

// =============================================================================
// Hero Section
// =============================================================================

// Particle animation
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particlesContainer.appendChild(particle);
}

// Typewriter effect
const typewriterText = document.getElementById('typewriter');
const phrases = ['Color Grading', 'Reel Editing', 'HDR Processing', 'Cinematic Effects'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500);
    } else {
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
}

typeWriter();

// Counter animation
const counters = document.querySelectorAll('.stat-number, .counter-value');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// =============================================================================
// About Section - Skills Animation
// =============================================================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = `${progress}%`;
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// =============================================================================
// Portfolio Section
// =============================================================================

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all') {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                const categories = item.getAttribute('data-category');
                if (categories.includes(filter)) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            }
        });
    });
});

// Video modal
const videoModal = document.getElementById('video-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const videoIframe = document.getElementById('video-iframe');
const playBtns = document.querySelectorAll('.play-btn');

// Portfolio video data
const videos = {
    1: {
        url: 'https://www.instagram.com/reel/DP-hGqGEn3Y/embed',
        title: 'Time ? ⏳',  // ← Change this to your reel's real title
        description: '#cinematic #colorgrading #davinciresolve #time',  // ← Change this
        category: 'Reels',
        duration: '12s'  // ← Update with actual duration
    },

    2: {
        url: 'https://www.instagram.com/p/EXAMPLE2/embed',
        title: 'Fashion Reel Transformation',
        description: 'Before/after comparison with cinematic grading',
        category: 'Reels',
        duration: '30s'
    },
    3: {
        url: 'https://www.instagram.com/p/EXAMPLE3/embed',
        title: 'Product Showcase',
        description: 'Professional product video with premium grading',
        category: 'Cinematic',
        duration: '60s'
    },
    4: {
        url: 'https://www.instagram.com/p/EXAMPLE4/embed',
        title: 'Lifestyle Reel',
        description: 'Dynamic transitions with cinematic color palette',
        category: 'Reels',
        duration: '40s'
    },
    5: {
        url: 'https://www.instagram.com/p/EXAMPLE5/embed',
        title: 'Food Videography',
        description: 'Appetizing color grading for food content',
        category: 'Color Grading',
        duration: '35s'
    },
    6: {
        url: 'https://www.instagram.com/p/EXAMPLE6/embed',
        title: 'Fitness Reel',
        description: 'High-energy editing with motivational feel',
        category: 'Reels',
        duration: '50s'
    }
};

playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const videoId = btn.getAttribute('data-video');
        const video = videos[videoId];
        
        videoIframe.src = video.url;
        document.getElementById('video-title').textContent = video.title;
        document.getElementById('video-description').textContent = video.description;
        document.getElementById('video-category').textContent = video.category;
        document.getElementById('video-duration').textContent = video.duration;
        
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

function closeModal() {
    videoModal.classList.remove('active');
    videoIframe.src = '';
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeModal();
    }
});

// =============================================================================
// Testimonials Carousel
// =============================================================================
const testimonialsTrack = document.getElementById('testimonials-track');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const dotsContainer = document.getElementById('carousel-dots');
const testimonialCards = document.querySelectorAll('.testimonial-card');

let currentIndex = 0;
const totalTestimonials = testimonialCards.length;

// Create dots
for (let i = 0; i < totalTestimonials; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play carousel
let autoplayInterval = setInterval(nextSlide, 5000);

// Pause autoplay on hover
document.querySelector('.testimonials-carousel').addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

document.querySelector('.testimonials-carousel').addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
});

// =============================================================================
// FAQ Accordion
// =============================================================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// =============================================================================
// Contact Form
// =============================================================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Send email using EmailJS
        await emailjs.send(
            'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                service: formData.service,
                message: formData.message
            }
        );
        
        // Show success message
        formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
        formStatus.className = 'form-status success';
        
        // Reset form
        contactForm.reset();
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission_success', {
                'event_category': 'conversion',
                'event_label': 'contact_form'
            });
        }
    } catch (error) {
        // Show error message
        formStatus.textContent = 'Oops! Something went wrong. Please try again or email directly at contact@vkshotz.com';
        formStatus.className = 'form-status error';
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});

// Form validation
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // Validate name
    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate subject
    if (subject.value.trim() === '') {
        showError(subject, 'Subject is required');
        isValid = false;
    }
    
    // Validate message
    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
}

// =============================================================================
// Back to Top Button
// =============================================================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =============================================================================
// Scroll Animations
// =============================================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections and cards
document.querySelectorAll('section > .container, .pricing-card, .portfolio-item, .testimonial-card, .timeline-item').forEach(el => {
    scrollObserver.observe(el);
});

// =============================================================================
// Performance Optimizations
// =============================================================================

// Lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// =============================================================================
// Console Easter Egg
// =============================================================================
console.log('%cVK SHOTZ', 'font-size: 50px; font-weight: bold; background: linear-gradient(45deg, #00c8ff, #ff6b35); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cLooking for a video editor? Let\'s work together!', 'font-size: 16px; color: #00c8ff;');
console.log('%cContact: contact@vkshotz.com', 'font-size: 14px; color: #94a3b8;');


// =============================================================================
// Protect Website Content (Disable Inspect & Right-Click)
// =============================================================================

// Disable right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+S (Save)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
});

// Disable text selection
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
});

// Disable copy
document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
});

// Disable cut
document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
});

// Disable paste
document.addEventListener('paste', (e) => {
    e.preventDefault();
    return false;
});

// Detect DevTools (Advanced - Optional)
let devtools = { open: false, orientation: null };
const threshold = 160;

// const emitEvent = (isOpen, orientation) => {
//    if (isOpen) {
//         console.clear();
//         document.body.innerHTML = '<h1 style="color:#00c8ff;text-align:center;margin-top:20%;">Developer Tools Detected!<br>Please close to continue.</h1>';
//     }
// };

setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    const orientation = widthThreshold ? 'vertical' : 'horizontal';
    
    if (!(heightThreshold && widthThreshold) && 
        ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || 
         widthThreshold || heightThreshold)) {
        if (!devtools.open || devtools.orientation !== orientation) {
            emitEvent(true, orientation);
            devtools.open = true;
            devtools.orientation = orientation;
        }
    } else {
        if (devtools.open) {
            emitEvent(false, null);
            devtools.open = false;
            devtools.orientation = null;
        }
    }
}, 500);

// Disable drag and drop
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
});

// Console warning message
// console.log('%cSTOP!', 'color: red; font-size: 60px; font-weight: bold;');
// console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it is a scam.', 'font-size: 20px;');
// console.log('%c⚠️ Unauthorized access to this website\'s code is prohibited.', 'color: #ff6b35; font-size: 16px; font-weight: bold;');

// Watermark images to prevent download
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.style.userSelect = 'none';
    img.style.webkitUserSelect = 'none';
    img.style.mozUserSelect = 'none';
});
