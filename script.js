document.addEventListener('DOMContentLoaded', function() {
    
    const header = document.querySelector('header');
    let slideIndex = 1;


    // ----------------------------------------------------
    // 1. FUNCIONALIDAD DEL HEADER Y MENÚ MÓVIL
    // ----------------------------------------------------

    // Menú Hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Efecto de Scroll en el header
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    // ----------------------------------------------------
    // 2. FUNCIONALIDAD DEL CARRUSEL
    // ----------------------------------------------------
    
    // Función para cambiar de slide
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    // Necesario para que los botones con onclick del HTML funcionen
    window.plusSlides = plusSlides; 
    

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("carousel-slide");
        
        // Finaliza si no hay slides (para evitar errores en otras páginas)
        if (slides.length === 0) return; 

        if (n > slides.length) {slideIndex = 1} 
        if (n < 1) {slideIndex = slides.length}
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        
        // Muestra el slide activo
        slides[slideIndex-1].style.display = "block"; 
    }
    
    // Inicializar el carrusel SOLO si estamos en la página de inicio
    if (document.querySelector('.carousel-container')) {
        showSlides(slideIndex);
    }
});