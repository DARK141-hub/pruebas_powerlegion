import config from './config.js'; // Importa el archivo de configuración
document.addEventListener("DOMContentLoaded", function() {
  function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    let url = window.location.href;
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Obtener el valor del parámetro 'servicio'
  let servicio = getParameterByName('servicio');
  if (servicio) {
    let servicioSelect = document.getElementById('servicio');
    if (servicioSelect) {
      servicioSelect.value = servicio;
    }
  }

  // Asignar el evento 'click' al botón de enviar
  document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();

    // Número de WhatsApp verificado:
    let telefono = config.telefonoWhatsApp; // Usa la variable desde el archivo de configuración
    
    let nombre = document.querySelector("#nombre").value;
    let numeroTelefono = document.querySelector("#telefono").value;
    let email = document.querySelector("#email").value;
    let servicio = document.querySelector("#servicio").value;
    let mensajeAdicional = document.querySelector("#mensaje").value;
    let resp = document.querySelector("#respuesta");

    resp.classList.remove("fail");
    resp.classList.remove("send");

    let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
      *_Formulario de Contacto_*%0A
      *Nombre:*%0A
      ${nombre}%0A
      *Número de Teléfono:*%0A
      ${numeroTelefono}%0A
      *Correo Electrónico:*%0A
      ${email}%0A
      *Servicio Solicitado:*%0A
      ${servicio}%0A
      *Mensaje Adicional:*%0A
      ${mensajeAdicional}%0A`;

    if (nombre === "" || numeroTelefono === "" || email === "" || servicio === "") {
      resp.classList.add("fail");
      resp.innerHTML = `Faltan algunos datos, ${nombre}`;
      return false;
    }

    resp.classList.remove("fail");
    resp.classList.add("send");
    resp.innerHTML = `Se ha enviado tu solicitud, ${nombre}`;

    window.open(url);
  });
});
