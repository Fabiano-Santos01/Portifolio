// =========================================================================
// ARQUIVO: projetos.js (VISUAL FINAL - BOTÃO DOWNLOAD FUTURISTA)
// =========================================================================

// 1. DADOS DOS PROJETOS (Edite aqui para adicionar/remover projetos)
const projetosData = [
    {
        id: 1,
        titulo: "Calculadora de Médias - UNIVERSIDADE PAULISTA UNIP",
// MUDANÇA AQUI: %0A cria uma quebra de linha
imagem: "https://placehold.co/600x400/3b82f6/ffffff?text=CALCULADORA%0AUNIP",
        descricaoCurta: "App Android para cálculo de médias da UNIP.",
        descricaoLonga: "Este aplicativo foi desenvolvido em Kotlin nativo. Ele resolve o problema complexo de calcular a média ponderada da faculdade, considerando notas de provas, trabalhos (PIM) e exames. A interface foi pensada para ser simples e direta.",
        tags: ["Android", "Kotlin", "Mobile"],
        theme: "blue", // Card 1: Azul
        links: {
            github: "https://github.com/Fabiano-Santos01", 
            download: "./downloads/calculadora-unip.apk" 
        }
    },
    {
        id: 2,
        titulo: "Oficina Digital Manager",
        imagem: "https://placehold.co/600x400/10b981/ffffff?text=Oficina+Manager",
        descricaoCurta: "Sistema Desktop com Python e SQLite.",
        descricaoLonga: "Sistema completo para gerenciamento de oficinas mecânicas ou de eletrônica. Possui cadastro de clientes (CRUD), ordens de serviço e um dashboard visual para acompanhar o status de cada reparo em tempo real.",
        tags: ["Python 3.13", "Tkinter", "SQLite"],
        theme: "green", // Card 2: Verde
        links: {
            github: "https://github.com/Fabiano-Santos01", 
            download: "./downloads/oficina-manager.zip" 
        }
    },
    {
        id: 3,
        titulo: "Bot Automação Taxa SELIC",
        imagem: "https://placehold.co/600x400/f59e0b/ffffff?text=Bot+Selic",
        descricaoCurta: "Robô de automação financeira e e-mail.",
        descricaoLonga: "Script Python que acessa a API do Banco Central para monitorar a taxa Selic. Ele processa os dados usando Pandas e envia um relatório executivo formatado automaticamente por e-mail para os interessados.",
        tags: ["Python", "Pandas", "Automação"],
        theme: "orange", // Card 3: Laranja
        links: {
            github: "https://github.com/Fabiano-Santos01",
            download: "./downloads/robo-selic.zip"
        }
    },
    // --- PROJETOS FUTUROS (Tema Roxo/Futurista) ---
    {
        id: 4, titulo: "Projeto Futuro 1", imagem: "https://placehold.co/600x400/e2e8f0/94a3b8?text=Em+Breve", 
        descricaoCurta: "Trabalhando nesse projeto ainda...", descricaoLonga: "Detalhes em breve.", tags: ["Dev"], theme: "purple", links: { github: "#", download: "#" }
    },
    {
        id: 5, titulo: "Projeto Futuro 2", imagem: "https://placehold.co/600x400/e2e8f0/94a3b8?text=Em+Breve", 
        descricaoCurta: "Trabalhando nesse projeto ainda...", descricaoLonga: "Detalhes em breve.", tags: ["Dev"], theme: "purple", links: { github: "#", download: "#" }
    },
    {
        id: 6, titulo: "Projeto Futuro 3", imagem: "https://placehold.co/600x400/e2e8f0/94a3b8?text=Em+Breve", 
        descricaoCurta: "Trabalhando nesse projeto ainda...", descricaoLonga: "Detalhes em breve.", tags: ["Dev"], theme: "purple", links: { github: "#", download: "#" }
    },
    {
        id: 7, titulo: "Projeto Futuro 4", imagem: "https://placehold.co/600x400/e2e8f0/94a3b8?text=Em+Breve", 
        descricaoCurta: "Trabalhando nesse projeto ainda...", descricaoLonga: "Detalhes em breve.", tags: ["Dev"], theme: "purple", links: { github: "#", download: "#" }
    },
    {
        id: 8, titulo: "Projeto Futuro 5", imagem: "https://placehold.co/600x400/e2e8f0/94a3b8?text=Em+Breve", 
        descricaoCurta: "Trabalhando nesse projeto ainda...", descricaoLonga: "Detalhes em breve.", tags: ["Dev"], theme: "purple", links: { github: "#", download: "#" }
    },
    {
        id: 9, titulo: "Projeto Futuro 6", imagem: "https://placehold.co/600x400/e2e8f0/94a3b8?text=Em+Breve", 
        descricaoCurta: "Trabalhando nesse projeto ainda...", descricaoLonga: "Detalhes em breve.", tags: ["Dev"], theme: "purple", links: { github: "#", download: "#" }
    }
];

