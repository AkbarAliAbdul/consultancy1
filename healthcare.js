// Healthcare Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for healthcare page
    initHealthcareAnimations();
    
    // Healthcare newsletter form
    const healthNewsletterForm = document.getElementById('healthNewsletterForm');
    if (healthNewsletterForm) {
        healthNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for subscribing to healthcare updates! You will receive information about medical camps and health programs.', 'success');
            this.reset();
        });
    }
    
    // Healthcare statistics counter animation
    animateHealthcareStats();
    
    // Event registration functionality
    initEventRegistration();
});

// Initialize healthcare-specific animations
function initHealthcareAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for healthcare stats
                if (entry.target.classList.contains('healthcare-stat') || 
                    entry.target.classList.contains('number-item')) {
                    animateValue(entry.target.querySelector('h3') || entry.target.querySelector('h4'));
                }
            }
        });
    }, observerOptions);
    
    // Observe healthcare-specific elements
    document.querySelectorAll('.healthcare-stat, .number-item, .healthcare-program-card, .impact-story').forEach(el => {
        observer.observe(el);
    });
}

// Animate healthcare statistics
function animateHealthcareStats() {
    const stats = [
        { element: '.healthcare-stat:nth-child(1) h3', target: 50, duration: 2000 },
        { element: '.healthcare-stat:nth-child(2) h3', target: 5000, duration: 2500 },
        { element: '.healthcare-stat:nth-child(3) h3', target: 100, duration: 1500 },
        { element: '.healthcare-stat:nth-child(4) h3', target: 25, duration: 1500 }
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
    function animateValue(element, target, duration) {
        if (!element || animated) return;
        
        const start = 0;
        const increment = target / (duration / 16); // 60fps
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
                if (element) {
                    animateValue(element, stat.target, stat.duration);
                }
            });
        }
    });
}

// Initialize event registration functionality
function initEventRegistration() {
    const eventButtons = document.querySelectorAll('.event .btn-outline');
    
    eventButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventDetails = this.closest('.event').querySelector('.event-details h4').textContent;
            const eventDate = this.closest('.event').querySelector('.event-date .day').textContent + 
                            ' ' + this.closest('.event').querySelector('.event-date .month').textContent;
            
            // Show registration modal
            showEventRegistrationModal(eventDetails, eventDate);
        });
    });
}

// Show event registration modal
function showEventRegistrationModal(eventName, eventDate) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.event-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Register for Event</h3>
            <p><strong>Event:</strong> ${eventName}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            
            <form id="eventRegistrationForm">
                <div class="form-group">
                    <label for="regName">Full Name</label>
                    <input type="text" id="regName" name="regName" required>
                </div>
                
                <div class="form-group">
                    <label for="regEmail">Email Address</label>
                    <input type="email" id="regEmail" name="regEmail" required>
                </div>
                
                <div class="form-group">
                    <label for="regPhone">Phone Number</label>
                    <input type="tel" id="regPhone" name="regPhone" required>
                </div>
                
                <div class="form-group">
                    <label for="regRole">Role/Profession</label>
                    <select id="regRole" name="regRole" required>
                        <option value="">Select your role</option>
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                        <option value="paramedic">Paramedic</option>
                        <option value="volunteer">General Volunteer</option>
                        <option value="donor">Blood Donor</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <button type="submit" class="btn btn-primary btn-block">Register for Event</button>
            </form>
        </div>
    `;
    
    // Add styles for modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .event-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .event-modal .modal-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .event-modal h3 {
            margin-bottom: 20px;
            color: var(--secondary);
        }
        
        .event-modal p {
            margin-bottom: 15px;
        }
        
        .event-modal .form-group {
            margin-bottom: 15px;
        }
        
        .event-modal .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .event-modal .form-group input,
        .event-modal .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 1.8rem;
            cursor: pointer;
            color: var(--gray);
            transition: var(--transition);
        }
        
        .close-modal:hover {
            color: var(--accent);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(modalStyle);
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.querySelector('.close-modal').click();
        }
    });
    
    // Handle form submission
    const registrationForm = document.getElementById('eventRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            showNotification('Thank you for registering for the event! We will contact you with more details.', 'success');
            modal.querySelector('.close-modal').click();
        });
    }
}

// Function to show notification (reuse from index.js)
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="close-notification">&times;</button>
    `;
    
    // Add styles for notification (if not already added)
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 400px;
                animation: slideIn 0.3s ease-out;
            }
            
            .notification.success {
                background: #27ae60;
                color: white;
            }
            
            .notification.error {
                background: #e74c3c;
                color: white;
            }
            
            .notification p {
                margin: 0;
                margin-right: 15px;
            }
            
            .close-notification {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        
        // Add slideOut animation if not exists
        if (!document.querySelector('#slideOut-styles')) {
            const slideOutStyle = document.createElement('style');
            slideOutStyle.id = 'slideOut-styles';
            slideOutStyle.textContent = `
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(slideOutStyle);
        }
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}