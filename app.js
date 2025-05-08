import config from './config.js'; // Importa el archivo de configuración

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del menú hamburguesa
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const infoNav = document.querySelector('.info-nav');
    const closeMenu = document.getElementById('close-menu');
    
    // Elementos del modal de contacto
    const modal = document.getElementById("modal-form");
    const openModal = document.getElementById("open-modal");
    const closeModal = document.getElementById("close-modal");
    const form = document.querySelector("#contact-form");
    const respuesta = document.querySelector("#respuesta");
    
    // Elementos del job application
    const jobModal = document.getElementById('job-modal');
    const jobForm = document.getElementById('job-application-form');
    const jobResponse = document.getElementById('job-response');
    const applyButtons = document.querySelectorAll('.apply-button');
    
    // Configurar WhatsApp global
    window.whatsappNumber = config.telefonoWhatsApp;

    // ===== FUNCIONALIDAD DEL MENÚ HAMBURGUESA =====
    if (hamburger && navLinks && infoNav) {
        // Toggle del menú hamburguesa
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            infoNav.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Cerrar menú al hacer clic en un enlace dentro del menú
        navLinks.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                infoNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
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

    // ===== FUNCIONALIDAD DEL MODAL DE CONTACTO =====
    if (openModal && modal) {
        openModal.addEventListener("click", () => {
            modal.showModal();
        });

        if (closeModal) {
            closeModal.addEventListener("click", () => {
                modal.close();
            });
        }

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    }

    // ===== FUNCIONALIDAD DEL FORMULARIO DE CONTACTO =====
    if (form) {
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
            e.preventDefault();

            if (!respuesta) {
                console.error("El elemento #respuesta no existe en el DOM.");
                return;
            }

            let nombre = document.querySelector("#nombre").value.trim();
            let numeroTelefono = document.querySelector("#telefono").value.trim();
            let email = document.querySelector("#email").value.trim();
            let servicio = document.querySelector("#servicio").value;
            let mensajeAdicional = document.querySelector("#mensaje").value.trim();
            let fechaHora = document.querySelector("#date").value;

            if (!nombre || !numeroTelefono || !email || !servicio || !fechaHora) {
                respuesta.classList.add("fail");
                respuesta.textContent = `Faltan algunos datos, ${nombre ? nombre : 'Usuario'}`;
                return false;
            }

            respuesta.classList.remove("fail");
            respuesta.classList.add("send");
            respuesta.textContent = `Se ha enviado tu solicitud, ${nombre}`;

            let telefono = config.telefonoWhatsApp;
            let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
            *_Formulario de Contacto_*%0A
            *Nombre:* ${nombre}%0A
            *Número de Teléfono:* ${numeroTelefono}%0A
            *Correo Electrónico:* ${email}%0A
            *Servicio Solicitado:* ${servicio}%0A
            *Fecha y Hora Preferida para Llamada:* ${fechaHora}%0A
            *Mensaje Adicional:* ${mensajeAdicional}%0A`;

            setTimeout(() => {
                window.open(url, "_blank");
            }, 500);
            form.reset();
        });
    }

    // ===== FUNCIONALIDAD DEL BOTÓN DE WHATSAPP =====
    const whatsappBtn = document.getElementById("whatsapp-float");
    if (whatsappBtn && config.telefonoWhatsApp) {
        let url = `https://wa.me/${config.telefonoWhatsApp}`;
        whatsappBtn.setAttribute("href", url);
    }

    // ===== FUNCIONALIDAD DEL JOB APPLICATION =====
    if (jobModal && jobForm && jobResponse) {
        // Abrir modal al hacer clic en los botones de aplicación
        applyButtons.forEach(button => {
            button.addEventListener('click', () => {
                jobModal.showModal();
            });
        });

        // Manejar el envío del formulario de trabajo
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleJobApplication();
        });

        // Función para manejar la aplicación de trabajo
        function handleJobApplication() {
            const name = document.getElementById('applicant-name').value;
            const phone = document.getElementById('applicant-phone').value;
            const email = document.getElementById('applicant-email').value;
            const position = document.getElementById('job-position').value;
            const message = document.getElementById('applicant-message').value;
            
            jobResponse.textContent = "Processing your application...";
            
            const whatsappMessage = `JOB APPLICATION\n\nPosition: ${position}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nAdditional Message:\n${message}`;
            const whatsappURL = `https://wa.me/${window.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            jobResponse.textContent = "Application submitted! Opening WhatsApp...";
            
            window.open(whatsappURL, '_blank');
            
            setTimeout(() => {
                jobModal.close();
            }, 1500);
        }
    }

    // ===== FUNCIONALIDAD DE LAS GALERÍAS =====
    const galleryButtons = document.querySelectorAll('.carpentry-view-gallery');
    const closeButtons = document.querySelectorAll('.carpentry-close-btn');
    const modals = document.querySelectorAll('dialog[id$="-modal"]');
    
    galleryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal') || 'carpentry-modal';
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
                document.body.classList.add('no-scroll');
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('dialog');
            if (modal) {
                modal.close();
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            const dialogDimensions = this.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                this.close();
                document.body.classList.remove('no-scroll');
            }
        });
    });
});