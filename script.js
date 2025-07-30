/**
 * ADmyBRAND AI Suite - Interactive Website JavaScript
 * 
 * This file contains all the interactive functionality for the website including:
 * - Modal system with accessibility features
 * - Dynamic pricing selection
 * - Form validation and submission
 * - Testimonials carousel
 * - FAQ accordion
 * - Smooth scrolling and animations
 * - Mobile navigation
 * 
 * @author ADmyBRAND Development Team
 * @version 1.0.0
 */

// ===== GLOBAL VARIABLES AND CONFIGURATION =====
const CONFIG = {
    // Animation delays and durations
    ANIMATION_DELAY: 100,
    CAROUSEL_INTERVAL: 5000,
    FORM_SUBMIT_DELAY: 2000,
    
    // Breakpoints
    MOBILE_BREAKPOINT: 768,
    
    // API endpoints (mock for demo)
    API_ENDPOINTS: {
        SIGNIN: '/api/auth/signin',
        CONTACT: '/api/contact/submit'
    }
};

// Global state management
const AppState = {
    currentTestimonial: 0,
    selectedPricingPlan: 'professional',
    isCarouselPlaying: true,
    modalsOpen: new Set(),
    formSubmissions: new Map()
};

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 * @param {string} targetId - ID of target element
 * @param {number} offset - Offset from top in pixels
 */
function smoothScrollTo(targetId, offset = 80) {
    const target = document.getElementById(targetId.replace('#', ''));
    if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Generate unique ID for form submissions
 * @returns {string} Unique ID
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ===== MODAL SYSTEM =====

/**
 * Modal Manager Class
 * Handles all modal operations with accessibility features
 */
class ModalManager {
    constructor() {
        this.activeModal = null;
        this.previousFocus = null;
        this.init();
    }

    init() {
        // Bind event listeners for modal triggers
        this.bindModalTriggers();
        
        // Handle escape key for closing modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal(this.activeModal);
            }
        });
    }

    bindModalTriggers() {
        // Sign In Modal Triggers
        const signInTriggers = [
            'signInBtn',
            'mobileSignInBtn',
            'getStartedBtn',
            'mobileGetStartedBtn',
            'heroGetStartedBtn',
            'featuresGetStartedBtn'
        ];
        
        signInTriggers.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal('signInModal');
                });
            }
        });

        // Contact Modal Triggers
        const contactTriggers = [
            'scheduleCallBtn',
            'featuresScheduleBtn',
            'contactSalesBtn',
            'consultationBtn',
            'faqContactBtn',
            'faqScheduleBtn',
            'footerContactBtn'
        ];
        
        contactTriggers.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal('contactModal');
                });
            }
        });

        // Modal close buttons and overlays
        document.querySelectorAll('.modal-close, .modal-overlay').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = element.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // Store current focus
        this.previousFocus = document.activeElement;
        
        // Close any open modal first
        if (this.activeModal) {
            this.closeModal(this.activeModal);
        }

        // Open new modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        this.activeModal = modalId;
        AppState.modalsOpen.add(modalId);

        // Focus first focusable element
        setTimeout(() => {
            const firstFocusable = modal.querySelector('input, button, textarea, select, a[href]');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 100);

        // Trap focus within modal
        this.trapFocus(modal);
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        this.activeModal = null;
        AppState.modalsOpen.delete(modalId);

        // Restore previous focus
        if (this.previousFocus) {
            this.previousFocus.focus();
            this.previousFocus = null;
        }

        // Reset forms in modal
        const forms = modal.querySelectorAll('form');
        forms.forEach(form => {
            form.reset();
            this.clearFormErrors(form);
        });
    }

    trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        };

        modal.addEventListener('keydown', handleTabKey);
    }

    clearFormErrors(form) {
        const errorElements = form.querySelectorAll('.form-error');
        errorElements.forEach(error => error.textContent = '');
        
        const inputElements = form.querySelectorAll('.form-input, .form-textarea');
        inputElements.forEach(input => input.classList.remove('error'));
    }
}

// ===== FORM VALIDATION AND SUBMISSION =====

/**
 * Form Manager Class
 * Handles form validation and submission with real-time feedback
 */
