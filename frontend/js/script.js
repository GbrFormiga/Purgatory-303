// Estrutura narrativa por equipe: introdução, livros e arcos compartilhados.
const estruturaEquipes = {
    azul: {
        intro: { titulo: 'Introdução', arquivo: 'introducaoazul.html' },
        livros: [
            {
                numero: 1,
                titulo: 'Pétalas Negras',
                nomeTitulo: 'PÉTALAS NEGRAS',
                arcos: [
                    { titulo: 'Amor de Mãe', arquivo: 'amordemae.html' },
                    { titulo: 'Dia 0 - Manhã', arquivo: 'Dia0manha.html' },
                    { titulo: 'Dia 0 - Tarde', arquivo: 'Dia0tarde.html' },
                    { titulo: 'Dia 0 - Noite', arquivo: 'Dia0noite.html' },
                ]
            }
        ]
    },
    verde: {
        intro: { titulo: 'Introdução', arquivo: 'introducaoverde.html' },
        livros: [
            {
                numero: 1,
                titulo: 'Um Novo Cenário',
                nomeTitulo: 'UM NOVO CENARIO',
                arcos: [
                    { titulo: 'A Estrela', arquivo: 'aestrela.html' },
                    { titulo: 'Dia 0 - Manhã', arquivo: 'Dia0manha.html' },
                    { titulo: 'Dia 0 - Tarde', arquivo: 'Dia0tarde.html' },
                    { titulo: 'Dia 0 - Noite', arquivo: 'Dia0noite.html' },
                ]
            }
        ]
    },
    amarelo: {
        intro: { titulo: 'Introdução', arquivo: 'introducaoamarelo.html' },
        livros: [
            {
                numero: 1,
                titulo: 'Pelo o que você luta?',
                nomeTitulo: 'PELO O QUE VOCÊ LUTA?',
                arcos: [
                    { titulo: 'A Força', arquivo: 'aforca.html' },
                    { titulo: 'Dia 0 - Manhã', arquivo: 'Dia0manha.html' },
                    { titulo: 'Dia 0 - Tarde', arquivo: 'Dia0tarde.html' },
                    { titulo: 'Dia 0 - Noite', arquivo: 'Dia0noite.html' }
                ]
            }
        ]
    }
};

// Fundo da tela de seleção de acordo com a equipe. 
const fundosOracleEquipe = {
    azul: '../img/backgrounds/fundo0azul.jpeg',
    verde: '../img/backgrounds/fundo0verde.jpeg',
    amarelo: '../img/backgrounds/fundo0amarelo.jpeg',
    vermelho: '../img/backgrounds/fundo0vermelho.jpeg'
};

// Flores usadas na tela de título do capítulo. 
const floresEquipe = {
    azul: '../img/png/blueflower.png',
    verde: '../img/png/greenflower.png',
    amarelo: '../img/png/yellowflower.png',
    vermelho: '../img/png/redflower.png'
};

// Define o fundo padrão para cada arquivo no leitor.
// Como os dias são compartilhados entre todas as equipes em um só HTML, o fundo precisa ser organizado por equipe e por arquivo.
const mapaFundoCapitulo = {
    'introducaoazul.html': '../img/backgrounds/fundo1.jpeg',
    'introducaoverde.html': '../img/backgrounds/fundo1.jpeg',
    'introducaoamarelo.html': '../img/backgrounds/fundo1.jpeg',
    'amordemae.html': '../img/backgrounds/fundo1.jpeg',
    'aestrela.html': '../img/backgrounds/fundo1.jpeg',
    'aforca.html': '../img/backgrounds/fundo1.jpeg',

    'Dia0manha.html': {
        default: '../img/backgrounds/fundo1.jpeg',
        azul: '../img/backgrounds/fundo2.jpeg',
        verde: '../img/backgrounds/fundo3.jpeg',
        amarelo: '../img/backgrounds/fundo2.jpeg',
        vermelho: '../img/backgrounds/fundo2noite.jpeg'  //mudar dps
    },
    'Dia0tarde.html': {
        default: '../img/backgrounds/fundo1.jpeg',
        azul: '../img/backgrounds/fundo2.jpeg',
        verde: '../img/backgrounds/fundo2.jpeg',
        amarelo: '../img/backgrounds/fundo4.jpeg',
        vermelho: '../img/backgrounds/fundo2noite.jpeg' //mudar dps
    },
    'Dia0noite.html': {
        default: '../img/backgrounds/fundo1.jpeg',
        azul: '../img/backgrounds/fundo2noite.jpeg',
        verde: '../img/backgrounds/fundo3noite.jpeg',
        amarelo: '../img/backgrounds/fundo2noite.jpeg',
        vermelho: '../img/backgrounds/fundo1.jpeg' //mudarpds
    }
};

