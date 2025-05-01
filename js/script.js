// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for the hero section
    const typewriterText = document.querySelector('.typewriter');
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    };
    
    // Start the typewriter effect
    setTimeout(typeWriter, 500);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Numbers counter animation for stats
    const statsSection = document.querySelector('.stats-counter');
    const statNumbers = document.querySelectorAll('.stat h2');
    let counted = false;
    
    window.addEventListener('scroll', function() {
        if (isInViewport(statsSection) && !counted) {
            countUp();
            counted = true;
        }
    });
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    function countUp() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = Math.ceil(target / (duration / 20));
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = count;
                }
            }, 20);
        });
    }
    
    // Mobile navigation toggle
    const mobileToggle = document.createElement('div');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navContainer = document.querySelector('nav');
    navContainer.parentNode.insertBefore(mobileToggle, navContainer);
    
    mobileToggle.addEventListener('click', function() {
        navContainer.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (navContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navContainer.contains(e.target) && !mobileToggle.contains(e.target) && navContainer.classList.contains('active')) {
            navContainer.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Add additional CSS for mobile navigation
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            nav {
                display: none;
            }
            
            nav.active {
                display: block;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--dark-bg);
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }
            
            nav.active ul {
                flex-direction: column;
                align-items: center;
            }
            
            nav.active ul li {
                margin: 10px 0;
            }
            
            .mobile-toggle {
                display: block;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
        }
        
        @media (min-width: 769px) {
            .mobile-toggle {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});