// 2. CONFIGURAÇÃO DE TEMAS (CORES)
const themeStyles = {
    blue: {
        gradient: "from-blue-500 to-cyan-500",
        shadow: "hover:shadow-cyan-500/30",
        text: "text-blue-600 dark:text-cyan-400",
        bgLight: "bg-blue-50",
        border: "border-blue-200 dark:border-blue-900"
    },
    green: {
        gradient: "from-emerald-500 to-green-500",
        shadow: "hover:shadow-emerald-500/30",
        text: "text-emerald-600 dark:text-emerald-400",
        bgLight: "bg-emerald-50",
        border: "border-emerald-200 dark:border-emerald-900"
    },
    orange: {
        gradient: "from-orange-500 to-amber-500",
        shadow: "hover:shadow-orange-500/30",
        text: "text-orange-600 dark:text-orange-400",
        bgLight: "bg-orange-50",
        border: "border-orange-200 dark:border-orange-900"
    },
    purple: {
        gradient: "from-purple-500 to-fuchsia-500",
        shadow: "hover:shadow-purple-500/30",
        text: "text-purple-600 dark:text-purple-400",
        bgLight: "bg-purple-50",
        border: "border-purple-200 dark:border-purple-900"
    }
};

// 3. LÓGICA DE RENDERIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projects-container');
    if (!container) return; 

    projetosData.forEach(projeto => {
        // Seleciona o tema
        const theme = themeStyles[projeto.theme] || themeStyles.purple;

        // Gera o HTML das tags
        const tagsHtml = projeto.tags.map(tag => 
            `<span class="inline-block text-[10px] font-bold py-1 px-2.5 rounded-full mr-2 mb-2 uppercase tracking-wide 
              text-white shadow-sm bg-gradient-to-r ${theme.gradient}">
              ${tag}
            </span>`
        ).join('');

        // Botão Download (Futurista)
        let btnDownload = '';
        if(projeto.links.download && projeto.links.download !== '#') {
            btnDownload = `
                <a href="${projeto.links.download}" download class="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 
                bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 
                hover:shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-1">
                    <i class="fa fa-download"></i> Baixar
                </a>`;
        } else {
            btnDownload = `<span class="px-4 py-2 rounded-full text-[10px] font-bold text-gray-400 border border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60">Indisponível</span>`;
        }

        const card = document.createElement('div');
        card.className = "group bg-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col hover:shadow-xl transition-all duration-500 overflow-hidden";
        
        card.innerHTML = `
            <div class="h-48 bg-gray-100 dark:bg-gray-800 relative group overflow-hidden">
                <img src="${projeto.imagem}" alt="${projeto.titulo}" class="w-full h-full object-cover transition duration-700 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>

            <div class="p-6 flex flex-col flex-grow">
                <div class="mb-4 flex flex-wrap">${tagsHtml}</div>
                <h3 class="text-xl font-bold text-text-heading mb-2">${projeto.titulo}</h3>
                <p class="text-text-secondary text-sm mb-6 flex-grow leading-relaxed">${projeto.descricaoCurta}</p>
                
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div class="flex items-center">
                        <button onclick="toggleDescricao(${projeto.id})" class="group/btn flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 
                            text-white bg-gradient-to-r ${theme.gradient} ${theme.shadow} hover:brightness-110">
                            <i class="fa fa-plus-circle transition-transform group-[.open]/btn:rotate-45"></i> 
                            Detalhes
                        </button>
                    </div>
                    <div>${btnDownload}</div>
                </div>

                <div id="desc-${projeto.id}" class="hidden mt-4 p-5 rounded-xl border ${theme.border} bg-white dark:bg-slate-950 shadow-inner animate-fade-in relative z-20">
                    <p class="font-bold ${theme.text} mb-2 uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <i class="fa fa-align-left"></i> Sobre o projeto
                    </p>
                    <p class="leading-relaxed text-sm text-gray-800 dark:text-gray-200 font-medium">
                        ${projeto.descricaoLonga}
                    </p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
});

// Função Auxiliar para abrir/fechar descrição
function toggleDescricao(id) {
    const descDiv = document.getElementById(`desc-${id}`);
    const btnIcon = document.querySelector(`button[onclick="toggleDescricao(${id})"]`);
    
    if (descDiv) {
        if (descDiv.classList.contains('hidden')) {
            descDiv.classList.remove('hidden');
            if(btnIcon) btnIcon.classList.add('open');
        } else {
            descDiv.classList.add('hidden');
            if(btnIcon) btnIcon.classList.remove('open');
        }
    }
}