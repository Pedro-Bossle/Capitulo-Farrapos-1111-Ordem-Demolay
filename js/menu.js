function gerarHeader() {
    const headerHTML = `
    <header class="cabecalho">

        <div class="container">
            <div class="mobile_show_container">
                <input type="checkbox" id="menu" class="container__botao ">

                <label for="menu" class="container__rotulo mobile_show">
                    <span class="cabecalho__hamburguer container__imagem"></span>
                </label>

                <ul class="lista__menu">
                    <li class="lista__menu__titulo">Categorias</li>
                    <li class="lista__menu__item">
                        <a class="lista__menu__link" href="/index.html#galeria">Galeria</a>
                    </li>
                    <li class="lista__menu__item">
                        <a class="lista__menu__link" href="/index.html#capitulo">História do Capítulo</a>
                    </li>
                    <li class="lista__menu__item">
                        <a class="lista__menu__link" href="#ordem">História da Ordem</a>
                    </li>
                    <li class="lista__menu__item">
                        <a class="lista__menu__link" href="/index.html#ser-membro">Como Participar?</a>
                    </li>
                    <li class="lista__menu__item">
                        <a class="lista__menu__link" href="/index.html#localizacao">Localização</a>
                    </li>
                    <li class="lista__menu__item">
                        <a class="lista__menu__link" href="/index.html#faq">F.A.Q</a>
                    </li>
                </ul>
            </div>




            <img src="assets/Logo-Farrapos.svg" alt="Logo da Farrapos" class="container__logo" width="50px"
                height="100px">
            <h1 class="container__titulo"> Capítulo<b class="container__titulo--negrito"> Farrapos Nº1111</b></h1>
        </div>

        <div class="container_desktop mobile_hide">

            <ul class="lista_menu_desktop">

                <li class="lista_menu_desktop__item">
                    <a class="lista__menu__link" href="/index.html#galeria">Galeria</a>
                </li>
                <li class="lista_menu_desktop__item">
                    <a class="lista__menu__link" href="/index.html#capitulo">História do Capítulo</a>
                </li>
                <li class="lista_menu_desktop__item">
                    <a class="lista__menu__link" href="#ordem">História da Ordem</a>
                </li>
                <li class="lista_menu_desktop__item">
                    <a class="lista__menu__link" href="/index.html#ser-membro">Como Participar?</a>
                </li>
                <li class="lista_menu_desktop__item">
                    <a class="lista__menu__link" href="/index.html#localizacao">Localização</a>
                </li>
                <li class="lista_menu_desktop__item">
                    <a class="lista__menu__link" href="/index.html#faq">F.A.Q</a>
                </li>
            </ul>


        </div>




        <!-- <div class="container">
            <a href="https://sis.demolaybrasil.org.br/login" target="_blank" class="container__link">Entrar</a>
            <a href="https://form.jotform.com/capitulo1111/quero-ser-demolay" target="_blank"
                class="container__link">Participar</a>
        </div>-->
    </header>
    `;

    // Insere o header no início do body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', gerarHeader);
