// Food & Relief Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for food relief page
    initFoodAnimations();
    
    // Food newsletter form
    const foodNewsletterForm = document.getElementById('foodNewsletterForm');
    if (foodNewsletterForm) {
        foodNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for subscribing to food relief updates! You will receive information about distributions and emergency relief.', 'success');
            this.reset();
        });
    }
    
    // Emergency form handling
    const emergencyForm = document.getElementById('emergencyForm');
    if (emergencyForm) {
        emergencyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate emergency type
            const emergencyType = document.getElementById('emergencyType').value;
            if (!emergencyType) {
                showNotification('Please select the type of emergency.', 'error');
                return;
            }
            
            // Validate affected people
            const affectedPeople = parseInt(document.getElementById('affectedPeople').value);
            if (affectedPeople < 1) {
                showNotification('Please enter the number of affected people.', 'error');
                return;
            }
            
            // Validate at least one need selected
            const needs = document.querySelectorAll('input[name="needs"]:checked');
            if (needs.length === 0) {
                showNotification('Please select at least one immediate need.', 'error');
                return;
            }
            
            showNotification('Emergency support request submitted! Our response team will contact you within 30 minutes.', 'success');
            this.reset();
            
            // Simulate emergency response alert
            setTimeout(() => {
                showNotification('🚨 Emergency Response Alert: Our team has been dispatched to your location.', 'success');
            }, 5000);
        });
    }
    
    // Sponsorship buttons
    document.querySelectorAll('.sponsorship-option .btn').forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.closest('.sponsorship-option').querySelector('.price').textContent;
            const program = this.closest('.sponsorship-option').querySelector('h4').textContent;
            const serves = this.closest('.sponsorship-option').querySelector('.serves').textContent;
            
            showFoodSponsorshipModal(amount, program, serves);
        });
    });
    
    // Calendar navigation
    initCalendarNavigation();
    
    // Food statistics counter animation
    animateFoodStats();
    
    // Distribution day tooltips
    initDistributionTooltips();
});

// Initialize food-specific animations
function initFoodAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for food stats
                if (entry.target.classList.contains('food-stat')) {
                    animateFoodValue(entry.target.querySelector('h3'));
                }
            }
        });
    }, observerOptions);
    
    // Observe food-specific elements
    document.querySelectorAll('.food-stat, .food-program-card, .location, .contact-card, .kit-item').forEach(el => {
        observer.observe(el);
    });
}

// Animate food statistics
function animateFoodStats() {
    const stats = [
        { element: '.food-stat:nth-child(1) h3', target: 50000, duration: 2500, suffix: '+' },
        { element: '.food-stat:nth-child(2) h3', target: 2000, duration: 2000, suffix: '+' },
        { element: '.food-stat:nth-child(3) h3', target: 10, duration: 1500, suffix: '+' },
        { element: '.food-stat:nth-child(4) h3', target: 15, duration: 1500, suffix: '+' }
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
    function animateFoodValue(element, target, duration, suffix) {
        if (!element || animated) return;
        
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString() + suffix;
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
                    animateFoodValue(element, stat.target, stat.duration, stat.suffix);
                }
            });
        }
    });
}

// Initialize calendar navigation
function initCalendarNavigation() {
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const calendarTitle = document.querySelector('.calendar-header h4');
    
    if (prevMonthBtn && nextMonthBtn && calendarTitle) {
        let currentMonth = 2; // March (0-indexed)
        let currentYear = 2026;
        
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendarDisplay();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendarDisplay();
        });
        
        function updateCalendarDisplay() {
            calendarTitle.textContent = `${months[currentMonth]} ${currentYear}`;
            
            // Show notification about calendar change
            showNotification(`Now viewing ${months[currentMonth]} distribution schedule`, 'success');
        }
    }
}

