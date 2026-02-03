// Women & Youth Empowerment Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for empowerment page
    initEmpowermentAnimations();
    
    // Empowerment newsletter form
    const empowermentNewsletterForm = document.getElementById('empowermentNewsletterForm');
    if (empowermentNewsletterForm) {
        empowermentNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for subscribing to empowerment updates! You will receive information about training programs and opportunities.', 'success');
            this.reset();
        });
    }
    
    // Training registration form handling
    const trainingRegistrationForm = document.getElementById('trainingRegistrationForm');
    if (trainingRegistrationForm) {
        trainingRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate age
            const age = parseInt(document.getElementById('applicantAge').value);
            if (age < 18 || age > 45) {
                showNotification('Age must be between 18 and 45 years for training programs.', 'error');
                return;
            }
            
            // Validate income
            const income = parseFloat(document.getElementById('familyIncome').value);
            if (income > 300000) {
                showNotification('Family income must be below ₹3,00,000 for training eligibility.', 'error');
                return;
            }
            
            // Validate program interest
            const program = document.getElementById('trainingInterest').value;
            if (!program) {
                showNotification('Please select a training program of interest.', 'error');
                return;
            }
            
            showNotification('Training registration submitted successfully! Our team will contact you within 3 working days.', 'success');
            this.reset();
        });
    }
    
    // Training category filters
    initTrainingFilters();
    
    // Registration buttons
    document.querySelectorAll('.training-item .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const trainingTitle = this.closest('.training-item').querySelector('h4').textContent;
            const trainingDate = this.closest('.training-item').querySelector('.day').textContent + 
                               ' ' + this.closest('.training-item').querySelector('.month').textContent;
            
            showTrainingRegistrationModal(trainingTitle, trainingDate);
        });
    });
    
    // Sponsorship buttons
    document.querySelectorAll('.sponsorship-option .btn').forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.closest('.sponsorship-option').querySelector('.price').textContent;
            const program = this.closest('.sponsorship-option').querySelector('h4').textContent;
            const benefit = this.closest('.sponsorship-option').querySelector('.benefit').textContent;
            
            showEmpowermentSponsorshipModal(amount, program, benefit);
        });
    });
    
    // Empowerment statistics counter animation
    animateEmpowermentStats();
    
    // Success rate animation
    animateSuccessRates();
});

// Initialize empowerment-specific animations
function initEmpowermentAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for empowerment stats
                if (entry.target.classList.contains('empowerment-stat')) {
                    animateEmpowermentValue(entry.target.querySelector('h3'));
                }
                
                // Special handling for rate stats
                if (entry.target.classList.contains('rate-stat')) {
                    const h5 = entry.target.querySelector('h5');
                    if (h5 && !h5.classList.contains('animated')) {
                        animateRateValue(h5);
                        h5.classList.add('animated');
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe empowerment-specific elements
    document.querySelectorAll('.empowerment-stat, .empowerment-program-card, .training-item, .benefit-item, .story-card, .criterion').forEach(el => {
        observer.observe(el);
    });
}

// Animate empowerment statistics
function animateEmpowermentStats() {
    const stats = [
        { element: '.empowerment-stat:nth-child(1) h3', target: 1000, duration: 2000, suffix: '+' },
        { element: '.empowerment-stat:nth-child(2) h3', target: 500, duration: 2000, suffix: '+' },
        { element: '.empowerment-stat:nth-child(3) h3', target: 200, duration: 1500, suffix: '+' },
        { element: '.empowerment-stat:nth-child(4) h3', target: 15, duration: 1500, suffix: '+' }
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
    function animateEmpowermentValue(element, target, duration, suffix) {
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
                    animateEmpowermentValue(element, stat.target, stat.duration, stat.suffix);
                }
            });
        }
    });
}

