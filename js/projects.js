// Projects Management System
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        this.loadProjects();
        this.setupEventListeners();
        this.isInitialized = true;
    }
    
    loadProjects() {
        // Sample projects data - replace with your actual projects
        this.projects = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
                image: "assets/images/project1.png",
                category: "web",
                technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
                liveUrl: "#",
                codeUrl: "#",
                stats: {
                    views: 1250,
                    likes: 89
                },
                featured: true
            },
            {
                id: 2,
                title: "Task Management App",
                description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
                image: "assets/images/project2.png",
                category: "app",
                technologies: ["Vue.js", "Firebase", "Vuex", "Vuetify"],
                liveUrl: "#",
                codeUrl: "#",
                stats: {
                    views: 890,
                    likes: 67
                },
                featured: false
            },
            {
                id: 3,
                title: "Portfolio Website",
                description: "A modern, responsive portfolio website showcasing creative work with smooth animations and interactive elements.",
                image: "assets/images/project3.png",
                category: "web",
                technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
                liveUrl: "#",
                codeUrl: "#",
                stats: {
                    views: 2100,
                    likes: 156
                },
                featured: true
            },
            {
                id: 4,
                title: "Weather Dashboard",
                description: "A weather application providing real-time weather data, forecasts, and interactive maps with location-based services.",
                image: "assets/images/project1.png",
                category: "app",
                technologies: ["React Native", "OpenWeather API", "Redux", "Expo"],
                liveUrl: "#",
                codeUrl: "#",
                stats: {
                    views: 750,
                    likes: 45
                },
                featured: false
            },
            {
                id: 5,
                title: "Blog CMS",
                description: "A content management system for blogs with rich text editing, SEO optimization, and analytics dashboard.",
                image: "assets/images/project2.png",
                category: "cms",
                technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
                liveUrl: "#",
                codeUrl: "#",
                stats: {
                    views: 1100,
                    likes: 78
                },
                featured: true
            },
            {
                id: 6,
                title: "Social Media Dashboard",
                description: "A comprehensive dashboard for managing multiple social media accounts with analytics and scheduling features.",
                image: "assets/images/project3.png",
                category: "dashboard",
                technologies: ["Angular", "Node.js", "Socket.io", "Chart.js"],
                liveUrl: "#",
                codeUrl: "#",
                stats: {
                    views: 950,
                    likes: 62
                },
                featured: false
            }
        ];
        
        this.filteredProjects = [...this.projects];
    }
    
    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter || e.target.textContent.toLowerCase();
                this.filterProjects(filter);
                this.updateActiveFilter(e.target);
            });
        });
        
        // Project card interactions
        this.setupProjectInteractions();
        
        // Search functionality
        this.setupSearch();
        
        // Sort functionality
        this.setupSorting();
    }
    
    filterProjects(category) {
        this.currentFilter = category;
        
        if (category === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.category === category
            );
        }
        
        this.renderProjects();
        this.updateProjectCount();
        this.animateProjects();
    }
    
    updateActiveFilter(clickedButton) {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        clickedButton.classList.add('active');
    }
    
    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
        
        // Clear existing projects
        projectsGrid.innerHTML = '';
        
        if (this.filteredProjects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <div class="no-projects-icon">🔍</div>
                    <h3>No projects found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
            return;
        }
        
        // Render projects
        this.filteredProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });
    }
    
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.projectId = project.id;
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="project-overlay">
                    <div class="overlay-content">
                        <div class="overlay-icon">👁️</div>
                        <div class="overlay-text">View Project</div>
                    </div>
                </div>
            </div>
            
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                
                <div class="project-tech">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag" data-tech="${tech.toLowerCase()}">${tech}</span>`
                    ).join('')}
                </div>
                
                <div class="project-links">
                    <a href="${project.liveUrl}" class="project-link live" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                    <a href="${project.codeUrl}" class="project-link code" target="_blank">
                        <i class="fab fa-github"></i>
                        <span>Source Code</span>
                    </a>
                </div>
                
                <div class="project-stats">
                    <div class="stat">
                        <span class="stat-number">${project.stats.views}</span>
                        <span class="stat-label">Views</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${project.stats.likes}</span>
                        <span class="stat-label">Likes</span>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }
    
    setupProjectInteractions() {
        // Project card hover effects
        document.addEventListener('mouseover', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                this.addHoverEffects(projectCard);
            }
        });
        
        // Project card click for modal
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                const projectId = parseInt(projectCard.dataset.projectId);
                const project = this.projects.find(p => p.id === projectId);
                if (project) {
                    this.showProjectModal(project);
                }
            }
        });
        
        // Tech tag interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tech-tag')) {
                this.handleTechTagClick(e.target);
            }
        });
    }
    
    addHoverEffects(card) {
        // Add floating effect
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        
        // Add glow effect
        card.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }
    
    handleTechTagClick(techTag) {
        const tech = techTag.textContent;
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>${tech}</h4>
                <p>Click to filter projects by ${tech}</p>
            </div>
        `;
        
        // Position tooltip
        const rect = techTag.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - 10 + 'px';
        tooltip.style.transform = 'translateX(-50%)';
        
        document.body.appendChild(tooltip);
        
        // Remove tooltip after delay
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000);
        
        // Filter by technology
        this.filterByTechnology(tech);
    }
    
    filterByTechnology(tech) {
        const techLower = tech.toLowerCase();
        this.filteredProjects = this.projects.filter(project => 
            project.technologies.some(technology => 
                technology.toLowerCase().includes(techLower)
            )
        );
        
        this.renderProjects();
        this.updateProjectCount();
        this.animateProjects();
    }
    
    setupSearch() {
        const searchInput = document.querySelector('.projects-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.searchProjects(query);
            });
        }
    }
    
    searchProjects(query) {
        if (!query.trim()) {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.technologies.some(tech => 
                    tech.toLowerCase().includes(query)
                )
            );
        }
        
        this.renderProjects();
        this.updateProjectCount();
        this.animateProjects();
    }
    
    setupSorting() {
        const sortSelect = document.querySelector('.projects-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                const sortBy = e.target.value;
                this.sortProjects(sortBy);
            });
        }
    }
    
    sortProjects(sortBy) {
        switch (sortBy) {
            case 'newest':
                this.filteredProjects.sort((a, b) => b.id - a.id);
                break;
            case 'oldest':
                this.filteredProjects.sort((a, b) => a.id - b.id);
                break;
            case 'popular':
                this.filteredProjects.sort((a, b) => b.stats.views - a.stats.views);
                break;
            case 'featured':
                this.filteredProjects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            case 'alphabetical':
                this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
        
        this.renderProjects();
        this.animateProjects();
    }
    
    updateProjectCount() {
        const countElement = document.querySelector('.projects-count');
        if (countElement) {
            const total = this.projects.length;
            const filtered = this.filteredProjects.length;
            
            if (filtered === total) {
                countElement.textContent = `Showing all ${total} projects`;
            } else {
                countElement.textContent = `Showing ${filtered} of ${total} projects`;
            }
        }
    }
    
    animateProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    showProjectModal(project) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                
                <div class="modal-header">
                    <img src="${project.image}" alt="${project.title}" class="modal-image">
                    <div class="modal-title">
                        <h2>${project.title}</h2>
                        <p>${project.description}</p>
                    </div>
                </div>
                
                <div class="modal-body">
                    <div class="modal-section">
                        <h3>Technologies Used</h3>
                        <div class="modal-tech">
                            ${project.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Project Stats</h3>
                        <div class="modal-stats">
                            <div class="stat">
                                <span class="stat-number">${project.stats.views}</span>
                                <span class="stat-label">Views</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">${project.stats.likes}</span>
                                <span class="stat-label">Likes</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Project Links</h3>
                        <div class="modal-links">
                            <a href="${project.liveUrl}" class="btn btn-primary" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                                View Live Demo
                            </a>
                            <a href="${project.codeUrl}" class="btn btn-secondary" target="_blank">
                                <i class="fab fa-github"></i>
                                View Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            this.closeProjectModal(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal(modal);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeProjectModal(modal);
            }
        });
    }
    
    closeProjectModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    // Get project statistics
    getProjectStats() {
        const stats = {
            total: this.projects.length,
            byCategory: {},
            byTechnology: {},
            featured: this.projects.filter(p => p.featured).length
        };
        
        // Count by category
        this.projects.forEach(project => {
            stats.byCategory[project.category] = (stats.byCategory[project.category] || 0) + 1;
            
            project.technologies.forEach(tech => {
                stats.byTechnology[tech] = (stats.byTechnology[tech] || 0) + 1;
            });
        });
        
        return stats;
    }
    
    // Export projects data
    exportProjects() {
        return JSON.stringify(this.projects, null, 2);
    }
    
    // Import projects data
    importProjects(data) {
        try {
            this.projects = JSON.parse(data);
            this.filteredProjects = [...this.projects];
            this.renderProjects();
            this.updateProjectCount();
        } catch (error) {
            console.error('Error importing projects:', error);
        }
    }
}

// Initialize projects manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectsManager = new ProjectsManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsManager;
}
