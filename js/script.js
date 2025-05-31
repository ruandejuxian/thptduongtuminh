// Main JavaScript file for THPT Duong Tu Minh website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initDarkMode();
    initSmoothScrolling();
    initBackToTop();
    initMobileMenu();
    initScrollAnimations();
    initCountdown();
    initParallaxEffect();
    initFallingFlowers();
    initContactForm();

    // Dark Mode Toggle
    function initDarkMode() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use device preference
        const currentTheme = localStorage.getItem('theme') || 
                            (prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Apply the saved theme or device preference
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            updateDarkModeIcon(true);
        }
        
        // Toggle dark mode on button click
        darkModeToggle.addEventListener('click', function() {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            updateDarkModeIcon(isDarkMode);
            
            // Save preference to localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
        
        // Update icon based on dark mode state
        function updateDarkModeIcon(isDarkMode) {
            const icon = darkModeToggle.querySelector('i');
            if (isDarkMode) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }
    
    // Smooth Scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') return; // Skip for back-to-top button
                
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const nav = document.querySelector('header nav');
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
    
    // Back to Top Button
    function initBackToTop() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('header nav');
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        
        // Initial check for elements in viewport
        checkElementsInViewport();
        
        // Check on scroll
        window.addEventListener('scroll', checkElementsInViewport);
        
        function checkElementsInViewport() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150; // Adjust this value as needed
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }
    }
    
    // Countdown Timer
    function initCountdown() {
        // Example events - in a real application, these could come from a database
        const events = [
            { name: "Lễ Khai Giảng Năm Học Mới", date: "2025-05-25T08:00:00" },
            { name: "Ngày Hội Thể Thao", date: "2025-06-10T08:00:00" },
            { name: "Chương Trình Văn Nghệ Chào Hè", date: "2025-07-15T19:00:00" }
        ];
        
        // Find the next upcoming event
        const now = new Date();
        let nextEvent = null;
        
        for (const event of events) {
            const eventDate = new Date(event.date);
            if (eventDate > now) {
                nextEvent = { name: event.name, date: eventDate };
                break;
            }
        }
        
        // If no upcoming event, use the first one (for demo purposes)
        if (!nextEvent && events.length > 0) {
            const firstEvent = events[0];
            nextEvent = { 
                name: firstEvent.name, 
                date: new Date(firstEvent.date)
            };
            // Add a year to make it future
            nextEvent.date.setFullYear(nextEvent.date.getFullYear() + 1);
        }
        
        if (nextEvent) {
            // Update event name
            document.getElementById('event-name').textContent = nextEvent.name;
            
            // Create countdown elements
            const countdownContainer = document.getElementById('event-countdown');
            const countdownItems = [
                { id: 'days', label: 'Ngày' },
                { id: 'hours', label: 'Giờ' },
                { id: 'minutes', label: 'Phút' },
                { id: 'seconds', label: 'Giây' }
            ];
            
            countdownItems.forEach(item => {
                const countdownItem = document.createElement('div');
                countdownItem.className = 'countdown-item';
                
                const digitElement = document.createElement('div');
                digitElement.className = 'countdown-digit';
                digitElement.id = item.id;
                digitElement.textContent = '00';
                
                const labelElement = document.createElement('div');
                labelElement.className = 'countdown-label';
                labelElement.textContent = item.label;
                
                countdownItem.appendChild(digitElement);
                countdownItem.appendChild(labelElement);
                countdownContainer.appendChild(countdownItem);
            });
            
            // Update countdown every second
            updateCountdown();
            setInterval(updateCountdown, 1000);
            
            function updateCountdown() {
                const now = new Date();
                const distance = nextEvent.date - now;
                
                // Time calculations
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Update elements with animation
                updateDigit('days', days);
                updateDigit('hours', hours);
                updateDigit('minutes', minutes);
                updateDigit('seconds', seconds);
                
                // If countdown is over
                if (distance < 0) {
                    clearInterval(updateCountdown);
                    document.getElementById('event-name').textContent = "Sự kiện đã bắt đầu!";
                    countdownItems.forEach(item => {
                        document.getElementById(item.id).textContent = "00";
                    });
                }
            }
            
            function updateDigit(id, value) {
                const element = document.getElementById(id);
                const newValue = value < 10 ? `0${value}` : `${value}`;
                
                if (element.textContent !== newValue) {
                    // Add flip animation
                    element.classList.add('flip');
                    setTimeout(() => {
                        element.textContent = newValue;
                        element.classList.remove('flip');
                    }, 250);
                }
            }
        }
    }
    
    // Parallax Effect
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        // Skip on mobile devices for better performance
        if (window.innerWidth < 768) {
            parallaxElements.forEach(element => {
                element.style.backgroundAttachment = 'scroll';
            });
            return;
        }
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                
                // Check if element is in viewport
                if (scrollPosition > elementTop - window.innerHeight && 
                    scrollPosition < elementTop + elementHeight) {
                    
                    // Calculate parallax offset
                    const offset = (scrollPosition - (elementTop - window.innerHeight)) * 0.4;
                    element.style.backgroundPositionY = `calc(50% + ${offset}px)`;
                }
            });
        });
    }
    
    // Falling Flowers Effect (seasonal)
    function initFallingFlowers() {
        const canvas = document.getElementById('falling-flowers-canvas');
        if (!canvas) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        
        const ctx = canvas.getContext('2d');
        
        // Check if it's summer (May to August in Northern Hemisphere)
        const currentMonth = new Date().getMonth(); // 0-11
        const isSummer = currentMonth >= 4 && currentMonth <= 7; // May to August
        
        // Flower properties based on season
        let flowerColor, flowerType;
        
        if (isSummer) {
            flowerColor = '#FF3333'; // Red for phoenix flowers
            flowerType = 'phoenix';
        } else if (currentMonth >= 8 && currentMonth <= 10) { // Fall (Sep-Nov)
            flowerColor = '#FFA500'; // Orange for autumn leaves
            flowerType = 'leaf';
        } else if (currentMonth >= 11 || currentMonth <= 1) { // Winter (Dec-Feb)
            flowerColor = '#FFFFFF'; // White for snow
            flowerType = 'snow';
        } else { // Spring (Mar-Apr)
            flowerColor = '#FFB7C5'; // Pink for cherry blossoms
            flowerType = 'cherry';
        }
        
        // Create flower/leaf/snow particles
        const particles = [];
        const particleCount = 30; // Adjust based on screen size
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * -1, // Start above the screen
                size: Math.random() * 8 + 5,
                weight: Math.random() * 2 + 0.1,
                directionX: Math.random() * 2 - 1,
                rotation: Math.random() * 360
            });
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Draw particle based on type
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation * Math.PI / 180);
                
                ctx.fillStyle = flowerColor;
                ctx.beginPath();
                
                if (flowerType === 'phoenix') {
                    // Draw simple flower shape
                    const size = particle.size;
                    for (let i = 0; i < 5; i++) {
                        ctx.ellipse(0, 0, size, size/2, (i * 72) * Math.PI / 180, 0, 2 * Math.PI);
                    }
                    ctx.fill();
                    ctx.fillStyle = '#FFCC00';
                    ctx.beginPath();
                    ctx.arc(0, 0, size/3, 0, 2 * Math.PI);
                    ctx.fill();
                } else if (flowerType === 'leaf') {
                    // Draw leaf shape
                    ctx.ellipse(0, 0, particle.size, particle.size * 1.5, 0, 0, 2 * Math.PI);
                } else if (flowerType === 'snow') {
                    // Draw snowflake
                    ctx.arc(0, 0, particle.size/2, 0, 2 * Math.PI);
                } else { // cherry blossom
                    // Draw simple flower shape
                    const size = particle.size;
                    for (let i = 0; i < 5; i++) {
                        ctx.ellipse(0, 0, size, size/2, (i * 72) * Math.PI / 180, 0, 2 * Math.PI);
                    }
                }
                
                ctx.fill();
                ctx.restore();
                
                // Update position
                particle.y += particle.weight;
                particle.x += particle.directionX;
                particle.rotation += 0.2;
                
                // Wind effect
                if (Math.random() > 0.95) {
                    particle.directionX = Math.random() * 2 - 1;
                }
                
                // Reset if off screen
                if (particle.y > canvas.height) {
                    particle.y = Math.random() * canvas.height * -1;
                    particle.x = Math.random() * canvas.width;
                }
                
                if (particle.x > canvas.width || particle.x < 0) {
                    particle.x = Math.random() * canvas.width;
                }
            });
            
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
        
        // Resize canvas when window size changes
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Contact Form Handling
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                    showFormMessage('Vui lòng điền đầy đủ thông tin bắt buộc.', 'error');
                    return;
                }
                
                // In a real application, you would send this data to a server
                // For demo purposes, we'll just show a success message
                showFormMessage(`Cảm ơn ${name} đã liên hệ! Chúng tôi sẽ sớm phản hồi qua email ${email}.`, 'success');
                contactForm.reset();
            });
        }
        
        function showFormMessage(message, type) {
            // Remove any existing message
            const existingMessage = document.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create new message
            const messageElement = document.createElement('div');
            messageElement.className = `form-message ${type}`;
            messageElement.textContent = message;
            
            // Insert after form
            contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
            
            // Remove after 5 seconds
            setTimeout(() => {
                messageElement.classList.add('fade-out');
                setTimeout(() => messageElement.remove(), 500);
            }, 5000);
        }
    }
    
    // Active menu highlighting
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('header nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current || 
                (current === '' && link.getAttribute('href') === '#')) {
                link.classList.add('active');
            }
        });
    });
});
