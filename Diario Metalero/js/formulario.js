window.onload = inicializar;
var Formulario;
var validar;

function inicializar() {
  inicializarFirebase();
  document.getElementById("formulario").addEventListener("submit", registrarFirebase);
  mostrarMensajes();
}

function validar(event) {
  Formulario = event.target;
  if(Formulario.contraseña.value != Formulario.repetir.value){
    event.preventDefault();
    document.getElementById("avisoContra").style.display = "block";
  } else {
    document.getElementById("avisoContra").style.display = "none";
  }
  if(Formulario.nombre.value =="") {
    event.preventDefault();
    document.getElementById("avisoNombre").style.display = "block";
  } else {
    document.getElementById("avisoNombre").style.display = "none";
  }
  if(Formulario.apellidos.value =="") {
    event.preventDefault();
    document.getElementById("avisoApellido").style.display = "block";
  } else {
    document.getElementById("avisoApellido").style.display = "none";
  }
  if(Formulario.edad.value <=17) {
    event.preventDefault();
    document.getElementById("avisoEdad").style.display = "block";
  } else {
    document.getElementById("avisoEdad").style.display = "none";
  }
  if(Formulario.hombre.checked == false && Formulario.mujer.checked == false) {
    event.preventDefault();
    document.getElementById("avisoGenero").style.display = "block";
  } else {
    document.getElementById("avisoGenero").style.display = "none";
  }
  if(Formulario.usuario.value =="") {
    event.preventDefault();
    document.getElementById("avisoUsuario").style.display = "block";
  } else {
    document.getElementById("avisoUsuario").style.display = "none";
  }
  if(Formulario.correo.value =="") {
    event.preventDefault();
    document.getElementById("avisoCorreo").style.display = "block";
  } else {
    document.getElementById("avisoCorreo").style.display = "none";
  }
  if(Formulario.telefono.value =="") {
    event.preventDefault();
    document.getElementById("avisoTelefono").style.display = "block";
  } else {
    document.getElementById("avisoTelefono").style.display = "none";
  }
  if(Formulario.direccion.value =="") {
    event.preventDefault();
    document.getElementById("avisoDireccion").style.display = "block";
  } else {
    document.getElementById("avisoDireccion").style.display = "none";
  }
  if(Formulario.Pais.value =="") {
    event.preventDefault();
    document.getElementById("avisoPais").style.display = "block";
  } else {
    document.getElementById("avisoPais").style.display = "none";
  }
    event.preventDefault();
}
