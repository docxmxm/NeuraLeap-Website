/**
 * Neuraleap主要JavaScript文件
 * 负责网站交互、导航和视觉效果
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if dropdowns were already initialized by the component
    if (!window.dropdownsInitialized) {
        // Initialize navigation menus and dropdowns
        initNavigation();
    } else {
        console.log("Dropdowns already initialized by component, skipping...");
    }
    
    // 初始化神经网络背景效果（如果存在）
    initNeuralBackground();
    
    // 初始化页面动画效果
    initAnimations();
    
    // 初始化响应式设计相关功能
    initResponsiveFeatures();
    
    // 初始化表单验证
    initFormValidation();
    
    // 确保外部链接在新标签中打开
    initExternalLinks();
    
    // 添加Dark模式支持
    initDarkMode();
});

/**
 * 导航菜单初始化
 */
function initNavigation() {
    // Set flag to prevent double initialization
    window.dropdownsInitialized = true;
    
    // Mobile menu toggle - only initialize if not already done by the component
    if (!document.querySelector('.mobile-menu.initialized')) {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Mark as initialized
            mobileMenu.classList.add('initialized');
        }
    }

    // Dropdown functionality
    const dropdownButtons = document.querySelectorAll('.dropdown-button');
    
    dropdownButtons.forEach(button => {
        const dropdownMenu = button.nextElementSibling;
        
        if (button && dropdownMenu) {
            // Toggle dropdown on click
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownMenu.classList.toggle('hidden');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                if (!dropdownMenu.classList.contains('hidden')) {
                    dropdownMenu.classList.add('hidden');
                }
            });
        }
    });
    
    // Active page highlight
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || (linkPath !== '/' && currentPath.includes(linkPath))) {
            link.classList.add('active');
        }
    });
}

/**
 * 初始化神经网络背景动画效果
 */
function initNeuralBackground() {
    const neuralNetwork = document.getElementById('neural-network');
    
    if (neuralNetwork) {
        // Initialize neural network connections
        const connections = neuralNetwork.querySelectorAll('.neon-connection');
        
        connections.forEach(connection => {
            const fromNode = connection.getAttribute('data-from');
            const toNode = connection.getAttribute('data-to');
            
            if (fromNode && toNode) {
                const fromElement = neuralNetwork.querySelector(`.neon-node-${fromNode}`);
                const toElement = neuralNetwork.querySelector(`.neon-node-${toNode}`);
                
                if (fromElement && toElement) {
                    // Calculate position and angle between nodes
                    const fromRect = fromElement.getBoundingClientRect();
                    const toRect = toElement.getBoundingClientRect();
                    
                    const fromX = fromRect.left + fromRect.width / 2 - neuralNetwork.getBoundingClientRect().left;
                    const fromY = fromRect.top + fromRect.height / 2 - neuralNetwork.getBoundingClientRect().top;
                    const toX = toRect.left + toRect.width / 2 - neuralNetwork.getBoundingClientRect().left;
                    const toY = toRect.top + toRect.height / 2 - neuralNetwork.getBoundingClientRect().top;
                    
                    // Calculate distance and angle
                    const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
                    const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
                    
                    // Apply styles
                    connection.style.width = `${distance}px`;
                    connection.style.left = `${fromX}px`;
                    connection.style.top = `${fromY}px`;
                    connection.style.transform = `rotate(${angle}deg)`;
                }
            }
        });
        
        // Add random sparkle effect
        setInterval(() => {
            const randomNode = Math.floor(Math.random() * 7) + 1;
            const node = neuralNetwork.querySelector(`.neon-node-${randomNode}`);
            
            if (node) {
                node.style.boxShadow = '0 0 20px var(--neon-glow), 0 0 30px var(--neon-glow)';
                setTimeout(() => {
                    node.style.boxShadow = '0 0 10px var(--neon-glow), 0 0 20px var(--neon-glow)';
                }, 200);
            }
        }, 1000);
    }
}

/**
 * 初始化页面通用动画效果
 */
function initAnimations() {
    // Initialize scroll animations
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealOnScroll = function() {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', revealOnScroll);
        // Initial check
        revealOnScroll();
    }
    
    // Initialize typewriter effect
    const typewriterElements = document.querySelectorAll('.typewriter:not(.initialized)');
    
    typewriterElements.forEach(element => {
        element.classList.add('initialized');
    });
}

/**
 * 初始化响应式设计功能
 */
function initResponsiveFeatures() {
    // Responsive tables
    const tables = document.querySelectorAll('table:not(.responsive)');
    
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('overflow-x-auto');
        
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
        
        table.classList.add('responsive');
    });
}

/**
 * 初始化表单验证
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form.validate-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Required fields
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add or update error message
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                    errorMessage.textContent = 'This field is required';
                } else {
                    field.classList.remove('border-red-500');
                    
                    // Remove error message if exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            emailFields.forEach(field => {
                if (field.value.trim() && !emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                    errorMessage.textContent = 'Please enter a valid email address';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

/**
 * 确保外部链接在新标签中打开
 */
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([target])');
    
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

/**
 * 初始化暗色模式切换功能
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check user preference
        let darkMode = localStorage.getItem('darkMode');
        
        // Set initial mode
        if (darkMode === 'enabled' || (!darkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>';
        } else {
            document.body.classList.remove('dark-mode');
            darkModeToggle.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
        }
        
        // Toggle mode on click
        darkModeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
            } else {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>';
            }
        });
    }
}