document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. LÓGICA DO TEMA (DARK/LIGHT MODE)
    // ==========================================================================
    const themeToggleBtn = document.querySelector("#theme-toggle");
    const moonIcon = document.querySelector("#theme-icon-moon");
    const sunIcon = document.querySelector("#theme-icon-sun");
    const html = document.documentElement;

    function applyTheme(isDark) {
        html.classList.toggle("dark", isDark);
        html.classList.toggle("light", !isDark);
        moonIcon.classList.toggle("hidden", isDark);
        sunIcon.classList.toggle("hidden", !isDark);
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem("theme") ?? (prefersDark ? "dark" : "light");
    applyTheme(currentTheme === "dark");

    themeToggleBtn.addEventListener("click", () => {
        const isDark = html.classList.contains("light");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        applyTheme(isDark);
    });


    // ==========================================================================
    // 2. ANIMAÇÃO DE ELEMENTOS AO SCROLL
    // ==========================================================================
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) - 100;

    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (elementInView(el)) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();


    // ==========================================================================
    // 3. EFEITO MÁQUINA DE ESCREVER NO NOME
    // ==========================================================================
    const typedTextSpan = document.querySelector("#typed-name");
    if(typedTextSpan) {
        let charIndex = 0;
        const textToType = "Fabiano"; // EDITAR AQUI O NOME
        typedTextSpan.textContent = ''; 

        function type() {
            if (charIndex < textToType.length) {
                typedTextSpan.textContent += textToType.charAt(charIndex++);
                setTimeout(type, 120);
            }
        }
        type();
    }
    
    // ==========================================================================
    // 4. LÓGICA GERAL (MENU MOBILE, HIGHLIGHT DE NAVEGAÇÃO, VOLTAR AO TOPO)
    // ==========================================================================
    const menuBtn = document.getElementById('menu-btn');
    const menuContainer = document.getElementById('menu-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopButton = document.querySelector("#back-to-top");
    
    if (menuBtn && menuContainer) {
        menuBtn.addEventListener('click', () => menuContainer.classList.toggle('hidden'));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768 && menuContainer) {
                menuContainer.classList.add('hidden');
            }
        });
    });
    
    window.addEventListener("scroll", () => {
        if (backToTopButton) {
            backToTopButton.classList.toggle("hidden", window.pageYOffset <= 300);
        }

        let currentSectionId = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav-link-active');
            }
        });
    });
    
    if (backToTopButton) {
        backToTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }


    // ==========================================================================
    // 5. LÓGICA DO MENU WHATSAPP FLUTUANTE
    // ==========================================================================
    const draggableWhatsapp = document.getElementById("draggable-whatsapp");
    const mainFabButton = document.querySelector(".whatsapp-main-button");

    let isDragging = false;
    let offsetX, offsetY;
    
    if (draggableWhatsapp && mainFabButton) {
        mainFabButton.addEventListener("click", (e) => {
            e.stopPropagation();
            draggableWhatsapp.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (draggableWhatsapp.classList.contains("active") && !draggableWhatsapp.contains(e.target)) {
                draggableWhatsapp.classList.remove("active");
            }
        });

        draggableWhatsapp.addEventListener('mousedown', (e) => {
            if (e.target.closest('.whatsapp-options') || e.target.closest('.whatsapp-main-button')) {
                if (e.target.closest('.whatsapp-main-button') && !e.target.closest('.whatsapp-options')) {
                    isDragging = true;
                    draggableWhatsapp.classList.add('dragging');
                    offsetX = e.clientX - draggableWhatsapp.getBoundingClientRect().left;
                    offsetY = e.clientY - draggableWhatsapp.getBoundingClientRect().top;
                }
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            newX = Math.max(0, Math.min(newX, window.innerWidth - draggableWhatsapp.offsetWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - draggableWhatsapp.offsetHeight));
            draggableWhatsapp.style.left = `${newX}px`;
            draggableWhatsapp.style.top = `${newY}px`;
            draggableWhatsapp.style.right = 'auto';
            draggableWhatsapp.style.bottom = 'auto';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                draggableWhatsapp.classList.remove('dragging');
            }
        });
    }


    // ==========================================================================
    // 6. EFEITO DE PARTÍCULAS NO CURSOR
    // ==========================================================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];
        const mouse = { x: null, y: null };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle());
            }
        });

        class Particle {
            constructor() {
                this.x = mouse.x;
                this.y = mouse.y;
                this.size = Math.random() * 4 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                
                const isDark = document.documentElement.classList.contains('dark');
                this.color = isDark ? `hsl(${Math.random() * 60 + 240}, 100%, 70%)` : `hsl(${Math.random() * 60 + 30}, 100%, 70%)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.1) this.size -= 0.05;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function handleParticles() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].size <= 0.2) {
                    particles.splice(i, 1);
                    i--;
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    console.log("Portfólio carregado com sucesso!");
});