// Animate success rates
function animateSuccessRates() {
    const rates = [
        { element: '.rate-stat:nth-child(1) h5', target: 95 },
        { element: '.rate-stat:nth-child(2) h5', target: 85 },
        { element: '.rate-stat:nth-child(3) h5', target: 40 }
    ];
    
    let ratesAnimated = false;
    
    function animateRateValue(element, target) {
        if (!element) return;
        
        const start = 0;
        const increment = target / (1000 / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '%';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 16);
    }
    
    // Check on scroll for rates
    window.addEventListener('scroll', function() {
        const firstRate = document.querySelector(rates[0].element);
        if (firstRate && isInViewport(firstRate) && !ratesAnimated) {
            ratesAnimated = true;
            rates.forEach(rate => {
                const element = document.querySelector(rate.element);
                if (element) {
                    animateRateValue(element, rate.target);
                }
            });
        }
    });
}

// Initialize training filters
function initTrainingFilters() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const trainingItems = document.querySelectorAll('.training-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide training items based on category
            trainingItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category').includes(category)) {
                    item.style.display = 'grid';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show notification
            const categoryNames = {
                'all': 'All Programs',
                'women': 'Women Only Programs',
                'youth': 'Youth Programs',
                'digital': 'Digital Skills',
                'vocational': 'Vocational Training'
            };
            
            showNotification(`Showing ${categoryNames[category]}`, 'success');
        });
    });
}