// Opções do painel de fundo do leitor.
const opcoesFundoLeitura = [
    { id: 'auto', nome: 'Fundo Automático', origem: null },
    { id: 'fundo0', nome: 'Oráculos', origem: '../img/backgrounds/fundo0.jpeg' },
    { id: 'fundo0verde', nome: 'Oráculos Verdes', origem: '../img/backgrounds/fundo0verde.jpeg' },
    { id: 'fundo0azul', nome: 'Oráculos Azuis', origem: '../img/backgrounds/fundo0azul.jpeg' },
    { id: 'fundo0amarelo', nome: 'Oráculos Amarelos', origem: '../img/backgrounds/fundo0amarelo.jpeg' },
    { id: 'fundo0vermelho', nome: 'Oráculos Vermelhos', origem: '../img/backgrounds/fundo0vermelho.jpeg' },
    { id: 'fundo1', nome: 'Campo de Rosas Negras', origem: '../img/backgrounds/fundo1.jpeg' },
    { id: 'fundo2', nome: 'Floresta Distorcida', origem: '../img/backgrounds/fundo2.jpeg' },
    { id: 'fundo2noite', nome: 'Floresta Distorcida a noite', origem: '../img/backgrounds/fundo2noite.jpeg' },
    { id: 'fundo3', nome: 'Floresta Seca', origem: '../img/backgrounds/fundo3.jpeg' },
    { id: 'fundo3noite', nome: 'Floresta Seca a noite', origem: '../img/backgrounds/fundo3noite.jpeg' },
    { id: 'fundo4', nome: 'Vale dos Fungos', origem: '../img/backgrounds/fundo4.jpeg' },
    { id: 'fundo4noite', nome: 'Vale dos Fungos a noite', origem: '../img/backgrounds/fundo4noite.jpeg' }
];

// Arquivos que vivem na pasta compartilhada do capítulo.
const arquivosCompartilhados = new Set([
    'introducaoazul.html',
    'introducaoverde.html',
    'introducaoamarelo.html',
    'amordemae.html',
    'Dia0manha.html',
    'Dia0tarde.html',
    'Dia0noite.html',
    'aestrela.html',
    'aforca.html'
]);

function obterElementoPorIds(...ids) {
    for (const id of ids) {
        const elemento = document.getElementById(id);
        if (elemento) return elemento;
    }
    return null;
}

function obterClassePorSeletores(...selectors) {
    for (const selector of selectors) {
        const elemento = document.querySelector(selector);
        if (elemento) return elemento;
    }
    return null;
}

// -----------------------------------------------------------------------------
// Bloco 1: helpers de navegação e montagem da lista de leitura.
// -----------------------------------------------------------------------------
function obterParametroConsulta(nome) {
    return new URLSearchParams(window.location.search).get(nome);
}