// Initialize distribution day tooltips
function initDistributionTooltips() {
    const distributionDays = document.querySelectorAll('.distribution-day');
    
    distributionDays.forEach(day => {
        day.addEventListener('mouseenter', function() {
            const dayNumber = this.textContent;
            const tooltip = document.createElement('div');
            tooltip.className = 'distribution-tooltip';
            tooltip.textContent = `Food distribution on March ${dayNumber}`;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 0.8rem;
                z-index: 1000;
                white-space: nowrap;
                transform: translate(-50%, -100%);
                margin-top: -10px;
            `;
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top + 'px';
            
            document.body.appendChild(tooltip);
            
            // Store reference to remove later
            this.tooltip = tooltip;
        });
        
        day.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });
}

// Show food sponsorship modal
function showFoodSponsorshipModal(amount, program, serves) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.food-sponsorship-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'food-sponsorship-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Sponsor Food Relief</h3>
            <p><strong>Program:</strong> ${program}</p>
            <p><strong>Amount:</strong> ${amount}</p>
            <p><strong>Impact:</strong> ${serves}</p>
            
            <form id="foodSponsorshipForm">
                <div class="form-group">
                    <label for="sponsorName">Full Name</label>
                    <input type="text" id="sponsorName" name="sponsorName" required>
                </div>
                
                <div class="form-group">
                    <label for="sponsorEmail">Email Address</label>
                    <input type="email" id="sponsorEmail" name="sponsorEmail" required>
                </div>
                
                <div class="form-group">
                    <label for="sponsorPhone">Phone Number</label>
                    <input type="tel" id="sponsorPhone" name="sponsorPhone" required>
                </div>
                
                <div class="form-group">
                    <label for="sponsorshipAmount">Sponsorship Amount (₹)</label>
                    <input type="text" id="sponsorshipAmount" name="sponsorshipAmount" value="${amount.replace('₹', '').replace(',', '')}" readonly>
                </div>
                
                <div class="form-group">
                    <label for="sponsorshipFrequency">Sponsorship Frequency</label>
                    <select id="sponsorshipFrequency" name="sponsorshipFrequency">
                        <option value="one-time">One-time Sponsorship</option>
                        <option value="monthly">Monthly Sponsorship</option>
                        <option value="quarterly">Quarterly Sponsorship</option>
                        <option value="yearly">Yearly Sponsorship</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="dedication">Dedication (Optional)</label>
                    <input type="text" id="dedication" name="dedication" placeholder="In memory of / In honor of">
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="receiveUpdates" value="yes" checked> 
                        Receive impact updates with photos
                    </label>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="anonymous" value="yes"> 
                        Donate anonymously
                    </label>
                </div>
                
                <button type="submit" class="btn btn-primary btn-block">Proceed to Sponsorship</button>
            </form>
        </div>
    `;
    
    // Add styles for modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .food-sponsorship-modal {
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
        
        .food-sponsorship-modal .modal-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .food-sponsorship-modal h3 {
            margin-bottom: 20px;
            color: var(--secondary);
        }
        
        .food-sponsorship-modal p {
            margin-bottom: 15px;
        }
        
        .food-sponsorship-modal .form-group {
            margin-bottom: 15px;
        }
        
        .food-sponsorship-modal .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .food-sponsorship-modal .form-group input,
        .food-sponsorship-modal .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        
        .food-sponsorship-modal .form-group label input[type="checkbox"] {
            width: auto;
            margin-right: 10px;
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
    const sponsorshipForm = document.getElementById('foodSponsorshipForm');
    if (sponsorshipForm) {
        sponsorshipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const dedication = document.getElementById('dedication').value;
            let message = 'Thank you for your generous food sponsorship!';
            
            if (dedication) {
                message += ` Your dedication "${dedication}" will be included in our records.`;
            }
            
            showNotification(message, 'success');
            modal.querySelector('.close-modal').click();
            
            // Simulate redirect to payment
            setTimeout(() => {
                window.location.href = 'index.html#donate';
            }, 2000);
        });
    }
}

// Function to show notification
function showNotification(message, type) {
    // Reuse the showNotification function from index.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            color: white;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}