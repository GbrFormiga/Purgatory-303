// Estrutura narrativa por equipe: intro, capitulos e miniarcos
const estruturaEquipes = {
    azul: {
        intro: { titulo: "Introdução", arquivo: "introducaoazul.html" },
        livros: [
            {
                numero: 1,
                titulo: "Pétalas Negras",
                nomeTitulo: "PETALAS NEGRAS",
                arcos: [
                    { titulo: "Pétalas Negras", arquivo: "petalasnegras.html" },
                    { titulo: "Dia 0 - Manhã", arquivo: "Dia0manhaazul.html" },
                    { titulo: "Dia 0 - Tarde", arquivo: "Dia0tardeazul.html" },
                    { titulo: "Dia 0 - Noite", arquivo: "Dia0noiteazul.html" },
                ]
            }
        ]
    },
    verde: {
        intro: { titulo: "Introdução", arquivo: "introducaoverde.html" },
        livros: [
            {
                numero: 1,
                titulo: "Um Novo Cenário",
                nomeTitulo: "UM NOVO CENARIO",
                arcos: [
                    { titulo: "A Estrela", arquivo: "aestrela.html" },
                    { titulo: "Dia 0 - Manhã", arquivo: "Dia0manhaverde.html" },
                    { titulo: "Dia 0 - Tarde", arquivo: "Dia0tardeverde.html" },
                    { titulo: "Dia 0 - Noite", arquivo: "Dia0noiteverde.html" },
                ]
            }
        ]
    },
    amarelo: {
        intro: { titulo: "Introdução", arquivo: "introducaoamarelo.html" },
        livros: [
            {
                numero: 1,
                titulo: "Pelo o que você luta?",
                nomeTitulo: "PELO O QUE VOCÊ LUTA?",
                arcos: [
                    { titulo: "A Força", arquivo: "aforca.html" },
                ]
            }
        ]
    }
};

const teamOracleBackground = {
    azul: '../img/backgrounds/fundo0azul.jpeg',
    verde: '../img/backgrounds/fundo0verde.jpeg',
    amarelo: '../img/backgrounds/fundo0amarelo.jpeg',
    vermelho: '../img/backgrounds/fundo0vermelho.jpeg',
};

const teamFlower = {
    azul: '../img/flores/florazul.png',
    verde: '../img/flores/florverde.png',
    amarelo: '../img/flores/floramarelo.png',
    vermelho: '../img/flores/florvermelho.png',
};

const chapterBackgroundMap = {
    'introducaoazul.html': '../img/backgrounds/fundo1.jpeg',
    'petalasnegras.html': '../img/backgrounds/fundo1.jpeg',
    'Dia0manhaazul.html': '../img/backgrounds/fundo2.jpeg',
    'Dia0tardeazul.html': '../img/backgrounds/fundo2.jpeg',
    'Dia0noiteazul.html': '../img/backgrounds/fundo2noite.jpeg',
    'introducaoverde.html': '../img/backgrounds/fundo1.jpeg',
    'aestrela.html': '../img/backgrounds/fundo1.jpeg',
    'Dia0manhaverde.html': '../img/backgrounds/fundo3.jpeg',
    'Dia0tardeverde.html': '../img/backgrounds/fundo2.jpeg',
    'Dia0noiteverde.html': '../img/backgrounds/fundo3noite.jpeg',
    'introducaoamarelo.html': '../img/backgrounds/fundo1.jpeg',
    'aforca.html': '../img/backgrounds/fundo1.jpeg',
};

const readingBackgroundOptions = [
    { id: 'auto', name: 'Fundo Automático', src: null },
    { id: 'fundo0', name: 'Oráculos', src: '../img/backgrounds/fundo0.jpeg' },
    { id: 'fundo0verde', name: 'Oráculos Verdes', src: '../img/backgrounds/fundo0verde.jpeg' },
    { id: 'fundo0azul', name: 'Oráculos Azuis', src: '../img/backgrounds/fundo0azul.jpeg' },
    { id: 'fundo0amarelo', name: 'Oráculos Amarelos', src: '../img/backgrounds/fundo0amarelo.jpeg' },
    { id: 'fundo0vermelho', name: 'Oráculos Vermelhos', src: '../img/backgrounds/fundo0vermelho.jpeg' },
    { id: 'fundo1', name: 'Campo de Rosas Negras', src: '../img/backgrounds/fundo1.jpeg' },
    { id: 'fundo2', name: 'Floresta Distorcida', src: '../img/backgrounds/fundo2.jpeg' },
    { id: 'fundo2noite', name: 'Floresta Distorcida a noite', src: '../img/backgrounds/fundo2noite.jpeg' },
    { id: 'fundo3', name: 'Floresta Seca', src: '../img/backgrounds/fundo3.jpeg' },
    { id: 'fundo3noite', name: 'Floresta Seca a noite', src: '../img/backgrounds/fundo3noite.jpeg' },
    { id: 'fundo4', name: 'Vale dos Fungos', src: '../img/backgrounds/fundo4.jpeg' },
    { id: 'fundo4noite', name: 'Vale dos Fungos a noite', src: '../img/backgrounds/fundo4noite.jpeg' }
];

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function getTeamReadingItems(pasta) {
    const equipe = estruturaEquipes[pasta];
    if (!equipe) return [];

    const items = [{
        tipo: 'intro',
        titulo: equipe.intro.titulo,
        pasta,
        arquivo: equipe.intro.arquivo,
        versao: pasta
    }];

    equipe.livros.forEach((livro) => {
        livro.arcos.forEach((arco) => {
            items.push({
                tipo: 'arco',
                titulo: arco.titulo,
                pasta,
                arquivo: arco.arquivo,
                versao: pasta,
                livroNumero: livro.numero
            });
        });
    });

    return items;
}

