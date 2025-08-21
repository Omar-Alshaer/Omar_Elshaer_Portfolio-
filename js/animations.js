// ========================================
// ADVANCED ANIMATIONS & INTERACTIONS
// ========================================

// Cursor Follower
class CursorFollower {
    constructor() {
        this.cursor = document.querySelector('.cursor-follower');
        this.dot = document.querySelector('.cursor-dot');
        this.init();
    }

    init() {
        if (!this.cursor || !this.dot) return;

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
            this.dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .tech-item, .project-card, .skill-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform += ' scale(1.5)';
                this.cursor.style.background = 'var(--accent)';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = this.cursor.style.transform.replace(' scale(1.5)', '');
                this.cursor.style.background = 'var(--gradient-primary)';
            });
        });
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = document.querySelectorAll('.particle');
        this.init();
    }

    init() {
        this.particles.forEach((particle, index) => {
            this.animateParticle(particle, index);
        });
    }

    animateParticle(particle, index) {
        const duration = 6 + (index * 2);
        const delay = index * 0.5;
        
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, duration * 1000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.initParallax();
        this.initStaggerAnimations();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.animate-on-scroll, .skill-item, .project-card, .timeline-item, .info-item');
        elements.forEach(element => observer.observe(element));
    }

    triggerElementAnimation(element) {
        if (element.classList.contains('skill-item')) {
            this.animateSkillBar(element);
        }
        
        if (element.classList.contains('project-card')) {
            this.animateProjectCard(element);
        }
        
        if (element.classList.contains('timeline-item')) {
            this.animateTimelineItem(element);
        }
        
        if (element.classList.contains('info-item')) {
            this.animateInfoItem(element);
        }
    }
    
    // Animate skill progress bars
    animateSkillBar(skillItem) {
        const progressFill = skillItem.querySelector('.progress-fill');
        const percentage = skillItem.querySelector('.skill-percentage');
        
        if (progressFill && percentage) {
            const targetWidth = percentage.textContent;
            const numericWidth = parseInt(targetWidth);
            
            if (!isNaN(numericWidth)) {
                // Reset to 0 first
                progressFill.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    progressFill.style.width = targetWidth;
                    
                    // Add completion effect
                    setTimeout(() => {
                        progressFill.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.5)';
                        progressFill.style.transform = 'scale(1.02)';
                        
                        setTimeout(() => {
                            progressFill.style.transform = 'scale(1)';
                        }, 200);
                    }, 500);
                }, 100);
            }
        }
    }
    
    // Animate project cards
    animateProjectCard(projectCard) {
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            projectCard.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate timeline items
    animateTimelineItem(timelineItem) {
        timelineItem.style.opacity = '0';
        timelineItem.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            timelineItem.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            timelineItem.style.opacity = '1';
            timelineItem.style.transform = 'translateX(0)';
        }, 100);
    }
    
    // Animate info items
    animateInfoItem(infoItem) {
        infoItem.style.opacity = '0';
        infoItem.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            infoItem.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            infoItem.style.opacity = '1';
            infoItem.style.transform = 'translateY(0)';
        }, 100);
    }

    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    initStaggerAnimations() {
        const staggerElements = document.querySelectorAll('.tech-item, .skill-item, .project-card');
        
        staggerElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Interactive Effects
class InteractiveEffects {
    constructor() {
        this.init();
    }

    init() {
        this.initRippleEffect();
        this.initHoverEffects();
        this.initClickEffects();
        this.initFormEffects();
    }

    initRippleEffect() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.btn, .project-link, .social-link, .nav-link');
            if (!target) return;

            const ripple = document.createElement('span');
            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            target.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    initHoverEffects() {
        const hoverElements = document.querySelectorAll('.project-card, .skill-category, .info-item, .tech-item');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-10px) scale(1.02)';
                element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
                element.style.boxShadow = '';
            });
        });
    }

    initClickEffects() {
        const clickElements = document.querySelectorAll('.btn, .project-link, .social-link');
        
        clickElements.forEach(element => {
            element.addEventListener('click', () => {
                element.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            });
        });
    }

    initFormEffects() {
        const formFields = document.querySelectorAll('.form-control');
        
        formFields.forEach(field => {
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('field-focused');
            });

            field.addEventListener('blur', () => {
                if (!field.value) {
                    field.parentElement.classList.remove('field-focused');
                }
            });

            // Add floating label effect
            if (field.value) {
                field.parentElement.classList.add('field-focused');
            }
        });
    }
}

