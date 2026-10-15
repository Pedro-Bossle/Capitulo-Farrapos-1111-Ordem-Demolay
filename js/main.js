// Comportamentos do site: menu, cabeçalho, acordeão e animações ao rolar.
document.documentElement.classList.add('js');

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    iniciarMenu();
    iniciarCabecalho();
    iniciarFaq();
    iniciarRevelar();
    iniciarContadores();
    iniciarVelas();
    iniciarSecaoAtiva();
});

// Menu mobile
function iniciarMenu() {
    const botao = document.querySelector('[data-menu-botao]');
    const menu = document.querySelector('[data-menu]');
    if (!botao || !menu) return;

    const rotulo = botao.querySelector('.sr-only');

    const alternar = (abrir) => {
        botao.setAttribute('aria-expanded', String(abrir));
        menu.classList.toggle('aberta', abrir);
        document.body.classList.toggle('menu-aberto', abrir);
        rotulo.textContent = abrir ? 'Fechar menu' : 'Abrir menu';
    };

    botao.addEventListener('click', () => {
        alternar(botao.getAttribute('aria-expanded') !== 'true');
    });

    // Fecha ao escolher um link ou apertar Esc
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => alternar(false));
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && menu.classList.contains('aberta')) {
            alternar(false);
            botao.focus();
        }
    });

    window.matchMedia('(min-width: 901px)').addEventListener('change', (mq) => {
        if (mq.matches) alternar(false);
    });
}

// Cabeçalho ganha fundo ao rolar e botão "voltar ao topo" aparece
function iniciarCabecalho() {
    const cabecalho = document.querySelector('[data-cabecalho]');
    const topo = document.querySelector('[data-topo]');

    const atualizar = () => {
        const y = window.scrollY;
        cabecalho?.classList.toggle('rolado', y > 24);
        topo?.classList.toggle('visivel', y > window.innerHeight * 0.8);
    };

    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
}

// Acordeão das dúvidas frequentes
function iniciarFaq() {
    document.querySelectorAll('.faq__pergunta').forEach((pergunta) => {
        const resposta = document.getElementById(pergunta.getAttribute('aria-controls'));

        pergunta.addEventListener('click', () => {
            const aberta = pergunta.getAttribute('aria-expanded') === 'true';
            pergunta.setAttribute('aria-expanded', String(!aberta));
            resposta.classList.toggle('aberta', !aberta);
        });
    });
}

// Elementos com .revelar aparecem suavemente ao entrar na tela
function iniciarRevelar() {
    const elementos = document.querySelectorAll('.revelar');

    if (reduzMovimento || !('IntersectionObserver' in window)) {
        elementos.forEach((el) => el.classList.add('visivel'));
        return;
    }

    // Irmãos revelados juntos entram em sequência
    elementos.forEach((el) => {
        const irmaos = [...el.parentElement.children].filter((filho) => filho.classList.contains('revelar'));
        const indice = irmaos.indexOf(el);
        if (indice > 0) el.style.setProperty('--atraso', `${Math.min(indice, 4) * 0.08}s`);
    });

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    elementos.forEach((el) => observador.observe(el));
}

// Números do Capítulo contam até o valor final
function iniciarContadores() {
    const contadores = document.querySelectorAll('[data-contador]');
    if (!contadores.length || reduzMovimento || !('IntersectionObserver' in window)) return;

    const formatar = (valor, semSeparador) =>
        semSeparador ? String(valor) : valor.toLocaleString('pt-BR');

    const animar = (el) => {
        const alvo = Number(el.dataset.contador);
        const semSeparador = el.hasAttribute('data-sem-separador');
        const inicio = semSeparador ? Math.round(alvo * 0.97) : 0;
        const duracao = 1600;
        const comeco = performance.now();

        const passo = (agora) => {
            const progresso = Math.min((agora - comeco) / duracao, 1);
            const suavizado = 1 - Math.pow(1 - progresso, 4);
            el.textContent = formatar(Math.round(inicio + (alvo - inicio) * suavizado), semSeparador);
            if (progresso < 1) requestAnimationFrame(passo);
        };

        requestAnimationFrame(passo);
    };

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            animar(entrada.target);
            observador.unobserve(entrada.target);
        });
    }, { threshold: 0.6 });

    contadores.forEach((el) => observador.observe(el));
}

// Cerimônia das Luzes: cada vela acende quando chega ao centro da tela
function iniciarVelas() {
    const velas = document.querySelectorAll('.vela');
    if (!velas.length) return;

    if (reduzMovimento || !('IntersectionObserver' in window)) {
        velas.forEach((vela) => vela.classList.add('acesa'));
        return;
    }

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('acesa');
            observador.unobserve(entrada.target);
        });
    }, { rootMargin: '0px 0px -40% 0px' });

    velas.forEach((vela) => observador.observe(vela));
}

// Destaca no menu a seção que está na tela (só na página inicial)
function iniciarSecaoAtiva() {
    const links = [...document.querySelectorAll('.navegacao__link[href^="#"]')];
    if (!links.length || !('IntersectionObserver' in window)) return;

    const porId = new Map(links.map((link) => [link.getAttribute('href').slice(1), link]));
    const secoes = [...porId.keys()].map((id) => document.getElementById(id)).filter(Boolean);

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            links.forEach((link) => link.classList.remove('ativo'));
            porId.get(entrada.target.id)?.classList.add('ativo');
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secoes.forEach((secao) => observador.observe(secao));
}
