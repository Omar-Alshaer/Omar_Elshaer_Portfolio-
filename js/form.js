// Contact Form Management System
class ContactForm {
    constructor() {
        this.form = null;
        this.formData = {};
        this.isSubmitting = false;
        this.validationRules = {};
        
        this.init();
    }
    
    init() {
        this.setupForm();
        this.setupValidation();
        this.setupEventListeners();
        this.setupAnimations();
    }
    
    setupForm() {
        this.form = document.querySelector('#contactForm');
        if (!this.form) return;
        
        // Add form attributes
        this.form.setAttribute('novalidate', '');
        this.form.setAttribute('autocomplete', 'off');
        
        // Setup form data structure
        this.formData = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    }
    
    setupValidation() {
        this.validationRules = {
            name: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            subject: {
                required: false,
                maxLength: 100
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000
            }
        };
    }
    
    setupEventListeners() {
        if (!this.form) return;
        
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Real-time validation
        this.form.addEventListener('input', (e) => {
            this.validateField(e.target);
        });
        
        // Field focus/blur effects
        this.form.addEventListener('focusin', (e) => {
            this.handleFieldFocus(e.target);
        });
        
        this.form.addEventListener('focusout', (e) => {
            this.handleFieldBlur(e.target);
        });
        
        // Character count for message
        const messageField = this.form.querySelector('#message');
        if (messageField) {
            messageField.addEventListener('input', (e) => {
                this.updateCharacterCount(e.target);
            });
        }
        
        // Auto-resize textarea
        if (messageField) {
            messageField.addEventListener('input', (e) => {
                this.autoResizeTextarea(e.target);
            });
        }
    }
    
