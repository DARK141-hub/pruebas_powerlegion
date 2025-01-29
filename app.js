document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  const infoNav = document.querySelector('.info-nav');
  const closeMenu = document.getElementById('close-menu');

  // Toggle both menus
  hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      infoNav.classList.toggle('active');
      
      // Bloquear scroll del body cuando el menú está abierto
      if(navLinks.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'auto';
      }
  });

  // Cerrar menús al hacer click fuera
  document.addEventListener('click', function(event) {
      if(!event.target.closest('.main-nav') && !event.target.closest('.info-nav')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          infoNav.classList.remove('active');
          document.body.style.overflow = 'auto';
      }
  });

  // Prevent closing when clicking inside menus
  navLinks.addEventListener('click', function(e) {
      e.stopPropagation();
  });

  infoNav.addEventListener('click', function(e) {
      e.stopPropagation();
  });

  // Close menu with the close button
  closeMenu.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      infoNav.classList.remove('active');
      document.body.style.overflow = 'auto';
  });
});
