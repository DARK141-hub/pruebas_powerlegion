import config from './config.js'; // Importa el archivo de configuración

document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const dotsContainer = document.querySelector('.carousel-dots');
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const infoNav = document.querySelector('.info-nav');
    const closeMenu = document.getElementById('close-menu');
    const modal = document.getElementById("modal-form");
    const openModal = document.getElementById("open-modal");
    const closeModal = document.getElementById("close-modal");
    const form = document.querySelector("#contact-form");
    const respuesta = document.querySelector("#respuesta");

    let currentIndex = 0;

    // Función para determinar cuántas diapositivas se muestran según el tamaño de la pantalla
    function getSlidesToShow() {
        return window.innerWidth <= 500 ? 1 : 4; // 1 en responsive, 4 en pantallas grandes
    }

    // Crear los puntos dinámicamente
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    const dots = document.querySelectorAll('.dot');

    // Actualizar los puntos activos
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Calcular el desplazamiento y mover el carrusel
    function goToSlide(index) {
        const slidesToShow = getSlidesToShow();
        const slideWidth = 100 / slidesToShow; // Ancho en porcentaje de cada diapositiva

        // Limitar el índice para que no exceda el número de diapositivas visibles
        currentIndex = Math.min(Math.max(index, 0), slides.length - slidesToShow);
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        updateDots();
    }

    // Botón Siguiente
    nextButton.addEventListener('click', () => {
        const slidesToShow = getSlidesToShow();
        if (currentIndex < slides.length - slidesToShow) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Volver al inicio
        }
    });

    // Botón Anterior
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            const slidesToShow = getSlidesToShow();
            goToSlide(slides.length - slidesToShow); // Ir al final
        }
    });

    // Auto avance de diapositivas
    setInterval(() => {
        const slidesToShow = getSlidesToShow();
        if (currentIndex < slides.length - slidesToShow) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 5000); // Cambia cada 5 segundos

    // Actualizar el carrusel al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        goToSlide(currentIndex); // Recalcula el desplazamiento
    });

    // Inicializar el carrusel
    goToSlide(0);

    // Verificar si los elementos existen antes de agregar eventos
    if (hamburger && navLinks && infoNav) {
        // Toggle del menú hamburguesa
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            infoNav.classList.toggle('active');

            // Bloquear scroll cuando el menú está abierto
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.info-nav')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                infoNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Cerrar menú con botón de cerrar
        if (closeMenu) {
            closeMenu.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                infoNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    }

    // Abrir el Modal
    if (openModal && modal) {
        openModal.addEventListener("click", () => {
            modal.showModal(); // ✅ Abre la ventana modal
        });

        // Cerrar el Modal con el botón
        if (closeModal) {
            closeModal.addEventListener("click", () => {
                modal.close(); // ✅ Cierra la ventana modal
            });
        }

        // Cerrar el Modal al hacer clic fuera
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    }

    // Obtener el valor del parámetro 'servicio' desde la URL
    function getParameterByName(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        let url = window.location.href;
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        let results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    let servicio = getParameterByName('servicio');
    if (servicio) {
        let servicioSelect = document.getElementById('servicio');
        if (servicioSelect) {
            servicioSelect.value = servicio;
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que el formulario recargue la página

        // 📌 Verificar que `respuesta` no sea null antes de usarlo
        if (!respuesta) {
            console.error("El elemento #respuesta no existe en el DOM.");
            return;
        }

        let nombre = document.querySelector("#nombre").value.trim();
        let numeroTelefono = document.querySelector("#telefono").value.trim();
        let email = document.querySelector("#email").value.trim();
        let servicio = document.querySelector("#servicio").value;
        let mensajeAdicional = document.querySelector("#mensaje").value.trim();

        // 📌 Verificar campos vacíos
        if (!nombre || !numeroTelefono || !email || !servicio) {
            respuesta.classList.add("fail");
            respuesta.textContent = `Faltan algunos datos, ${nombre ? nombre : 'Usuario'}`;
            return false;
        }

        // 📌 Mostrar mensaje de éxito antes de abrir WhatsApp
        respuesta.classList.remove("fail");
        respuesta.classList.add("send");
        respuesta.textContent = `Se ha enviado tu solicitud, ${nombre}`;

        // 📌 Redirigir a WhatsApp en nueva pestaña
        let telefono = config.telefonoWhatsApp; // Número fijo para evitar error en config
        let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
        *_Formulario de Contacto_*%0A
        *Nombre:* ${nombre}%0A
        *Número de Teléfono:* ${numeroTelefono}%0A
        *Correo Electrónico:* ${email}%0A
        *Servicio Solicitado:* ${servicio}%0A
        *Mensaje Adicional:* ${mensajeAdicional}%0A`;

        setTimeout(() => {
            window.open(url, "_blank");
        }, 500); // Espera 500ms antes de abrir WhatsApp

        // 📌 Limpiar el formulario después de enviar
        form.reset();
    });
});