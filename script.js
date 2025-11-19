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
            
            // 🛑 AÑADIDO: Lógica para cambiar el ícono de barras a X
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
            // 🛑 FIN DE LA MEJORA
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
    // 2. FUNCIONALIDAD DEL CARRUSEL (No se modifica, está correcto)
    // ----------------------------------------------------
    
    // Función para cambiar de slide (Asignada a window.plusSlides para el HTML)
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    // Hacemos la función accesible globalmente para el carrusel en el HTML
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
    
    
    // ----------------------------------------------------
    // 3. VALIDACIÓN DEL FORMULARIO (No se modifica, está correcto)
    // ----------------------------------------------------
    
    /**
     * Función para validar el formulario antes de enviarlo.
     * Si la validación falla, redirige a la página de error.
     */
    function validateForm(event) {
        // 1. Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const ci = document.getElementById('ci').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        // Bandera para saber si hay errores
        let hasError = false;
        
        // --- 2. Reglas de Validación ---
        
        // a) Nombre: Mín. 3, Máx. 100
        if (nombre.length < 3 || nombre.length > 100) {
            hasError = true;
        }

        // b) Correo Electrónico: Formato @
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailPattern.test(email)) {
            hasError = true;
        }
        
        // c) Cédula de Identidad: Solo números, 7-9 dígitos
        const ciPattern = /^[0-9]{7,9}$/;
        if (!ciPattern.test(ci)) {
            hasError = true;
        }

        // d) Número de Teléfono: Solo números, 7-11 dígitos
        const telefonoPattern = /^[0-9]{7,11}$/;
        if (!telefonoPattern.test(telefono)) {
            hasError = true;
        }

        // e) Mensaje: Mín. 10, Máx. 500
        if (mensaje.length < 10 || mensaje.length > 500) {
            hasError = true;
        }
        
        // --- 3. Resultado de la Validación ---

        if (hasError) {
            event.preventDefault(); // Prevenir el envío
            
            // 🛑 Redirección manual a tu página de error personalizada
            window.location.href = 'https://jeancarlosalcala2005-ops.github.io/CEVAC/error.html';
            
            return false;
        }
        
        return true; 
    }
    
    // 🛑 HACEMOS LA FUNCIÓN ACCESIBLE GLOBALMENTE para el formulario en el HTML
    window.validateForm = validateForm;

});