// Education Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for education page
    initEducationAnimations();
    
    // Education newsletter form
    const educationNewsletterForm = document.getElementById('educationNewsletterForm');
    if (educationNewsletterForm) {
        educationNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (typeof showNotification === 'function') {
                showNotification('Thank you for subscribing to education updates! You will receive information about scholarships and educational programs.', 'success');
            } else {
                alert('Thank you for subscribing to education updates!');
            }
            this.reset();
        });
    }
    
    // Scholarship form validation ONLY
 // In education.js - Scholarship form validation
const scholarshipForm = document.getElementById('scholarshipForm');
if (scholarshipForm) {
    scholarshipForm.addEventListener('submit', function(e) {
        // Validate BEFORE index.js handler
        const marks = parseFloat(document.getElementById('previousMarks').value);
        const income = parseFloat(document.getElementById('familyIncome').value);
        
        if (marks < 75 || income > 300000) {
            e.preventDefault(); // Stop index.js from running
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Show error message
            if (typeof showNotification === 'function') {
                if (marks < 75) {
                    showNotification('Minimum 75% marks required for scholarship application.', 'error');
                } else {
                    showNotification('Family income must be below ₹3,00,000 for scholarship eligibility.', 'error');
                }
            }
            
            // Reset button after 1 second
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
            
            return false;
        }
        
        // If validation passes, let index.js handle the submission
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Button will be reset by index.js success/error callback
    });
}
    
    // Education statistics counter animation
    animateEducationStats();
});

// Initialize education-specific animations
function initEducationAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for education stats
                if (entry.target.classList.contains('education-stat')) {
                    const h3Element = entry.target.querySelector('h3');
                    if (h3Element && !h3Element.classList.contains('animated')) {
                        h3Element.classList.add('animated');
                        const target = parseInt(h3Element.textContent.replace('+', ''));
                        if (!isNaN(target)) {
                            animateEducationValue(h3Element, target, 2000);
                        }
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe education-specific elements
    document.querySelectorAll('.education-stat, .education-program-card, .student-story, .benefit').forEach(el => {
        observer.observe(el);
    });
}

// Animate education statistics
function animateEducationStats() {
    const stats = [
        { element: '.education-stat:nth-child(1) h3', target: 500, duration: 2000 },
        { element: '.education-stat:nth-child(2) h3', target: 1200, duration: 2500 },
        { element: '.education-stat:nth-child(3) h3', target: 50, duration: 1500 },
        { element: '.education-stat:nth-child(4) h3', target: 15, duration: 1500 }
    ];
    
    let animated = false;
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate a single value
    function animateEducationValue(element, target, duration) {
        if (!element) return;
        
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // Check on scroll
    window.addEventListener('scroll', function() {
        const firstStat = document.querySelector(stats[0].element);
        if (firstStat && isInViewport(firstStat) && !animated) {
            animated = true;
            stats.forEach(stat => {
                const element = document.querySelector(stat.element);
                if (element && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    animateEducationValue(element, stat.target, stat.duration);
                }
            });
        }
    });
    
    // Also check on page load in case elements are already in viewport
    setTimeout(() => {
        const firstStat = document.querySelector(stats[0].element);
        if (firstStat && isInViewport(firstStat) && !animated) {
            animated = true;
            stats.forEach(stat => {
                const element = document.querySelector(stat.element);
                if (element && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    animateEducationValue(element, stat.target, stat.duration);
                }
            });
        }
    }, 500);
}