function obterItensLeituraEquipe(equipe) {
    const dadosEquipe = estruturaEquipes[equipe];
    if (!dadosEquipe) return [];

    const itens = [{
        tipo: 'intro',
        titulo: dadosEquipe.intro.titulo,
        pasta: equipe,
        arquivo: dadosEquipe.intro.arquivo,
        versao: equipe
    }];

    dadosEquipe.livros.forEach((livro) => {
        livro.arcos.forEach((arco) => {
            itens.push({
                tipo: 'arco',
                titulo: arco.titulo,
                pasta: equipe,
                arquivo: arco.arquivo,
                versao: equipe,
                livroNumero: livro.numero
            });
        });
    });

    return itens;
}

function obterLivro(equipe, numeroLivro) {
    return estruturaEquipes[equipe]?.livros.find((livro) => livro.numero === numeroLivro) || null;
}

function obterIndicePrimeiroArco(equipe, numeroLivro) {
    return obterItensLeituraEquipe(equipe).findIndex((item) => item.livroNumero === numeroLivro);
}

function fecharMenuCapitulos() {
    document.querySelector('.selecaoCapitulo')?.classList.remove('aberto');
    document.querySelector('.chapter-select')?.classList.remove('open');
}

function voltarAoTopoLeitura() {
    const leitor = obterElementoPorIds('leitor', 'reader');
    if (!leitor) return;

    leitor.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

// -----------------------------------------------------------------------------
// Bloco 2: estado da interface e seletor de fundo automático.
// -----------------------------------------------------------------------------
const equipeConsulta = obterParametroConsulta('team');
let equipeAtual = equipeConsulta || localStorage.getItem('team') || 'azul';
let indiceAtual = 0;
let modoVisualizacao = 'conteudo';
let livroTituloAtivo = null;
let livrosExpandidos = new Set();
let modoFundo = 'automatico';
let fundoSelecionadoId = 'auto';
let fundoLeituraAtual = '';

function paginaDeLeitura() {
    return Boolean(obterElementoPorIds('painelFundo', 'background-panel'));
}

function obterFundoCapitulo(item) {
    const configuracaoFundo = mapaFundoCapitulo[item.arquivo];

    if (typeof configuracaoFundo === 'string') {
        return configuracaoFundo;
    }

    if (configuracaoFundo && typeof configuracaoFundo === 'object') {
        return configuracaoFundo[item.pasta] || configuracaoFundo.default || '../img/backgrounds/fundo0.jpeg';
    }

    return '../img/backgrounds/fundo0.jpeg';
}

function obterFundoLeitura() {
    if (modoVisualizacao === 'titulo') {
        return fundosOracleEquipe[equipeAtual] || '../img/backgrounds/fundo0.jpeg';
    }

    const itens = obterItensLeituraEquipe(equipeAtual);
    const itemAtual = itens[indiceAtual];
    if (!itemAtual) return '../img/backgrounds/fundo0.jpeg';

    if (modoFundo === 'fixo') {
        const opcao = opcoesFundoLeitura.find((opcao) => opcao.id === fundoSelecionadoId);
        return opcao?.origem || obterFundoCapitulo(itemAtual);
    }

    return obterFundoCapitulo(itemAtual);
}

function aplicarFundoLeitura(origem) {
    if (!paginaDeLeitura()) return;

    const fundoBase = obterClassePorSeletores('.background', '.fundo');
    const sobreposicao = obterClassePorSeletores('.background-overlay', '.sobreposicaoFundo');
    if (!fundoBase || !sobreposicao) return;

    if (!origem) {
        sobreposicao.style.opacity = '0';
        sobreposicao.removeAttribute('src');
        fundoLeituraAtual = '';
        return;
    }

    if (origem === fundoLeituraAtual && sobreposicao.style.opacity !== '1') {
        return;
    }

    if (origem === fundoLeituraAtual) {
        sobreposicao.style.opacity = '1';
        return;
    }

    sobreposicao.style.opacity = '0';
    sobreposicao.src = origem;
    sobreposicao.onload = () => {
        sobreposicao.style.opacity = '1';
        fundoLeituraAtual = origem;
        setTimeout(() => {
            fundoBase.src = origem;
            sobreposicao.style.opacity = '0';
        }, 420);
    };
}

// -----------------------------------------------------------------------------
// Bloco 3: painel de fundo do leitor, com caixas e miniaturas renderizadas dinamicamente.
// -----------------------------------------------------------------------------
function renderizarOpcoesFundo() {
    const container = obterElementoPorIds('opcoesFundo', 'background-options');
    if (!container) return;
    container.innerHTML = '';

    opcoesFundoLeitura.forEach((opcao) => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'opcaoFundo';
        botao.dataset.fundoId = opcao.id;

        const miniatura = opcao.origem
            ? `<img class="miniaturaFundo" src="${opcao.origem}" alt="" loading="lazy">`
            : `<div class="miniaturaFundo miniaturaFundoAutomatico" aria-hidden="true"><span>↻</span></div>`;

        botao.innerHTML = `
            ${miniatura}
            <div class="nomeFundo">${opcao.nome}</div>
        `;

        if (opcao.id === fundoSelecionadoId) {
            botao.classList.add('ativo');
        }

        botao.addEventListener('click', () => {
            aplicarOpcaoFundo(opcao.id);
        });

        container.appendChild(botao);
    });
}