class FormManager {
    constructor() {
        this.validators = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\+]?[1-9][\d]{0,15}$/,
            name: /^[a-zA-Z\s]{2,50}$/
        };
        this.init();
    }

    init() {
        // Bind form submissions
        this.bindFormSubmissions();
        
        // Bind real-time validation
        this.bindRealTimeValidation();
    }

    bindFormSubmissions() {
        // Sign In Form
        const signInForm = document.getElementById('signInForm');
        if (signInForm) {
            signInForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignInSubmission(signInForm);
            });
        }

        // Contact Form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(contactForm);
            });
        }

        // Success modal OK button
        const successOk = document.getElementById('successOk');
        if (successOk) {
            successOk.addEventListener('click', () => {
                modalManager.closeModal('successModal');
            });
        }
    }

    bindRealTimeValidation() {
        // Add real-time validation to all form inputs
        document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', debounce(() => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            }, 300));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        const errorElement = document.getElementById(`${field.id}Error`);
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required`;
        }
        // Email validation
        else if (name === 'email' && value && !this.validators.email.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        // Phone validation
        else if (name === 'phone' && value && !this.validators.phone.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
        // Name validation
        else if (name === 'name' && value && !this.validators.name.test(value)) {
            isValid = false;
            errorMessage = 'Name must be 2-50 characters and contain only letters';
        }
        // Password validation
        else if (name === 'password' && value && value.length < 6) {
            isValid = false;
            errorMessage = 'Password must be at least 6 characters';
        }

        // Update UI
        if (isValid) {
            field.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
        } else {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    validateForm(form) {
        const fields = form.querySelectorAll('.form-input, .form-textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    getFieldLabel(field) {
        const label = field.closest('.form-group').querySelector('.form-label');
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    async handleSignInSubmission(form) {
        if (!this.validateForm(form)) {
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Show loading state
        this.setButtonLoading(submitBtn, true);

        try {
            // Simulate API call
            await this.simulateApiCall(CONFIG.API_ENDPOINTS.SIGNIN, {
                email: formData.get('email'),
                password: formData.get('password'),
                rememberMe: formData.get('rememberMe') === 'on'
            });

            // Success - close modal and show success message
            modalManager.closeModal('signInModal');
            this.showSuccessModal('Welcome back! You have been successfully signed in.');
            
        } catch (error) {
            this.showFormError(form, 'Sign in failed. Please check your credentials and try again.');
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }

    async handleContactSubmission(form) {
        if (!this.validateForm(form)) {
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Show loading state
        this.setButtonLoading(submitBtn, true);

        try {
            // Simulate API call
            await this.simulateApiCall(CONFIG.API_ENDPOINTS.CONTACT, {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                message: formData.get('message')
            });

            // Success - close modal and show success message
            modalManager.closeModal('contactModal');
            this.showSuccessModal('Thank you for your message! We\'ll get back to you within 24 hours.');
            
        } catch (error) {
            this.showFormError(form, 'Failed to send message. Please try again later.');
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('btn-loading');
            button.disabled = true;
        } else {
            button.classList.remove('btn-loading');
            button.disabled = false;
        }
    }

    showFormError(form, message) {
        // Create or update error message element
        let errorElement = form.querySelector('.form-general-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error form-general-error';
            errorElement.style.textAlign = 'center';
            errorElement.style.marginTop = '1rem';
            form.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    showSuccessModal(message) {
        const successModal = document.getElementById('successModal');
        const successMessage = document.getElementById('successMessage');
        
        if (successMessage) {
            successMessage.textContent = message;
        }
        
        modalManager.openModal('successModal');
    }

    async simulateApiCall(endpoint, data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, CONFIG.FORM_SUBMIT_DELAY));
        
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) { // 90% success rate
            return { success: true, data };
        } else {
            throw new Error('API call failed');
        }
    }
}

// ===== DYNAMIC PRICING SYSTEM =====

/**
 * Pricing Manager Class
 * Handles dynamic pricing selection with visual feedback
 */
class PricingManager {
    constructor() {
        this.selectedPlan = AppState.selectedPricingPlan;
        this.init();
    }

    init() {
        this.bindPricingCards();
        this.bindPricingButtons();
        this.setInitialSelection();
    }

    bindPricingCards() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            card.addEventListener('click', () => {
                const plan = card.dataset.plan;
                if (plan) {
                    this.selectPlan(plan);
                }
            });

            // Add keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const plan = card.dataset.plan;
                    if (plan) {
                        this.selectPlan(plan);
                    }
                }
            });

            // Make cards focusable
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Select ${card.dataset.plan} plan`);
        });
    }

    bindPricingButtons() {
        const pricingButtons = document.querySelectorAll('.pricing-btn');
        
        pricingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                const plan = button.dataset.plan;
                
                if (plan) {
                    this.selectPlan(plan);
                    // Open appropriate modal based on plan
                    if (plan === 'enterprise') {
                        modalManager.openModal('contactModal');
                    } else {
                        modalManager.openModal('signInModal');
                    }
                }
            });
        });
    }

    selectPlan(planName) {
        // Remove selection from all cards
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.classList.remove('selected');
            card.setAttribute('aria-selected', 'false');
        });

        // Add selection to chosen card
        const selectedCard = document.querySelector(`[data-plan="${planName}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.setAttribute('aria-selected', 'true');
            
            // Update global state
            this.selectedPlan = planName;
            AppState.selectedPricingPlan = planName;

            // Announce selection for screen readers
            this.announceSelection(planName);

            // Add visual feedback
            this.addSelectionFeedback(selectedCard);
        }
    }

    setInitialSelection() {
        // Set professional plan as default selected
        this.selectPlan(this.selectedPlan);
    }

    announceSelection(planName) {
        // Create temporary announcement for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `${planName} plan selected`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    addSelectionFeedback(card) {
        // Add temporary visual feedback
        card.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }

    getSelectedPlan() {
        return this.selectedPlan;
    }
}

// ===== TESTIMONIALS CAROUSEL =====

/**
 * Testimonials Carousel Class
 * Handles testimonial rotation with accessibility and touch support
 */
class TestimonialsCarousel {
    constructor() {
        this.currentSlide = AppState.currentTestimonial;
        this.totalSlides = 0;
        this.isPlaying = AppState.isCarouselPlaying;
        this.autoplayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.init();
    }

    init() {
        this.testimonialCards = document.querySelectorAll('.testimonial-card');
        this.totalSlides = this.testimonialCards.length;
        
        if (this.totalSlides === 0) return;

        this.bindControls();
        this.bindTouchEvents();
        this.bindKeyboardEvents();
        this.updateSlide(this.currentSlide);
        this.startAutoplay();
    }

    bindControls() {
        // Previous button
        const prevBtn = document.getElementById('testimonialPrev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousSlide();
                this.pauseAutoplay();
            });
        }

        // Next button
        const nextBtn = document.getElementById('testimonialNext');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.pauseAutoplay();
            });
        }

        // Dot indicators
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.pauseAutoplay();
            });
        });

        // Pause on hover
        const carousel = document.querySelector('.testimonials-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
            carousel.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }

    bindTouchEvents() {
        const carousel = document.querySelector('.testimonials-carousel');
        if (!carousel) return;

        carousel.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }

    bindKeyboardEvents() {
        const carousel = document.querySelector('.testimonials-carousel');
        if (!carousel) return;

        carousel.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    this.pauseAutoplay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    this.pauseAutoplay();
                    break;
            }
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
            this.pauseAutoplay();
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        if (index === this.currentSlide) return;

        this.currentSlide = index;
        AppState.currentTestimonial = index;
        this.updateSlide(index);
    }

    updateSlide(index) {
        // Update cards
        this.testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
            card.setAttribute('aria-hidden', i !== index);
        });

        // Update dots
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.setAttribute('aria-selected', i === index);
        });

        // Update track position
        const track = document.getElementById('testimonialTrack');
        if (track) {
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        // Announce change for screen readers
        this.announceSlideChange(index);
    }

    announceSlideChange(index) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Testimonial ${index + 1} of ${this.totalSlides}`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    startAutoplay() {
        if (this.autoplayInterval) return;
        
        this.isPlaying = true;
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, CONFIG.CAROUSEL_INTERVAL);
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
        this.isPlaying = false;
    }
}

