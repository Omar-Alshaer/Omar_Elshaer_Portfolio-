// Custom Cursor System
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.trail = null;
        this.isVisible = false;
        this.isEnabled = true;
        this.trailElements = [];
        this.maxTrailLength = 6;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        if (!this.isEnabled) return;
        
        // Check if device supports hover
        if (!window.matchMedia('(hover: hover)').matches) {
            this.disable();
            return;
        }
        
        this.createCursor();
        this.createTrail();
        this.bindEvents();
        this.addHoverEffects();
        this.show();
        
        // Enable custom cursor
        document.body.classList.add('custom-cursor-enabled');
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
    }

    createTrail() {
        // Create trail elements
        for (let i = 0; i < this.maxTrailLength; i++) {
            const trailElement = document.createElement('div');
            trailElement.className = 'cursor-trail';
            trailElement.style.opacity = (this.maxTrailLength - i) / this.maxTrailLength * 0.4;
            trailElement.style.transform = `translate(-50%, -50%) scale(${(this.maxTrailLength - i) / this.maxTrailLength * 0.8})`;
            document.body.appendChild(trailElement);
            this.trailElements.push(trailElement);
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            if (!this.isVisible || !this.isEnabled) return;
            
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            this.updatePosition(e.clientX, e.clientY);
        });

        document.addEventListener('mouseenter', () => {
            if (this.isEnabled) this.show();
        });

        document.addEventListener('mouseleave', () => {
            this.hide();
        });

        document.addEventListener('mousedown', () => {
            if (this.isVisible && this.isEnabled) {
                this.cursor.classList.add('click');
            }
        });

        document.addEventListener('mouseup', () => {
            if (this.isVisible && this.isEnabled) {
                this.cursor.classList.remove('click');
            }
        });

        // Scroll effect
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (this.isVisible && this.isEnabled) {
                this.cursor.classList.add('scroll');
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.cursor.classList.remove('scroll');
                }, 200);
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.updateCursorSize();
        });

        // Prevent cursor from showing on mobile
        window.addEventListener('touchstart', () => {
            this.disable();
        });
    }

    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .tech-item, .project-card, .skill-category, .contact-form input, .contact-form textarea, .floating-icon');
        
        hoverElements.forEach(element => {
            this.addHoverClass(element);
        });
    }

    addHoverClass(element) {
        element.addEventListener('mouseenter', () => {
            if (this.isVisible && this.isEnabled) {
                this.cursor.classList.add('hover');
            }
        });

        element.addEventListener('mouseleave', () => {
            if (this.isVisible && this.isEnabled) {
                this.cursor.classList.remove('hover');
            }
        });
    }

    updatePosition(x, y) {
        if (!this.cursor || !this.isVisible) return;

        // Update main cursor with smooth animation
        this.cursor.style.left = x + 'px';
        this.cursor.style.top = y + 'px';

        // Update trail with smooth following effect
        this.trailElements.forEach((trailElement, index) => {
            const delay = index * 15;
            const trailX = x + (Math.random() - 0.5) * 10;
            const trailY = y + (Math.random() - 0.5) * 10;
            
            setTimeout(() => {
                if (trailElement && trailElement.style) {
                    trailElement.style.left = trailX + 'px';
                    trailElement.style.top = trailY + 'px';
                    trailElement.style.opacity = (this.maxTrailLength - index) / this.maxTrailLength * 0.4;
                }
            }, delay);
        });
    }

    updateCursorSize() {
        // Adjust cursor size based on screen size
        if (window.innerWidth < 768) {
            this.disable();
        }
    }

    show() {
        if (!this.isEnabled) return;
        
        this.isVisible = true;
        if (this.cursor) {
            this.cursor.style.display = 'block';
            this.cursor.style.opacity = '1';
        }
        
        this.trailElements.forEach(element => {
            if (element && element.style) {
                element.style.display = 'block';
                element.style.opacity = (this.maxTrailLength - this.trailElements.indexOf(element)) / this.maxTrailLength * 0.4;
            }
        });
    }

    hide() {
        this.isVisible = false;
        if (this.cursor) {
            this.cursor.style.opacity = '0';
            setTimeout(() => {
                if (this.cursor) this.cursor.style.display = 'none';
            }, 150);
        }
        
        this.trailElements.forEach(element => {
            if (element && element.style) {
                element.style.opacity = '0';
                setTimeout(() => {
                    if (element) element.style.display = 'none';
                }, 150);
            }
        });
    }

    enable() {
        this.isEnabled = true;
        document.body.classList.add('custom-cursor-enabled');
        this.show();
    }

    disable() {
        this.isEnabled = false;
        document.body.classList.remove('custom-cursor-enabled');
        this.hide();
        
        // Show default cursor
        document.body.style.cursor = 'auto';
        document.querySelectorAll('*').forEach(el => {
            el.style.cursor = 'auto';
        });
    }

    destroy() {
        if (this.cursor) {
            this.cursor.remove();
            this.cursor = null;
        }
        
        this.trailElements.forEach(element => {
            if (element) element.remove();
        });
        this.trailElements = [];
        
        document.body.classList.remove('custom-cursor-enabled');
        document.body.style.cursor = 'auto';
    }
}

// Initialize custom cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    // Check if device supports hover
    if (window.matchMedia('(hover: hover)').matches) {
        window.customCursor = new CustomCursor();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomCursor;
}