// Show training registration modal
function showTrainingRegistrationModal(trainingTitle, trainingDate) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.training-registration-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'training-registration-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Register for Training</h3>
            <p><strong>Program:</strong> ${trainingTitle}</p>
            <p><strong>Start Date:</strong> ${trainingDate} 2026</p>
            
            <div class="registration-steps">
                <h4>Registration Process:</h4>
                <div class="step">
                    <i class="fas fa-file-alt gradient-icon"></i>
                    <div>
                        <h5>Step 1: Application Form</h5>
                        <p>Complete the online application form</p>
                    </div>
                </div>
                <div class="step">
                    <i class="fas fa-phone gradient-icon"></i>
                    <div>
                        <h5>Step 2: Phone Interview</h5>
                        <p>Short phone call to discuss your goals</p>
                    </div>
                </div>
                <div class="step">
                    <i class="fas fa-check-circle gradient-icon"></i>
                    <div>
                        <h5>Step 3: Confirmation</h5>
                        <p>Receive confirmation and course details</p>
                    </div>
                </div>
            </div>
            
            <p class="modal-note">Would you like to proceed with registration for this training program?</p>
            
            <div class="modal-buttons">
                <button class="btn btn-outline" id="cancelRegistration">Not Now</button>
                <button class="btn btn-primary" id="proceedRegistration">Proceed to Application</button>
            </div>
        </div>
    `;
    
    // Add styles for modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .training-registration-modal {
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
        
        .training-registration-modal .modal-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .training-registration-modal h3 {
            margin-bottom: 20px;
            color: var(--secondary);
        }
        
        .training-registration-modal p {
            margin-bottom: 15px;
        }
        
        .registration-steps {
            margin: 25px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .registration-steps h4 {
            margin-bottom: 15px;
            color: var(--secondary);
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #ddd;
        }
        
        .step:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .step i {
            font-size: 1.5rem;
            margin-top: 5px;
        }
        
        .step h5 {
            margin-bottom: 5px;
            font-size: 1rem;
        }
        
        .step p {
            font-size: 0.9rem;
            color: var(--gray);
            margin-bottom: 0;
        }
        
        .modal-note {
            text-align: center;
            font-weight: 500;
            margin: 20px 0;
        }
        
        .modal-buttons {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        
        .modal-buttons .btn {
            flex: 1;
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
        closeModal(modal);
    });
    
    // Cancel button
    modal.querySelector('#cancelRegistration').addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Proceed button
    modal.querySelector('#proceedRegistration').addEventListener('click', function() {
        showNotification(`Registration initiated for ${trainingTitle}. You will be redirected to the application form.`, 'success');
        closeModal(modal);
        
        // Scroll to registration form
        setTimeout(() => {
            document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    function closeModal(modalElement) {
        modalElement.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
        
        setTimeout(() => {
            modalElement.remove();
        }, 300);
    }
}

// Show empowerment sponsorship modal
function showEmpowermentSponsorshipModal(amount, program, benefit) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.empowerment-sponsorship-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'empowerment-sponsorship-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Sponsor Empowerment</h3>
            <p><strong>Program:</strong> ${program}</p>
            <p><strong>Amount:</strong> ${amount}</p>
            <p><strong>Impact:</strong> ${benefit}</p>
            
            <div class="impact-preview">
                <h4>Your Sponsorship Will:</h4>
                <div class="impact-point">
                    <i class="fas fa-female gradient-icon"></i>
                    <p>Empower women with marketable skills</p>
                </div>
                <div class="impact-point">
                    <i class="fas fa-graduation-cap gradient-icon"></i>
                    <p>Provide certification and job placement</p>
                </div>
                <div class="impact-point">
                    <i class="fas fa-home gradient-icon"></i>
                    <p>Create sustainable livelihoods</p>
                </div>
            </div>
            
            <form id="empowermentSponsorshipForm">
                <div class="form-group">
                    <label for="sponsorNameEmp">Full Name</label>
                    <input type="text" id="sponsorNameEmp" name="sponsorNameEmp" required>
                </div>
                
                <div class="form-group">
                    <label for="sponsorEmailEmp">Email Address</label>
                    <input type="email" id="sponsorEmailEmp" name="sponsorEmailEmp" required>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="receiveProgress" value="yes" checked> 
                        Receive monthly progress reports
                    </label>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="visitCenter" value="yes"> 
                        Interested in visiting training center
                    </label>
                </div>
                
                <button type="submit" class="btn btn-primary btn-block">Complete Sponsorship</button>
            </form>
        </div>
    `;
    
    // Add styles for modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .empowerment-sponsorship-modal {
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
        
        .empowerment-sponsorship-modal .modal-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .empowerment-sponsorship-modal h3 {
            margin-bottom: 20px;
            color: var(--secondary);
        }
        
        .empowerment-sponsorship-modal p {
            margin-bottom: 10px;
        }
        
        .impact-preview {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .impact-preview h4 {
            margin-bottom: 15px;
            color: var(--secondary);
        }
        
        .impact-point {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .impact-point i {
            font-size: 1.2rem;
        }
        
        .impact-point p {
            margin-bottom: 0;
            font-size: 0.95rem;
        }
        
        .empowerment-sponsorship-modal .form-group {
            margin-bottom: 15px;
        }
        
        .empowerment-sponsorship-modal .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .empowerment-sponsorship-modal .form-group input[type="text"],
        .empowerment-sponsorship-modal .form-group input[type="email"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        
        .empowerment-sponsorship-modal .form-group label input[type="checkbox"] {
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
        closeModal(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Handle form submission
    const sponsorshipForm = document.getElementById('empowermentSponsorshipForm');
    if (sponsorshipForm) {
        sponsorshipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const receiveProgress = document.querySelector('input[name="receiveProgress"]:checked');
            const visitCenter = document.querySelector('input[name="visitCenter"]:checked');
            
            let message = 'Thank you for sponsoring women and youth empowerment! Your contribution will transform lives.';
            
            if (receiveProgress) {
                message += ' You will receive monthly progress reports.';
            }
            
            if (visitCenter) {
                message += ' Our team will contact you to schedule a center visit.';
            }
            
            showNotification(message, 'success');
            closeModal(modal);
            
            // Redirect to donation page
            setTimeout(() => {
                window.location.href = 'index.html#donate';
            }, 2000);
        });
    }
    
    function closeModal(modalElement) {
        modalElement.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
        
        setTimeout(() => {
            modalElement.remove();
        }, 300);
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