// ===== FAQ ACCORDION =====

/**
 * FAQ Accordion Class
 * Handles expandable FAQ items with accessibility
 */
class FAQAccordion {
    constructor() {
        this.init();
    }

    init() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                this.toggleFAQ(question);
            });

            // Keyboard support
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleFAQ(question);
                }
            });
        });
    }

    toggleFAQ(question) {
        const faqItem = question.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const isExpanded = question.getAttribute('aria-expanded') === 'true';

        // Toggle expanded state
        question.setAttribute('aria-expanded', !isExpanded);
        answer.classList.toggle('active');

        // Smooth height animation
        if (!isExpanded) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }

        // Update icon rotation
        const icon = question.querySelector('.faq-icon');
        if (icon) {
            icon.style.transform = !isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }
}

// ===== NAVIGATION SYSTEM =====

/**
 * Navigation Manager Class
 * Handles mobile menu, smooth scrolling, and active states
 */
class NavigationManager {
    constructor() {
        this.mobileMenuOpen = false;
        this.init();
    }

    init() {
        this.bindMobileMenu();
        this.bindSmoothScrolling();
        this.bindScrollSpy();
        this.handleNavbarScroll();
    }

    bindMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.mobileMenuOpen && 
                    !mobileMenu.contains(e.target) && 
                    !mobileMenuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        mobileMenuBtn.setAttribute('aria-expanded', this.mobileMenuOpen);
        mobileMenu.classList.toggle('active', this.mobileMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        if (!this.mobileMenuOpen) return;
        
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        this.mobileMenuOpen = false;
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    bindSmoothScrolling() {
        // Handle navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    smoothScrollTo(targetId);
                    this.closeMobileMenu();
                }
            });
        });
    }

    bindScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Update active nav link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;

        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class
            navbar.classList.toggle('scrolled', currentScrollY > 50);
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }
}