// Floating Elements Animation
class FloatingElements {
    constructor() {
        this.init();
    }

    init() {
        const floatingElements = document.querySelectorAll('.float-element');
        
        floatingElements.forEach((element, index) => {
            const speed = element.getAttribute('data-speed') || 1;
            this.animateFloat(element, speed, index);
        });
    }

    animateFloat(element, speed, index) {
        const duration = 4 / speed;
        const delay = index * 0.5;
        
        element.style.animation = `float ${duration}s ease-in-out infinite`;
        element.style.animationDelay = `${delay}s`;
        
        // Add random rotation
        setInterval(() => {
            const randomRotation = Math.random() * 360;
            element.style.transform += ` rotate(${randomRotation}deg)`;
        }, duration * 1000);
    }
}

// Tech Stack Interactions
class TechStackInteractions {
    constructor() {
        this.init();
    }

    init() {
        const techItems = document.querySelectorAll('.tech-item');
        
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateTechItem(item, true);
            });

            item.addEventListener('mouseleave', () => {
                this.animateTechItem(item, false);
            });

            item.addEventListener('click', () => {
                this.showTechInfo(item);
            });
        });
    }

    animateTechItem(item, isHovering) {
        const icon = item.querySelector('i');
        const name = item.querySelector('.tech-name');
        
        if (isHovering) {
            icon.style.transform = 'translateY(-5px) rotate(10deg) scale(1.2)';
            icon.style.filter = 'drop-shadow(0 10px 20px rgba(58, 134, 255, 0.3))';
            name.style.color = 'var(--primary)';
            name.style.fontWeight = '700';
        } else {
            icon.style.transform = '';
            icon.style.filter = '';
            name.style.color = '';
            name.style.fontWeight = '';
        }
    }

    showTechInfo(item) {
        const techName = item.getAttribute('data-tech');
        const techInfo = this.getTechInfo(techName);
        
        // Create tooltip or modal with tech information
        this.createTechTooltip(item, techInfo);
    }

    getTechInfo(techName) {
        const techData = {
            'HTML5': 'Semantic markup, accessibility, modern web standards',
            'CSS3': 'Flexbox, Grid, animations, responsive design',
            'JavaScript': 'ES6+, async programming, DOM manipulation',
            'React': 'Component-based architecture, hooks, state management',
            'Node.js': 'Server-side JavaScript, APIs, backend development',
            'Python': 'Data analysis, automation, backend services',
            'Git': 'Version control, collaboration, deployment'
        };
        
        return techData[techName] || 'Technology information not available';
    }

    createTechTooltip(item, info) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.tech-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>${item.getAttribute('data-tech')}</h4>
                <p>${info}</p>
            </div>
        `;

        document.body.appendChild(tooltip);

        // Position tooltip
        const rect = item.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;

        // Remove tooltip after delay
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 3000);
    }
}

// Performance Optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeScrollEvents();
        this.optimizeAnimations();
        this.initLazyLoading();
    }

    optimizeScrollEvents() {
        let ticking = false;
        
        const updateScroll = () => {
            // Update scroll-based animations
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.style.setProperty('--transition', 'none');
            document.body.style.setProperty('--transition-fast', 'none');
            document.body.style.setProperty('--transition-slow', 'none');
        }
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
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

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize all animation classes
document.addEventListener('DOMContentLoaded', () => {
    new CursorFollower();
    new ParticleSystem();
    new ScrollAnimations();
    new InteractiveEffects();
    new FloatingElements();
    new TechStackInteractions();
    new PerformanceOptimizer();
});

// Export classes for external use
window.AnimationClasses = {
    CursorFollower,
    ParticleSystem,
    ScrollAnimations,
    InteractiveEffects,
    FloatingElements,
    TechStackInteractions,
    PerformanceOptimizer
};
