$(document).ready(function(){
    var swiper_promocoes = new Swiper('.area-mostruario .swiper-promocoes', {
        navigation: {
            nextEl: '#promocoes .setas .seta-direita',
            prevEl: '#promocoes .setas .seta-esquerda',
        },
        slidesPerView: 3      
    });
});

function abreMenu (){
    document.querySelector("nav.menu").style.display = "block";
}

function fechaMenu (){
    document.querySelector("nav.menu").style.display = "none";
}

function toogleModal (elem){
    var modal = document.querySelector(elem);
    var body = document.querySelector('body');

    modal.classList.toggle("active");
    
    if (modal.classList.contains("active")) {
        body.style.overflowY = "hidden";
    } else {
        body.style.overflowY = "auto";
    }
    
    if(elem == '.modal-produtos') {
        var swiper_todos_produtos = new Swiper('.modal-produtos .swiper-todos-produtos', {
            navigation: {
                nextEl: '#todos-produtos .setas .seta-direita',
                prevEl: '#todos-produtos .setas .seta-esquerda',
            },        
            slidesPerView: 5      
        });
    } 
}

// Funções de input
function changeValue (id, func){
    var input = document.querySelector("#" + id);
    var max_value = input.getAttribute("max-value");
    var min_value = input.getAttribute("min-value") || 0;
    var value = func == "add" ? parseInt(input.value) + 1 : parseInt(input.value) - 1;

    if (value <= max_value && value >= min_value && value >= 0) {
        input.value = value;
    }
}