// ===== ANIMATION SYSTEM =====

/**
 * Animation Manager Class
 * Handles scroll-triggered animations and micro-interactions
 */
class AnimationManager {
    constructor() {
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.bindScrollAnimations();
        this.bindHoverAnimations();
        this.bindLoadAnimations();
    }

    bindScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    const delay = entry.target.dataset.aosDelay || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                        this.animatedElements.add(entry.target);
                    }, parseInt(delay));
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => observer.observe(element));
    }

    bindHoverAnimations() {
        // Feature cards hover effect
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Button hover effects
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    bindLoadAnimations() {
        // Animate elements on page load
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Animate hero elements
            const heroElements = document.querySelectorAll('.hero [data-aos]');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, index * CONFIG.ANIMATION_DELAY);
            });
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====

/**
 * Performance Manager Class
 * Handles lazy loading, image optimization, and performance monitoring
 */
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.optimizeImages();
        this.preloadCriticalResources();
        this.monitorPerformance();
    }

    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    optimizeImages() {
        // Add loading="lazy" to images below the fold
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (index > 2) { // Skip first 3 images (likely above fold)
                img.loading = 'lazy';
            }
        });
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }

    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            // This would integrate with a real performance monitoring service
            console.log('Performance monitoring initialized');
        }

        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 50) {
                        console.warn('Long task detected:', entry);
                    }
                });
            });
            observer.observe({ entryTypes: ['longtask'] });
        }
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

/**
 * Accessibility Manager Class
 * Handles keyboard navigation, screen reader support, and WCAG compliance
 */
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceKeyboardNavigation();
        this.improveScreenReaderSupport();
        this.handleReducedMotion();
        this.manageFocusStates();
    }

    enhanceKeyboardNavigation() {
        // Skip to main content link
        this.addSkipLink();
        
        // Improve focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary-600);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    improveScreenReaderSupport() {
        // Add landmark roles
        const main = document.querySelector('main');
        if (main) main.setAttribute('role', 'main');

        // Improve button labels
        document.querySelectorAll('button').forEach(button => {
            if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                const icon = button.querySelector('svg');
                if (icon) {
                    button.setAttribute('aria-label', 'Button');
                }
            }
        });

        // Add live regions for dynamic content
        this.addLiveRegions();
    }

    addLiveRegions() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
            
            // Disable autoplay for carousel
            if (window.testimonialsCarousel) {
                window.testimonialsCarousel.pauseAutoplay();
            }
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            document.body.classList.toggle('reduced-motion', e.matches);
        });
    }

    manageFocusStates() {
        // Ensure focus is visible
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--color-primary-500) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALIZATION =====

/**
 * Application Initialization
 * Initialize all managers and bind global event listeners
 */
class App {
    constructor() {
        this.managers = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Initialize all managers
            this.managers.modal = new ModalManager();
            this.managers.form = new FormManager();
            this.managers.pricing = new PricingManager();
            this.managers.testimonials = new TestimonialsCarousel();
            this.managers.faq = new FAQAccordion();
            this.managers.navigation = new NavigationManager();
            this.managers.animation = new AnimationManager();
            this.managers.performance = new PerformanceManager();
            this.managers.accessibility = new AccessibilityManager();

            // Make managers globally available for debugging
            window.modalManager = this.managers.modal;
            window.testimonialsCarousel = this.managers.testimonials;

            // Bind global event listeners
            this.bindGlobalEvents();

            // Initialize complete
            console.log('ADmyBRAND AI Suite initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }

    bindGlobalEvents() {
        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when tab is not visible
                if (this.managers.testimonials) {
                    this.managers.testimonials.pauseAutoplay();
                }
            } else {
                // Resume animations when tab becomes visible
                if (this.managers.testimonials && AppState.isCarouselPlaying) {
                    this.managers.testimonials.startAutoplay();
                }
            }
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            console.log('Connection restored');
        });

        window.addEventListener('offline', () => {
            console.log('Connection lost');
        });

        // Handle unhandled errors
        window.addEventListener('error', (e) => {
            console.error('Unhandled error:', e.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }

    handleResize() {
        // Update mobile menu state on resize
        if (window.innerWidth >= CONFIG.MOBILE_BREAKPOINT) {
            this.managers.navigation.closeMobileMenu();
        }

        // Update carousel on resize
        if (this.managers.testimonials) {
            this.managers.testimonials.updateSlide(this.managers.testimonials.currentSlide);
        }
    }
}

// ===== START APPLICATION =====

// Initialize the application
const app = new App();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        App,
        ModalManager,
        FormManager,
        PricingManager,
        TestimonialsCarousel,
        FAQAccordion,
        NavigationManager,
        AnimationManager,
        PerformanceManager,
        AccessibilityManager
    };
}