function getLivro(pasta, numero) {
    return estruturaEquipes[pasta]?.livros.find((livro) => livro.numero === numero) || null;
}

function getIndicePrimeiroArco(pasta, livroNumero) {
    const items = getTeamReadingItems(pasta);
    const livro = getLivro(pasta, livroNumero);
    if (!livro || livro.arcos.length === 0) return -1;

    return items.findIndex((item) => item.arquivo === livro.arcos[0].arquivo);
}

function fecharMenuCapitulos() {
    document.querySelector('.chapter-select')?.classList.remove('open');
}

// Pega um parâmetro da URL, como ?team=azul, para abrir a página em uma equipe específica.
const queryTeam = getQueryParam('team');
let currentColor = queryTeam || localStorage.getItem('team') || 'azul';
let currentVersion = queryTeam || localStorage.getItem('version') || currentColor;

let indiceAtual = 0;
let viewMode = 'content';
let activeTitleLivro = null;
let expandedLivros = new Set();

let backgroundMode = 'auto';
let selectedBackgroundId = 'auto';
let currentReadingBackground = '';

function isReadingPage() {
    return Boolean(document.getElementById('background-panel'));
}

function getChapterBackground(item) {
    return chapterBackgroundMap[item.arquivo] || '../img/backgrounds/fundo0.jpeg';
}

function getReadingBackground() {
    if (viewMode === 'title') {
        return teamOracleBackground[currentColor] || '../img/backgrounds/fundo0.jpeg';
    }

    const items = getTeamReadingItems(currentColor);
    const item = items[indiceAtual];
    if (!item) return '../img/backgrounds/fundo0.jpeg';

    if (backgroundMode === 'fixed') {
        const option = readingBackgroundOptions.find((o) => o.id === selectedBackgroundId);
        return option?.src || getChapterBackground(item);
    }

    return getChapterBackground(item);
}

function setReadingBackground(src) {
    if (!isReadingPage()) return;

    const background = document.querySelector('.background');
    const overlay = document.querySelector('.background-overlay');
    if (!background || !overlay) return;

    if (!src) {
        overlay.style.opacity = '0';
        overlay.removeAttribute('src');
        currentReadingBackground = '';
        return;
    }

    if (src === currentReadingBackground && overlay.style.opacity !== '1') {
        return;
    }

    if (src === currentReadingBackground) {
        overlay.style.opacity = '1';
        return;
    }

    overlay.style.opacity = '0';
    overlay.src = src;
    overlay.onload = () => {
        overlay.style.opacity = '1';
        currentReadingBackground = src;
        setTimeout(() => {
            background.src = src;
            overlay.style.opacity = '0';
        }, 420);
    };
}

function renderBackgroundOptions() {
    const optionsContainer = document.getElementById('background-options');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    readingBackgroundOptions.forEach((option) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'background-option';
        button.dataset.backgroundId = option.id;

        const thumb = option.src
            ? `<img class="background-option-thumb" src="${option.src}" alt="" loading="lazy">`
            : `<div class="background-option-thumb background-option-thumb-auto" aria-hidden="true"><span>↻</span></div>`;

        button.innerHTML = `
            ${thumb}
            <div class="background-option-name">${option.name}</div>
        `;

        if (option.id === selectedBackgroundId) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            applyBackgroundOption(option.id);
        });

        optionsContainer.appendChild(button);
    });
}

function applyBackgroundOption(optionId) {
    selectedBackgroundId = optionId;
    backgroundMode = optionId === 'auto' ? 'auto' : 'fixed';
    renderBackgroundOptions();
    setReadingBackground(getReadingBackground());
}

