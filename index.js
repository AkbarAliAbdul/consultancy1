// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        // Show/hide scroll to top button
        const scrollTopBtn = document.getElementById('scrollToTop');
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Change icon
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Scroll to top functionality
    const scrollTopBtn = document.getElementById('scrollToTop');
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form submissions (prevent default and show success message)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form type
           const formId = this.id;
            const formData = new FormData(this);

            if (formId === "volunteerForm") formData.append("formType", "volunteer");
            if (formId === "contactForm")   formData.append("formType", "contact");
            if (formId === "donationForm")  formData.append("formType", "donation");
            if (formId === "scholarshipForm") formData.append("formType", "education");

            fetch("https://script.google.com/macros/s/AKfycbz8C1rCMT54QlY7iIhl-1PnYtouZf5MZY7bmP9wSZsJwyu7TRCCn5g4aB6iCE3iQ5hm/exec", {
            method: "POST",
            body: formData
            })
            .then(res => res.json())
            .then(() => {
            showNotification("Submitted successfully!", "success");
            this.reset();
            })
            .catch(() => {
            showNotification("Submission failed.", "error");
            });

            // Reset form
            this.reset();
            
            // Remove active class from amount buttons
            document.querySelectorAll('.amount-option').forEach(btn => {
                btn.classList.remove('active');
            });
        });
    });
    
    // Donation amount buttons
    const amountButtons = document.querySelectorAll('.amount-option');
    const amountInput = document.getElementById('amount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the amount in the input field
            const amount = this.getAttribute('data-amount');
            amountInput.value = amount;
        });
    });
    
    // Initialize animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to show notification
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
        
        // Add styles for notification
        const style = document.createElement('style');
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
        document.body.appendChild(notification);
        
        // Auto remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            
            // Add slideOut animation
            const slideOutStyle = document.createElement('style');
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
    
    // Gallery image modal (enhancement)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <p>${this.querySelector('.gallery-overlay p').textContent}</p>
                </div>
            `;
            
            // Add styles for modal
            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .gallery-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .modal-content {
                    max-width: 90%;
                    max-height: 90%;
                    position: relative;
                }
                
                .modal-content img {
                    max-width: 100%;
                    max-height: 70vh;
                    border-radius: 10px;
                }
                
                .modal-content p {
                    color: white;
                    text-align: center;
                    margin-top: 15px;
                    font-size: 1.2rem;
                }
                
                .close-modal {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: white;
                    font-size: 2.5rem;
                    cursor: pointer;
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
            
            // Close modal when clicking outside the image
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.querySelector('.close-modal').click();
                }
            });
        });
    });
    
    // Initialize with header check
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    }
    
    // Initialize active nav link
    updateActiveNavLink();
});