function aplicarOpcaoFundo(opcaoId) {
    fundoSelecionadoId = opcaoId;
    modoFundo = opcaoId === 'auto' ? 'automatico' : 'fixo';
    renderizarOpcoesFundo();
    aplicarFundoLeitura(obterFundoLeitura());
}

function alternarPainelFundo() {
    obterElementoPorIds('painelFundo', 'background-panel')?.classList.toggle('aberto');
    obterElementoPorIds('painelFundo', 'background-panel')?.classList.toggle('open');
}

function fecharPainelFundo() {
    obterElementoPorIds('painelFundo', 'background-panel')?.classList.remove('aberto');
    obterElementoPorIds('painelFundo', 'background-panel')?.classList.remove('open');
}

// -----------------------------------------------------------------------------
// Bloco 4: paleta visual por equipe.
// -----------------------------------------------------------------------------
function definirTemaDoCapitulo(item) {
    const paletas = {
        verde: { accent: '#3c7a3c', strong: '#2f6b2f', soft: '#f7fff5', text: '#1f5f2a', contrast: '#f4fff4' },
        azul: { accent: '#3f5fb3', strong: '#2e4d92', soft: '#f2f7ff', text: '#1e3f7a', contrast: '#f7fbff' },
        amarelo: { accent: '#b49220', strong: '#92711c', soft: '#fffbe8', text: '#765b0f', contrast: '#fffdf5' },
        vermelho: { accent: '#b23b2f', strong: '#912f25', soft: '#fff4f2', text: '#7a251f', contrast: '#fffaf8' }
    };

    const paleta = paletas[item.pasta] || paletas.verde;
    document.body.dataset.team = item.pasta;
    document.documentElement.style.setProperty('--team-accent', paleta.accent);
    document.documentElement.style.setProperty('--team-accent-strong', paleta.strong);
    document.documentElement.style.setProperty('--team-accent-soft', paleta.soft);
    document.documentElement.style.setProperty('--team-accent-text', paleta.text);
    document.documentElement.style.setProperty('--team-accent-contrast', paleta.contrast);
}

