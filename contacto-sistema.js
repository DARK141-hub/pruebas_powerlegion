document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();
  
    // Número de WhatsApp verificado:
    let telefono = "+528683739341"; // Reemplaza con el número de WhatsApp del cliente
  
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
  