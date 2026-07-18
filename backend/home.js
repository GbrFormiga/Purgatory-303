// Lista de capítulos disponíveis, organizada por equipe e versão.

const capitulos = [
    { titulo: "Introdução", pasta: "azul", arquivo: "introducaoazul.html", versao: "azul" },
    { titulo: "Pétalas Negras", pasta: "azul", arquivo: "petalasnegras.html", versao: "azul" },
    { titulo: "Dia 0", pasta: "azul", arquivo: "Dia0azul.html", versao: "azul" },
    { titulo: "Introdução", pasta: "verde", arquivo: "introducaoverde.html", versao: "verde" },
    { titulo: "A Estrela", pasta: "verde", arquivo: "aestrela.html", versao: "verde" },
    { titulo: "Dia 0", pasta: "verde", arquivo: "Dia0verde.html", versao: "verde" },
    { titulo: "Introdução", pasta: "vermelho", arquivo: "introducaovermelho.html", versao: "vermelho" },
    { titulo: "A Força", pasta: "vermelho", arquivo: "aforca.html", versao: "vermelho" },
];


// Pega um parâmetro da URL, como ?team=azul, para abrir a página em uma equipe específica.
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Estado atual da navegação entre capítulos.
let indiceAtual = 0;
const queryTeam = getQueryParam('team');
let currentColor = queryTeam || localStorage.getItem("team") || capitulos[0].pasta;
let currentVersion = queryTeam || localStorage.getItem("version") || capitulos[0].versao || "v1";

const chapterBackgroundMap = {
    'introducaoazul.html': '../img/backgrounds/fundo1.jpeg',
    'petalasnegras.html': '../img/backgrounds/fundo1.jpeg',
    'Dia0azul.html': '../img/backgrounds/fundo2.jpeg',
    'introducaoverde.html': '../img/backgrounds/fundo1.jpeg',
    'aestrela.html': '../img/backgrounds/fundo1.jpeg',
    'Dia0verde.html': '../img/backgrounds/fundo3.jpeg',
    'introducaovermelho.html': '../img/backgrounds/fundo1.jpeg',
    'aforca.html': '../img/backgrounds/fundo1.jpeg',

}
const readingBackgroundOptions = [
    { id: 'auto', name: 'Fundo Automático', src: null },
    { id: 'fundo0', name: 'Oráculos', src: '../img/backgrounds/fundo0.jpeg' },
    { id: 'fundo0verde', name: 'Oráculos Verdes', src: '../img/backgrounds/fundo0verde.jpeg' },
    { id: 'fundo0azul', name: 'Oráculos Azuis', src: '../img/backgrounds/fundo0azul.jpeg' },
    { id: 'fundo0amarelo', name: 'Oráculos Amarelos', src: '../img/backgrounds/fundo0amarelo.jpeg' },
    { id: 'fundo0vermelho', name: 'Oráculos Vermelhos', src: '../img/backgrounds/fundo0vermelho.jpeg' },
    { id: 'fundo1', name: 'Campo de Rosas Negras', src: '../img/backgrounds/fundo1.jpeg' },
    { id: 'fundo2', name: 'Floresta Distorcida', src: '../img/backgrounds/fundo2.jpeg' },
    { id: 'fundo3', name: 'Floresta Seca', src: '../img/backgrounds/fundo3.jpeg' }
];

let backgroundMode = 'auto';
let selectedBackgroundId = 'auto';
let currentReadingBackground = '';

function isReadingPage() {
    return Boolean(document.getElementById('background-panel'));
}

function getChapterBackground(capitulo){
    return chapterBackgroundMap[capitulo.arquivo] || '../img/backgrounds/fundo0.jpeg';
}

function getReadingBackground(){
    if (backgroundMode === 'fixed') {
        const option = readingBackgroundOptions.find(o => o.id === selectedBackgroundId);
        return option?.src || getChapterBackground(capitulos[indiceAtual]);
    }

    return getChapterBackground(capitulos[indiceAtual]);
}