function toggleBackgroundPanel() {
    const panel = document.getElementById('background-panel');
    if (!panel) return;
    panel.classList.toggle('open');
}

function closeBackgroundPanel() {
    const panel = document.getElementById('background-panel');
    if (!panel) return;
    panel.classList.remove('open');
}

function definirTemaDoCapitulo(item) {
    const cores = {
        verde: { accent: '#3c7a3c', strong: '#2f6b2f', soft: '#f7fff5', text: '#1f5f2a', contrast: '#f4fff4' },
        azul: { accent: '#3f5fb3', strong: '#2e4d92', soft: '#f2f7ff', text: '#1e3f7a', contrast: '#f7fbff' },
        amarelo: { accent: '#b49220', strong: '#92711c', soft: '#fffbe8', text: '#765b0f', contrast: '#fffdf5' },
        vermelho: { accent: '#b23b2f', strong: '#912f25', soft: '#fff4f2', text: '#7a251f', contrast: '#fffaf8' }
    };

    const paleta = cores[item.pasta] || cores.verde;
    document.body.dataset.team = item.pasta;
    document.documentElement.style.setProperty('--team-accent', paleta.accent);
    document.documentElement.style.setProperty('--team-accent-strong', paleta.strong);
    document.documentElement.style.setProperty('--team-accent-soft', paleta.soft);
    document.documentElement.style.setProperty('--team-accent-text', paleta.text);
    document.documentElement.style.setProperty('--team-accent-contrast', paleta.contrast);
}

async function carregarPagina(item) {
    const reader = document.getElementById('reader');
    const resposta = await fetch(`../capitulos/${item.pasta}/${item.arquivo}`);
    const conteudo = await resposta.text();

    reader.innerHTML = conteudo;
    reader.classList.remove('reader--title-screen');
    definirTemaDoCapitulo(item);

    if (isReadingPage()) {
        setReadingBackground(getReadingBackground());
    }
}

async function carregarTituloCapitulo(pasta, livro) {
    const reader = document.getElementById('reader');
    const resposta = await fetch('../capitulos/titulocapitulo.html');
    const conteudo = await resposta.text();

    reader.innerHTML = conteudo;
    reader.classList.add('reader--title-screen');

    document.getElementById('title-chapter-number').textContent = livro.numero;
    document.getElementById('title-chapter-name').textContent = livro.nomeTitulo;
    document.getElementById('title-chapter-flower').src = teamFlower[pasta] || teamFlower.azul;

    definirTemaDoCapitulo({ pasta });

    if (isReadingPage()) {
        setReadingBackground(teamOracleBackground[pasta] || teamOracleBackground.azul);
    }
}

function renderizarMenu() {
    const menu = document.getElementById('chapter-menu');
    if (!menu) return;
    menu.innerHTML = '';

    const equipe = estruturaEquipes[currentColor];
    if (!equipe) {
        const aviso = document.createElement('div');
        aviso.className = 'menu-empty';
        aviso.textContent = 'Nenhum capítulo disponível para a equipe selecionada.';
        menu.appendChild(aviso);
        return;
    }

    const items = getTeamReadingItems(currentColor);

    const introBtn = document.createElement('button');
    introBtn.type = 'button';
    introBtn.className = 'menu-item menu-intro';
    if (viewMode === 'content' && indiceAtual === 0) {
        introBtn.classList.add('active');
    }
    introBtn.textContent = equipe.intro.titulo;
    introBtn.addEventListener('click', () => {
        abrirConteudo(0);
        fecharMenuCapitulos();
    });
    menu.appendChild(introBtn);

    equipe.livros.forEach((livro) => {
        const group = document.createElement('div');
        group.className = 'chapter-group';
        if (expandedLivros.has(livro.numero)) {
            group.classList.add('expanded');
        }

        const livroBtn = document.createElement('button');
        livroBtn.type = 'button';
        livroBtn.className = 'menu-item menu-livro';
        if (viewMode === 'title' && activeTitleLivro === livro.numero) {
            livroBtn.classList.add('active');
        }
        livroBtn.textContent = `Capítulo ${livro.numero}: ${livro.titulo}`;
        livroBtn.addEventListener('click', () => {
            expandedLivros.add(livro.numero);
            abrirTituloLivro(livro.numero);
        });

        const subMenu = document.createElement('div');
        subMenu.className = 'chapter-sub-menu';

        livro.arcos.forEach((arco) => {
            const arcIndex = items.findIndex((item) => item.arquivo === arco.arquivo);
            const arcoBtn = document.createElement('button');
            arcoBtn.type = 'button';
            arcoBtn.className = 'menu-item menu-arco';
            if (viewMode === 'content' && indiceAtual === arcIndex) {
                arcoBtn.classList.add('active');
            }
            arcoBtn.textContent = arco.titulo;
            arcoBtn.addEventListener('click', () => {
                expandedLivros.add(livro.numero);
                abrirConteudo(arcIndex);
                fecharMenuCapitulos();
            });
            subMenu.appendChild(arcoBtn);
        });

        group.appendChild(livroBtn);
        group.appendChild(subMenu);
        menu.appendChild(group);
    });
}

