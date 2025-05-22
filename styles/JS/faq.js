var elementosDuvida = document.querySelectorAll('.duvida')
/*document é objeto que armazena varios valores. query é a função que seleciona os elementos da pag que nem no CSS e os bloquinhos*/

elementosDuvida.forEach(function (duvida) {
    duvida.addEventListener('click', function () {
        duvida.classList.toggle('ativa')
    })

})