function setReadingBackground(src){
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

function renderBackgroundOptions(){
    const optionsContainer = document.getElementById('background-options');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    readingBackgroundOptions.forEach(option => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'background-option';
        button.dataset.backgroundId = option.id;
        button.innerHTML = `
            <div class="background-option-name">${option.name}</div>
            <div class="background-option-label">${option.src ? option.src.split('/').pop() : 'auto'}</div>
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

function applyBackgroundOption(optionId){
    selectedBackgroundId = optionId;
    backgroundMode = optionId === 'auto' ? 'auto' : 'fixed';
    renderBackgroundOptions();

    setReadingBackground(getReadingBackground());
}

function toggleBackgroundPanel(){
    const panel = document.getElementById('background-panel');
    if (!panel) return;
    panel.classList.toggle('open');
}

function closeBackgroundPanel(){
    const panel = document.getElementById('background-panel');
    if (!panel) return;
    panel.classList.remove('open');
}

// Aplica a paleta de cores do capítulo selecionado ao documento.
function definirTemaDoCapitulo(capitulo){
    const cores = {
        verde: { accent: "#3c7a3c", strong: "#2f6b2f", soft: "#f7fff5", text: "#1f5f2a", contrast: "#f4fff4" },
        azul: { accent: "#3f5fb3", strong: "#2e4d92", soft: "#f2f7ff", text: "#1e3f7a", contrast: "#f7fbff" },
        amarelo: { accent: "#b49220", strong: "#92711c", soft: "#fffbe8", text: "#765b0f", contrast: "#fffdf5" },
        vermelho: { accent: "#b23b2f", strong: "#912f25", soft: "#fff4f2", text: "#7a251f", contrast: "#fffaf8" }
    };

    const paleta = cores[capitulo.pasta] || cores.verde;
    document.body.dataset.team = capitulo.pasta;
    document.documentElement.style.setProperty("--team-accent", paleta.accent);
    document.documentElement.style.setProperty("--team-accent-strong", paleta.strong);
    document.documentElement.style.setProperty("--team-accent-soft", paleta.soft);
    document.documentElement.style.setProperty("--team-accent-text", paleta.text);
    document.documentElement.style.setProperty("--team-accent-contrast", paleta.contrast);
}

// Carrega o conteúdo HTML do capítulo a partir da pasta correspondente.
async function carregarPagina(capitulo){
    const resposta = await fetch(`../capitulos/${capitulo.pasta}/${capitulo.arquivo}`);
    const conteudo = await resposta.text();

    document.getElementById("reader").innerHTML = conteudo;
    definirTemaDoCapitulo(capitulo);
    if (isReadingPage()) {
        setReadingBackground(getReadingBackground());
    }
}

// Monta o menu de capítulos com os itens visíveis para a equipe/versão atual.
function renderizarMenu(){
    const menu = document.getElementById("chapter-menu");
    if (!menu) return;
    menu.innerHTML = "";

    const visiveis = getVisibleIndices();
    if (visiveis.length === 0) {
        const aviso = document.createElement("div");
        aviso.textContent = "Nenhum capítulo disponível para a cor/versão selecionada.";
        menu.appendChild(aviso);
        return;
    }

    visiveis.forEach((globalIndex) => {
        const capitulo = capitulos[globalIndex];
        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = capitulo.titulo;
        botao.addEventListener("click", () => {
            abrirCapitulo(globalIndex);
            document.querySelector(".chapter-select")?.classList.remove("open");
        });
        menu.appendChild(botao);
    });
}

// Filtra os capítulos que pertencem ao time e versão atualmente ativos.
function getVisibleIndices(){
    return capitulos
        .map((c, i) => ({ c, i }))
        .filter(x => x.c.pasta === currentColor && x.c.versao === currentVersion)
        .map(x => x.i);
}

// Atualiza o estado dos botões de anterior/próximo conforme a posição atual.
function atualizarNavegacao(){
    const prev = document.getElementById("prev-chapter");
    const next = document.getElementById("next-chapter");

    const visiveis = getVisibleIndices();
    const pos = visiveis.indexOf(indiceAtual);

    if (prev) prev.disabled = pos <= 0;
    if (next) next.disabled = pos === -1 || pos >= visiveis.length - 1;
}

// Alterna entre os modos claro e escuro da interface.
function aplicarTema(tema){
    document.body.classList.toggle("light-mode", tema === "light");
    document.body.classList.toggle("dark-mode", tema === "dark");

    const botao = document.getElementById("theme-toggle");
    if (botao) {
        botao.textContent = tema === "light" ? "☀️" : "🌙";
    }
}

// Abre um capítulo, atualiza o estado da navegação e salva a escolha no armazenamento local.
function abrirCapitulo(index){
    indiceAtual = index;
    const cap = capitulos[index];
    // ativar cor e versão do capítulo aberto
    currentColor = cap.pasta;
    currentVersion = cap.versao || currentVersion;
    localStorage.setItem("team", currentColor);
    localStorage.setItem("version", currentVersion);

    carregarPagina(cap);
    renderizarMenu();
    atualizarNavegacao();
}

// Inicializa o tema salvo pelo usuário e registra os eventos dos controles.
const temaSalvo = localStorage.getItem("theme") || "dark";
aplicarTema(temaSalvo);

const botaoTema = document.getElementById("theme-toggle");
botaoTema?.addEventListener("click", () => {
    const temaAtual = document.body.classList.contains("light-mode") ? "light" : "dark";
    const novoTema = temaAtual === "light" ? "dark" : "light";
    localStorage.setItem("theme", novoTema);
    aplicarTema(novoTema);
});

const toggle = document.getElementById("chapter-toggle");

toggle?.addEventListener("click", () => {
    document.querySelector(".chapter-select")?.classList.toggle("open");
});

if (isReadingPage()) {
    renderBackgroundOptions();
    document.getElementById('background-toggle')?.addEventListener('click', toggleBackgroundPanel);
    document.getElementById('background-panel-close')?.addEventListener('click', closeBackgroundPanel);
    applyBackgroundOption(selectedBackgroundId);
}

renderizarMenu();

document.getElementById("prev-chapter")?.addEventListener("click", () => {
    const vis = getVisibleIndices();
    const pos = vis.indexOf(indiceAtual);
    if (pos > 0) abrirCapitulo(vis[pos - 1]);
});

document.getElementById("next-chapter")?.addEventListener("click", () => {
    const vis = getVisibleIndices();
    const pos = vis.indexOf(indiceAtual);
    if (pos >= 0 && pos < vis.length - 1) abrirCapitulo(vis[pos + 1]);
});

// Abre o primeiro capítulo visível ao carregar a página.
const primeirosVisiveis = getVisibleIndices();
abrirCapitulo(primeirosVisiveis[0] || 0);