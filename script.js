document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. LÓGICA DO TEMA (DARK/LIGHT MODE)
    // ==========================================================================
    const themeToggleBtn = document.querySelector("#theme-toggle");
    const moonIcon = document.querySelector("#theme-icon-moon");
    const sunIcon = document.querySelector("#theme-icon-sun");
    const html = document.documentElement;

    /**
     * Aplica o tema (claro ou escuro) à página.
     * @param {boolean} isDark - true para tema escuro, false para tema claro.
     */
    function applyTheme(isDark) {
        html.classList.toggle("dark", isDark);
        html.classList.toggle("light", !isDark);
        moonIcon.classList.toggle("hidden", isDark);
        sunIcon.classList.toggle("hidden", !isDark);
        // Quando o tema muda, as partículas devem se recalibrar para a nova cor
        // A cor é definida dentro da classe Particle no momento da criação,
        // então novas partículas terão a cor correta automaticamente.
        // As partículas existentes simplesmente continuarão com sua cor original até desaparecerem.
    }

    // Detecta a preferência do sistema ou carrega do localStorage
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem("theme") ?? (prefersDark ? "dark" : "light");
    applyTheme(currentTheme === "dark"); // Aplica o tema inicial

    // Event Listener para o botão de alternar tema
    themeToggleBtn.addEventListener("click", () => {
        const isDark = html.classList.contains("light"); // Verifica o tema atual para alternar
        localStorage.setItem("theme", isDark ? "dark" : "light"); // Salva a preferência
        applyTheme(isDark); // Aplica o novo tema
    });


    // ==========================================================================
    // 2. ANIMAÇÃO DE ELEMENTOS AO SCROLL
    // ==========================================================================
    const scrollElements = document.querySelectorAll('.scroll-animate');

    /**
     * Verifica se um elemento está visível na viewport.
     * @param {HTMLElement} el - O elemento a ser verificado.
     * @returns {boolean} - True se o elemento está visível, false caso contrário.
     */
    const elementInView = (el) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) - 100;

    /** Lida com a adição da classe 'visible' aos elementos ao rolar. */
    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (elementInView(el)) {
                el.classList.add('visible');
            }
        });
    };

    // Adiciona event listeners para o scroll e chama a função uma vez no carregamento
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();


    // ==========================================================================
    // 3. EFEITO MÁQUINA DE ESCREVER NO NOME
    // ==========================================================================
    const typedTextSpan = document.querySelector("#typed-name");
    if(typedTextSpan) {
        let charIndex = 0;
        // ================================================================
        // PONTO DE EDIÇÃO: NOME PARA O EFEITO DE DIGITAR
        // Altere "Fabiano" para o nome que deseja que seja digitado.
        const textToType = "Fabiano";
        // ================================================================
        typedTextSpan.textContent = ''; // Limpa o conteúdo inicial

        /** Inicia o efeito de digitação. */
        function type() {
            if (charIndex < textToType.length) {
                typedTextSpan.textContent += textToType.charAt(charIndex++);
                setTimeout(type, 120); // Velocidade de digitação
            }
        }
        type(); // Inicia o efeito
    }
    
    // ==========================================================================
    // 4. LÓGICA GERAL (MENU MOBILE, HIGHLIGHT DE NAVEGAÇÃO, VOLTAR AO TOPO)
    // ==========================================================================
    const menuBtn = document.getElementById('menu-btn');
    const menuContainer = document.getElementById('menu-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopButton = document.querySelector("#back-to-top");
    
    // Abre/fecha o menu mobile ao clicar no botão hambúrguer
    if (menuBtn && menuContainer) {
        menuBtn.addEventListener('click', () => menuContainer.classList.toggle('hidden'));
    }

    // Fecha o menu mobile se um link for clicado (apenas em telas pequenas)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768 && menuContainer) { // 768px é o breakpoint do Tailwind para 'md'
                menuContainer.classList.add('hidden');
            }
        });
    });
    
    // Lógica para o botão "Voltar ao Topo" e destaque do menu de navegação
    window.addEventListener("scroll", () => {
        // Exibe/esconde o botão "Voltar ao Topo"
        if (backToTopButton) {
            backToTopButton.classList.toggle("hidden", window.pageYOffset <= 300); // Aparece após 300px de scroll
        }

        // Destaca o link de navegação da seção visível
        let currentSectionId = '';
        sections.forEach(section => {
            // Se o topo da seção estiver a 150px ou menos do topo da viewport
            if (window.pageYOffset >= section.offsetTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-link-active'); // Remove de todos
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav-link-active'); // Adiciona ao link da seção atual
            }
        });
    });
    
    // Rola para o topo suavemente ao clicar no botão "Voltar ao Topo"
    if (backToTopButton) {
        backToTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }


    // ==========================================================================
    // 5. LÓGICA DO MENU WHATSAPP FLUTUANTE (ABRIR/FECHAR e ARRASTAR)
    // ==========================================================================
    const draggableWhatsapp = document.getElementById("draggable-whatsapp");
    const mainFabButton = document.querySelector(".whatsapp-main-button");

    let isDragging = false;
    let offsetX, offsetY; // Offset do mouse em relação ao canto superior esquerdo do botão
    
    if (draggableWhatsapp && mainFabButton) {
        // Evento para abrir/fechar as opções do WhatsApp
        mainFabButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Impede que o clique se propague para o documento
            draggableWhatsapp.classList.toggle("active");
        });

        // Fecha as opções do WhatsApp se clicar em qualquer outro lugar do documento
        document.addEventListener("click", (e) => {
            if (draggableWhatsapp.classList.contains("active") && !draggableWhatsapp.contains(e.target)) {
                draggableWhatsapp.classList.remove("active");
            }
        });

        // Lógica de Drag and Drop para o contêiner do WhatsApp
        draggableWhatsapp.addEventListener('mousedown', (e) => {
            if (e.target.closest('.whatsapp-options') || e.target.closest('.whatsapp-main-button')) {
                // Previne que arrastar comece se o clique for dentro das opções ou no botão principal
                // No entanto, queremos que o botão principal seja o gatilho de arrasto
                // Então, só permitimos arrastar se o clique foi diretamente no botão principal
                if (e.target.closest('.whatsapp-main-button') && !e.target.closest('.whatsapp-options')) {
                    isDragging = true;
                    draggableWhatsapp.classList.add('dragging');
                    // Calcula o offset do mouse em relação à posição do elemento
                    offsetX = e.clientX - draggableWhatsapp.getBoundingClientRect().left;
                    offsetY = e.clientY - draggableWhatsapp.getBoundingClientRect().top;
                }
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            // Calcula a nova posição do elemento
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Limita o movimento dentro dos limites da viewport
            newX = Math.max(0, Math.min(newX, window.innerWidth - draggableWhatsapp.offsetWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - draggableWhatsapp.offsetHeight));

            // Aplica a nova posição
            draggableWhatsapp.style.left = `${newX}px`;
            draggableWhatsapp.style.top = `${newY}px`;
            draggableWhatsapp.style.right = 'auto'; // Desabilita 'right' para que 'left' funcione
            draggableWhatsapp.style.bottom = 'auto'; // Desabilita 'bottom' para que 'top' funcione
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
    if (canvas) { // Verifica se o canvas existe antes de tentar manipulá-lo
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];
        const mouse = { x: null, y: null };

        // Registra a posição do mouse e adiciona partículas
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
            // Adiciona um pequeno número de partículas em cada movimento
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle());
            }
        });

        /** Classe para criar e gerenciar uma única partícula. */
        class Particle {
            constructor() {
                this.x = mouse.x;
                this.y = mouse.y;
                this.size = Math.random() * 4 + 1; // Tamanho inicial da partícula
                this.speedX = Math.random() * 2 - 1; // Velocidade aleatória horizontal (-1 a 1)
                this.speedY = Math.random() * 2 - 1; // Velocidade aleatória vertical (-1 a 1)
                
                // Define a cor da partícula baseada no tema atual
                const isDark = document.documentElement.classList.contains('dark');
                // Cores para tema escuro (azul/roxo) e tema claro (laranja/amarelo)
                this.color = isDark ? `hsl(${Math.random() * 60 + 240}, 100%, 70%)` : `hsl(${Math.random() * 60 + 30}, 100%, 70%)`;
            }

            /** Atualiza a posição e o tamanho da partícula. */
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.1) this.size -= 0.05; // Diminui o tamanho para desaparecer
            }

            /** Desenha a partícula no canvas. */
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Desenha um círculo
                ctx.fill();
            }
        }

        /** Lida com a atualização e remoção das partículas. */
        function handleParticles() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(); // Atualiza posição/tamanho
                particles[i].draw();   // Redesenha
                // Remove partículas muito pequenas ou que sumiram
                if (particles[i].size <= 0.2) {
                    particles.splice(i, 1);
                    i--; // Ajusta o índice após remover um elemento
                }
            }
        }

        /** Loop principal de animação do canvas. */
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
            handleParticles(); // Atualiza e desenha partículas
            requestAnimationFrame(animateParticles); // Chama a si mesma para o próximo frame
        }
        animateParticles(); // Inicia a animação

        // Ajusta o tamanho do canvas se a janela for redimensionada
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    } // Fim do if(canvas)
    
    console.log("Portfólio carregado com todas as funcionalidades e comentários!");
});