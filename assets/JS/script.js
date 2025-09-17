        // Mobile Menu Toggle
        function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('mobileMenuIcon');
    
    if (mobileMenu.classList.contains('translate-x-full')) {
        // Open menu
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        menuIcon.className = 'fas fa-times';
    } else {
        // Close menu
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        menuIcon.className = 'fas fa-bars';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('mobileMenuIcon');
    
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    menuIcon.className = 'fas fa-bars';
}

        // Navbar Background on Scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            const loadingBar = document.getElementById('loadingBar');
            
            if (window.scrollY > 50) {
                navbar.className = 'fixed top-0 w-full z-40 transition-all duration-500 py-2 bg-rich-black/95 backdrop-blur-lg shadow-2xl';
            
            } else {
                navbar.className = 'fixed top-0 w-full z-40 transition-all duration-500 py-4';
            }
            
            // Update loading bar based on scroll progress
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (window.scrollY / scrollHeight) * 100;
            loadingBar.style.width = scrollProgress + '%';
        });

        // Portfolio Slider
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.portfolio-slide');
        const dots = document.querySelectorAll('.slider-dot');
        const totalSlides = slides.length;

        function goToSlide(index) {
            currentSlideIndex = index;
            const slider = document.getElementById('portfolioSlider');
            slider.style.transform = `translateX(-${index * 100}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.className = 'slider-dot w-4 h-4 rounded-full bg-warm-gold transition-all duration-300 opacity-100';
                } else {
                    dot.className = 'slider-dot w-4 h-4 rounded-full bg-gray-400 transition-all duration-300 opacity-50 hover:opacity-100';
                }
            });
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            goToSlide(currentSlideIndex);
        }

        function previousSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlideIndex);
        }

        // Auto-advance slides
        setInterval(() => {
            nextSlide();
        }, 5000);

        // Project Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(b => {
                    b.className = 'filter-btn bg-white text-rich-black px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:bg-warm-gold hover:text-white';
                });
                btn.className = 'filter-btn active bg-warm-gold text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105';
                
                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        setTimeout(() => {
                            card.style.display = 'block';
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Smooth Scrolling for Navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobileMenu');
                    const menuIcon = document.getElementById('mobileMenuIcon');
                    mobileMenu.style.transform = 'translateY(-100%)';
                    menuIcon.className = 'fas fa-bars';
                }
            });
        });

        // Scroll to Top Function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Intersection Observer for Reveal Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Observe all elements with reveal class
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                submitBtn.className = 'w-full bg-green-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300';
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.className = 'w-full bg-gradient-to-r from-warm-gold to-wooden-brown text-rich-black font-bold py-4 px-8 rounded-lg hover:from-wooden-brown hover:to-warm-gold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-warm-gold/50';
                    submitBtn.disabled = false;
                }, 2000);
                
                // Show alert
                alert('Thank you for your inquiry! We will contact you within 24 hours to schedule your consultation.');
            }, 2000);
        });

        // Navbar Link Hover Effects
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                const underline = this.querySelector('span');
                if (underline) {
                    underline.style.width = '100%';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                const underline = this.querySelector('span');
                if (underline) {
                    underline.style.width = '0';
                }
            });
        });

        // Add scroll-triggered animations for specific elements
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.process-step, .testimonial-card, .project-card');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Initialize animations
        window.addEventListener('scroll', animateOnScroll);
        
        // Set initial states for animated elements
        document.querySelectorAll('.process-step, .testimonial-card, .project-card').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });

        // Trigger initial animation check
        animateOnScroll();

        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add entrance animations to hero elements
        window.addEventListener('load', () => {
            const heroContent = document.querySelector('.animate-slide-up');
            if (heroContent) {
                heroContent.style.animation = 'slide-up 1s ease-out';
            }
        });

        // Enhanced hover effects for project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(201, 179, 139, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });

        // Typing effect for hero subtitle (optional enhancement)
        const typeText = (element, text, speed = 50) => {
            element.textContent = '';
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        };

        // Initialize page with subtle loading animation
        document.addEventListener('DOMContentLoaded', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });