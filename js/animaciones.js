const opcionesOcultat = {
    root: null,
    threshold:0.1, // La animación se dispara cuando el 10% del elemento es visible
    rootMargin: "0px"
};

const obeservarCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('animar-mostrar');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(obeservarCallback, opcionesOcultat);

function activarAnimaciones(){
    const elementosOcultos = document.querySelectorAll('.animar-oculto');
    elementosOcultos.forEach((el)=> observer.observe(el));
}

document.addEventListener('DOMContentLoaded', activarAnimaciones);