// -----------------------------------------------------------------------------
// Bloco 5: carregamento do conteúdo e da tela inicial do capítulo.
// -----------------------------------------------------------------------------
async function carregarPagina(item) {
    const leitor = obterElementoPorIds('leitor', 'reader');
    const caminhoLeitura = arquivosCompartilhados.has(item.arquivo)
        ? `../capitulos/Chpt1/${item.arquivo}`
        : `../capitulos/${item.pasta}/${item.arquivo}`;

    const resposta = await fetch(caminhoLeitura);
    const conteudo = await resposta.text();

    const parser = new DOMParser();
    const documento = parser.parseFromString(conteudo, 'text/html');
    const secaoEquipe = documento.querySelector(`section[data-team="${item.pasta}"]`);

    leitor.innerHTML = secaoEquipe ? secaoEquipe.outerHTML : conteudo;
    leitor.classList.remove('leitor--titulo');
    leitor.classList.remove('reader--title-screen');
    definirTemaDoCapitulo(item);
    voltarAoTopoLeitura();

    if (paginaDeLeitura()) {
        aplicarFundoLeitura(obterFundoLeitura());
    }
}

async function carregarTituloCapitulo(equipe, livro) {
    const leitor = obterElementoPorIds('leitor', 'reader');
    const resposta = await fetch('../capitulos/titulocapitulo.html');
    const conteudo = await resposta.text();

    leitor.innerHTML = conteudo;
    leitor.classList.add('leitor--titulo');
    leitor.classList.add('reader--title-screen');
    voltarAoTopoLeitura();

    const tituloNumero = obterElementoPorIds('tituloCapituloNumero', 'title-chapter-number');
    const tituloNome = obterElementoPorIds('tituloCapituloNome', 'title-chapter-name');
    const tituloLabel = obterElementoPorIds('tituloCapituloLabel', 'title-chapter-label');
    const flor = obterElementoPorIds('tituloCapituloFlor', 'title-chapter-flower');

    if (tituloNumero) tituloNumero.textContent = livro.numero;
    if (tituloNome) tituloNome.textContent = livro.nomeTitulo;
    if (tituloLabel) tituloLabel.textContent = 'CAPÍTULO';

    if (flor) {
        flor.src = floresEquipe[equipe] || floresEquipe.azul;
    }

    tituloLabel?.animate(
        [{ opacity: 0, transform: 'translateY(-40px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 500 }
    );

    tituloNumero?.animate(
        [{ opacity: 0, transform: 'translateY(-25px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 700, delay: 180 }
    );

    tituloNome?.animate(
        [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 700, delay: 420 }
    );

    if (flor) {
        flor.animate(
            [{ opacity: 0, transform: 'scale(.6) rotate(-15deg)' }, { opacity: 1, transform: 'scale(1) rotate(0deg)' }],
            { duration: 700, easing: 'cubic-bezier(.17,.89,.32,1.3)' }
        );
    }

    definirTemaDoCapitulo({ pasta: equipe });

    if (paginaDeLeitura()) {
        aplicarFundoLeitura(fundosOracleEquipe[equipe] || fundosOracleEquipe.azul);
    }
}

// -----------------------------------------------------------------------------
// Bloco 6: renderização do menu com intro, capítulos e arcos.
// -----------------------------------------------------------------------------
function renderizarMenu() {
    const menu = obterElementoPorIds('menuCapitulos', 'chapter-menu');
    if (!menu) return;
    menu.innerHTML = '';

    const equipe = estruturaEquipes[equipeAtual];
    if (!equipe) {
        const aviso = document.createElement('div');
        aviso.className = 'menuVazio';
        aviso.textContent = 'Nenhum capítulo disponível para a equipe selecionada.';
        menu.appendChild(aviso);
        return;
    }

    const itens = obterItensLeituraEquipe(equipeAtual);

    const botaoIntroducao = document.createElement('button');
    botaoIntroducao.type = 'button';
    botaoIntroducao.className = 'itemMenu itemMenuIntroducao menu-item';
    if (modoVisualizacao === 'conteudo' && indiceAtual === 0) {
        botaoIntroducao.classList.add('ativo');
        botaoIntroducao.classList.add('active');
    }
    botaoIntroducao.textContent = equipe.intro.titulo;
    botaoIntroducao.addEventListener('click', () => {
        abrirConteudo(0);
        fecharMenuCapitulos();
    });
    menu.appendChild(botaoIntroducao);

    equipe.livros.forEach((livro) => {
        const grupo = document.createElement('div');
        grupo.className = 'grupoCapitulo chapter-group';
        if (livrosExpandidos.has(livro.numero)) {
            grupo.classList.add('expandido');
            grupo.classList.add('expanded');
        }

        const botaoLivro = document.createElement('button');
        botaoLivro.type = 'button';
        botaoLivro.className = 'itemMenu itemMenuLivro menu-item menu-livro';
        if (modoVisualizacao === 'titulo' && livroTituloAtivo === livro.numero) {
            botaoLivro.classList.add('ativo');
            botaoLivro.classList.add('active');
        }
        botaoLivro.textContent = `Capítulo ${livro.numero}: ${livro.titulo}`;
        botaoLivro.addEventListener('click', () => {
            livrosExpandidos.add(livro.numero);
            abrirTituloLivro(livro.numero);
        });

        const submenu = document.createElement('div');
        submenu.className = 'submenuCapitulo chapter-sub-menu';

        livro.arcos.forEach((arco) => {
            const indiceArco = itens.findIndex((item) => item.arquivo === arco.arquivo);
            const botaoArco = document.createElement('button');
            botaoArco.type = 'button';
            botaoArco.className = 'itemMenu itemMenuArco menu-item menu-arco';
            if (modoVisualizacao === 'conteudo' && indiceAtual === indiceArco) {
                botaoArco.classList.add('ativo');
                botaoArco.classList.add('active');
            }
            botaoArco.textContent = arco.titulo;
            botaoArco.addEventListener('click', () => {
                livrosExpandidos.add(livro.numero);
                abrirConteudo(indiceArco);
                fecharMenuCapitulos();
            });
            submenu.appendChild(botaoArco);
        });

        grupo.appendChild(botaoLivro);
        grupo.appendChild(submenu);
        menu.appendChild(grupo);
    });
}

function atualizarNavegacao() {
    const anterior = obterElementoPorIds('botaoCapituloAnterior', 'prev-chapter');
    const proximo = obterElementoPorIds('botaoCapituloProximo', 'next-chapter');
    const itens = obterItensLeituraEquipe(equipeAtual);

    if (modoVisualizacao === 'titulo') {
        if (anterior) anterior.disabled = false;

        const indice = obterIndicePrimeiroArco(equipeAtual, livroTituloAtivo);
        if (proximo) proximo.disabled = indice < 0;
        return;
    }

    if (anterior) anterior.disabled = indiceAtual <= 0;
    if (proximo) proximo.disabled = indiceAtual >= itens.length - 1;
}

function abrirConteudo(index) {
    const itens = obterItensLeituraEquipe(equipeAtual);
    const item = itens[index];
    if (!item) return;

    modoVisualizacao = 'conteudo';
    livroTituloAtivo = null;
    indiceAtual = index;
    equipeAtual = item.pasta;

    if (item.livroNumero) {
        livrosExpandidos.add(item.livroNumero);
    }

    localStorage.setItem('team', equipeAtual);

    carregarPagina(item);
    renderizarMenu();
    atualizarNavegacao();
}

function abrirTituloLivro(numeroLivro) {
    const livro = obterLivro(equipeAtual, numeroLivro);
    if (!livro) return;

    modoVisualizacao = 'titulo';
    livroTituloAtivo = numeroLivro;
    livrosExpandidos.add(numeroLivro);

    localStorage.setItem('team', equipeAtual);

    carregarTituloCapitulo(equipeAtual, livro);
    renderizarMenu();
    atualizarNavegacao();
}

// -----------------------------------------------------------------------------
// Bloco 7: tema claro/escuro e modo fantasma.
// -----------------------------------------------------------------------------
function aplicarTema(tema) {
    document.body.classList.toggle('light-mode', tema === 'light');
    document.body.classList.toggle('dark-mode', tema === 'dark');

    const botao = obterElementoPorIds('botaoAlternarTema', 'theme-toggle');
    if (botao) {
        botao.textContent = tema === 'light' ? '☀️' : '🌙';
    }
}

function aplicarModoFantasma(ativo) {
    document.body.classList.toggle('ghost-mode', ativo);

    const botao = obterElementoPorIds('botaoModoFantasma', 'ghostmode');
    if (botao) {
        botao.textContent = ativo ? '⭕' : '🔴';
    }
}

const temaSalvo = localStorage.getItem('theme') || 'dark';
aplicarTema(temaSalvo);

const botaoTema = obterElementoPorIds('botaoAlternarTema', 'theme-toggle');
botaoTema?.addEventListener('click', () => {
    const temaAtual = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const novoTema = temaAtual === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', novoTema);
    aplicarTema(novoTema);
});

const ghostSalvo = localStorage.getItem('ghostmode') === 'true';
aplicarModoFantasma(ghostSalvo);

const botaoGhost = obterElementoPorIds('botaoModoFantasma', 'ghostmode');
botaoGhost?.addEventListener('click', () => {
    const ativo = !document.body.classList.contains('ghost-mode');
    localStorage.setItem('ghostmode', ativo);
    aplicarModoFantasma(ativo);
});

const botaoAlternarCapitulos = obterElementoPorIds('botaoAlternarCapitulos', 'chapter-toggle');
botaoAlternarCapitulos?.addEventListener('click', () => {
    document.querySelector('.selecaoCapitulo')?.classList.toggle('aberto');
    document.querySelector('.chapter-select')?.classList.toggle('open');
});

if (paginaDeLeitura()) {
    renderizarOpcoesFundo();
    obterElementoPorIds('botaoAlternarFundo', 'background-toggle')?.addEventListener('click', alternarPainelFundo);
    obterElementoPorIds('botaoFecharPainel', 'background-panel-close')?.addEventListener('click', fecharPainelFundo);
    aplicarOpcaoFundo(fundoSelecionadoId);
}

renderizarMenu();

// -----------------------------------------------------------------------------
// Bloco 8: navegação do leitor de capítulo anterior/próximo.
// -----------------------------------------------------------------------------
obterElementoPorIds('botaoCapituloAnterior', 'prev-chapter')?.addEventListener('click', () => {
    const itens = obterItensLeituraEquipe(equipeAtual);

    if (modoVisualizacao === 'titulo') {
        abrirConteudo(0);
        return;
    }

    const itemAtual = itens[indiceAtual];
    if (indiceAtual > 0 && itemAtual?.livroNumero && indiceAtual === obterIndicePrimeiroArco(equipeAtual, itemAtual.livroNumero)) {
        abrirTituloLivro(itemAtual.livroNumero);
        return;
    }

    if (indiceAtual > 0) {
        abrirConteudo(indiceAtual - 1);
    }
});

obterElementoPorIds('botaoCapituloProximo', 'next-chapter')?.addEventListener('click', () => {
    const itens = obterItensLeituraEquipe(equipeAtual);

    if (modoVisualizacao === 'titulo') {
        const indice = obterIndicePrimeiroArco(equipeAtual, livroTituloAtivo);
        if (indice >= 0) abrirConteudo(indice);
        return;
    }

    const itemAtual = itens[indiceAtual];
    const proximo = itens[indiceAtual + 1];

    if (indiceAtual === 0 && proximo?.livroNumero) {
        abrirTituloLivro(proximo.livroNumero);
        return;
    }

    if (indiceAtual < itens.length - 1) {
        abrirConteudo(indiceAtual + 1);
    }
});

if (!estruturaEquipes[equipeAtual]) {
    equipeAtual = Object.keys(estruturaEquipes)[0];
}

abrirConteudo(0);