    setupAnimations() {
        // Add floating label animation
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('.form-control');
            const label = group.querySelector('.form-label');
            
            if (input && label) {
                // Check if field has value on load
                if (input.value.trim()) {
                    group.classList.add('field-focused');
                }
                
                // Add ripple effect to submit button
                const submitBtn = this.form.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.addEventListener('click', (e) => {
                        this.createRippleEffect(e);
                    });
                }
            }
        });
    }
    
    handleFieldFocus(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('field-focused');
            this.addFocusAnimation(field);
        }
    }
    
    handleFieldBlur(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            // Only remove focused class if field is empty
            if (!field.value.trim()) {
                formGroup.classList.remove('field-focused');
            }
            this.removeFocusAnimation(field);
        }
        
        // Validate field on blur
        this.validateField(field);
    }
    
    addFocusAnimation(field) {
        field.style.transform = 'scale(1.02)';
        field.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
        
        // Add glow effect
        field.style.borderColor = 'var(--primary)';
    }
    
    removeFocusAnimation(field) {
        field.style.transform = '';
        field.style.boxShadow = '';
        field.style.borderColor = '';
    }
    
    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[fieldName];
        
        if (!rules) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
        }
        
        // Pattern validation
        if (rules.pattern && value && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = this.getPatternErrorMessage(fieldName);
        }
        
        // Length validation
        if (rules.minLength && value && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} must be at least ${rules.minLength} characters`;
        }
        
        if (rules.maxLength && value && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} must be no more than ${rules.maxLength} characters`;
        }
        
        // Update field validation state
        this.updateFieldValidation(field, isValid, errorMessage);
        
        return isValid;
    }
    
    updateFieldValidation(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        
        // Remove existing error
        if (existingError) {
            existingError.remove();
        }
        
        // Add error if invalid
        if (!isValid && errorMessage) {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = errorMessage;
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.8rem;
                margin-top: 5px;
                animation: slideInDown 0.3s ease;
            `;
            
            formGroup.appendChild(errorElement);
            
            // Add error styling to field
            field.style.borderColor = '#ef4444';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        } else {
            // Remove error styling
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
        
        // Update form group state
        formGroup.classList.toggle('has-error', !isValid);
        formGroup.classList.toggle('is-valid', isValid && field.value.trim());
    }
    
    getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }
    
    getPatternErrorMessage(fieldName) {
        const messages = {
            name: 'Name can only contain letters and spaces',
            email: 'Please enter a valid email address'
        };
        return messages[fieldName] || 'Invalid format';
    }
    
    updateCharacterCount(field) {
        const maxLength = this.validationRules.message.maxLength;
        const currentLength = field.value.length;
        const remaining = maxLength - currentLength;
        
        // Find or create character count element
        let countElement = field.parentNode.querySelector('.char-count');
        if (!countElement) {
            countElement = document.createElement('div');
            countElement.className = 'char-count';
            countElement.style.cssText = `
                text-align: right;
                font-size: 0.8rem;
                color: var(--text-secondary);
                margin-top: 5px;
            `;
            field.parentNode.appendChild(countElement);
        }
        
        // Update count
        countElement.textContent = `${currentLength}/${maxLength}`;
        
        // Change color based on remaining characters
        if (remaining <= 50) {
            countElement.style.color = remaining <= 10 ? '#ef4444' : '#f59e0b';
        } else {
            countElement.style.color = 'var(--text-secondary)';
        }
    }
    
    autoResizeTextarea(field) {
        field.style.height = 'auto';
        field.style.height = Math.min(field.scrollHeight, 200) + 'px';
    }
    
    createRippleEffect(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    async handleSubmit() {
        if (this.isSubmitting) return;
        
        // Validate all fields
        const isValid = this.validateForm();
        if (!isValid) {
            this.showFormMessage('Please fix the errors above', 'error');
            return;
        }
        
        // Collect form data
        this.collectFormData();
        
        // Show loading state
        this.setSubmittingState(true);
        this.showFormMessage('Sending message...', 'loading');
        
        try {
            // Simulate API call
            await this.submitForm();
            
            // Show success message
            this.showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.resetForm();
            
        } catch (error) {
            // Show error message
            this.showFormMessage('Failed to send message. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            this.setSubmittingState(false);
        }
    }
    
    validateForm() {
        let isValid = true;
        const fields = this.form.querySelectorAll('.form-control');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    collectFormData() {
        const formData = new FormData(this.form);
        
        for (let [key, value] of formData.entries()) {
            this.formData[key] = value.trim();
        }
    }
    
    async submitForm() {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate random success/failure
        if (Math.random() > 0.1) {
            return Promise.resolve();
        } else {
            throw new Error('Network error');
        }
    }
    
    setSubmittingState(submitting) {
        this.isSubmitting = submitting;
        const submitBtn = this.form.querySelector('.submit-btn');
        
        if (submitBtn) {
            submitBtn.disabled = submitting;
            submitBtn.innerHTML = submitting ? 
                '<i class="fas fa-spinner fa-spin"></i> Sending...' : 
                '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }
        
        // Disable all form fields during submission
        const formFields = this.form.querySelectorAll('.form-control');
        formFields.forEach(field => {
            field.disabled = submitting;
        });
    }
    
    showFormMessage(message, type) {
        const messageElement = this.form.querySelector('.form-message');
        if (!messageElement) return;
        
        // Remove existing classes
        messageElement.className = 'form-message';
        
        // Add new classes
        messageElement.classList.add(type, 'show');
        messageElement.textContent = message;
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                messageElement.classList.remove('show');
            }, 5000);
        }
    }
    
    resetForm() {
        this.form.reset();
        
        // Reset form state
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('field-focused', 'has-error', 'is-valid');
        });
        
        // Reset character count
        const messageField = this.form.querySelector('#message');
        if (messageField) {
            messageField.style.height = 'auto';
            const countElement = messageField.parentNode.querySelector('.char-count');
            if (countElement) {
                countElement.remove();
            }
        }
        
        // Reset form data
        this.formData = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    }
    
    // Public methods for external use
    setFieldValue(fieldName, value) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.value = value;
            this.validateField(field);
        }
    }
    
    getFieldValue(fieldName) {
        return this.formData[fieldName] || '';
    }
    
    getFormData() {
        return { ...this.formData };
    }
    
    isValid() {
        return this.validateForm();
    }
    
    // Add custom validation rule
    addValidationRule(fieldName, rule) {
        if (!this.validationRules[fieldName]) {
            this.validationRules[fieldName] = {};
        }
        Object.assign(this.validationRules[fieldName], rule);
    }
    
    // Remove validation rule
    removeValidationRule(fieldName, ruleKey) {
        if (this.validationRules[fieldName]) {
            delete this.validationRules[fieldName][ruleKey];
        }
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contactForm = new ContactForm();
});

// Add CSS animations for form elements
const formStyles = document.createElement('style');
formStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInDown {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .form-group.has-error .form-control {
        border-color: #ef4444;
    }
    
    .form-group.is-valid .form-control {
        border-color: #10b981;
    }
    
    .field-error {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 5px;
        animation: slideInDown 0.3s ease;
    }
    
    .char-count {
        text-align: right;
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-top: 5px;
    }
`;

document.head.appendChild(formStyles);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactForm;
}