function atualizarNavegacao() {
    const prev = document.getElementById('prev-chapter');
    const next = document.getElementById('next-chapter');
    const items = getTeamReadingItems(currentColor);

    if (viewMode === 'title') {
        const firstArcIndex = getIndicePrimeiroArco(currentColor, activeTitleLivro);
        if (prev) prev.disabled = items.length === 0;
        if (next) next.disabled = firstArcIndex === -1;
        return;
    }

    if (prev) prev.disabled = indiceAtual <= 0;
    if (next) next.disabled = indiceAtual >= items.length - 1;
}

function abrirConteudo(index) {
    const items = getTeamReadingItems(currentColor);
    const item = items[index];
    if (!item) return;

    viewMode = 'content';
    activeTitleLivro = null;
    indiceAtual = index;
    currentColor = item.pasta;
    currentVersion = item.versao || currentVersion;

    if (item.livroNumero) {
        expandedLivros.add(item.livroNumero);
    }

    localStorage.setItem('team', currentColor);
    localStorage.setItem('version', currentVersion);

    carregarPagina(item);
    renderizarMenu();
    atualizarNavegacao();
}

function abrirTituloLivro(numero) {
    const livro = getLivro(currentColor, numero);
    if (!livro) return;

    viewMode = 'title';
    activeTitleLivro = numero;
    expandedLivros.add(numero);

    localStorage.setItem('team', currentColor);
    localStorage.setItem('version', currentVersion);

    carregarTituloCapitulo(currentColor, livro);
    renderizarMenu();
    atualizarNavegacao();
}

function aplicarTema(tema) {
    document.body.classList.toggle('light-mode', tema === 'light');
    document.body.classList.toggle('dark-mode', tema === 'dark');

    const botao = document.getElementById('theme-toggle');
    if (botao) {
        botao.textContent = tema === 'light' ? '☀️' : '🌙';
    }
}

function aplicarGhostMode(ativo) {
    document.body.classList.toggle('ghost-mode', ativo);

    const botao = document.getElementById('ghostmode');
    if (botao) {
        botao.textContent = ativo ? '⭕' : '🔴';
    }
}

const temaSalvo = localStorage.getItem('theme') || 'dark';
aplicarTema(temaSalvo);

const botaoTema = document.getElementById('theme-toggle');
botaoTema?.addEventListener('click', () => {
    const temaAtual = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const novoTema = temaAtual === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', novoTema);
    aplicarTema(novoTema);
});

const ghostSalvo = localStorage.getItem('ghostmode') === 'true';
aplicarGhostMode(ghostSalvo);

const botaoGhost = document.getElementById('ghostmode');
botaoGhost?.addEventListener('click', () => {
    const ativo = !document.body.classList.contains('ghost-mode');
    localStorage.setItem('ghostmode', ativo);
    aplicarGhostMode(ativo);
});

const toggle = document.getElementById('chapter-toggle');
toggle?.addEventListener('click', () => {
    document.querySelector('.chapter-select')?.classList.toggle('open');
});

if (isReadingPage()) {
    renderBackgroundOptions();
    document.getElementById('background-toggle')?.addEventListener('click', toggleBackgroundPanel);
    document.getElementById('background-panel-close')?.addEventListener('click', closeBackgroundPanel);
    applyBackgroundOption(selectedBackgroundId);
}

renderizarMenu();

document.getElementById('prev-chapter')?.addEventListener('click', () => {
    if (viewMode === 'title') {
        abrirConteudo(0);
        return;
    }

    if (indiceAtual > 0) {
        abrirConteudo(indiceAtual - 1);
    }
});

document.getElementById('next-chapter')?.addEventListener('click', () => {
    if (viewMode === 'title') {
        const firstArcIndex = getIndicePrimeiroArco(currentColor, activeTitleLivro);
        if (firstArcIndex >= 0) {
            abrirConteudo(firstArcIndex);
        }
        return;
    }

    const items = getTeamReadingItems(currentColor);
    if (indiceAtual < items.length - 1) {
        abrirConteudo(indiceAtual + 1);
    }
});

if (!estruturaEquipes[currentColor]) {
    currentColor = Object.keys(estruturaEquipes)[0];
}

abrirConteudo(0);
