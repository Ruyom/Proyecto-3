window.onload = inicializar;

function inicializar() {
  inicializarFirebase();
  document.getElementById("formulario").addEventListener("submit", registrarFirebase);
  mostrarMensajes();
}

function mostrarMensajes() {
  var refMensajes = firebase.database().ref().child("Mensajes");
  refMensajes.on("value", cargarDatos);
}

function borrarMensaje() {
  var clave = this.getAttribute("data-identificador");
  var refMensajes = firebase.database().ref().child("Mensajes").child(clave);
  refMensajes.remove();
}

function editarMensaje() {
  var clave = this.getAttribute("data-identificador");
  var refMensajes = firebase.database().ref().child("Mensajes").child(clave);
  //  refMensajes.update();
  refMensajes.once("value", function(snapshot){
    var datos = snapshot.val();
    var Formulario = document.getElementById("formulario");
    Formulario.name.value = datos.nombre;
    Formulario.message.value = datos.mensaje
  });

}

function cargarDatos(snapshot) {
  var datos = snapshot.val();
  var allMessages = "";
  for (var key in datos) {
    allMessages = allMessages + '<p><strong><img class="delete" src="img/images.png" alt="borrar" data-identificador="' + key + '"/>' + datos[key].nombre + ':</strong> ' + datos[key].mensaje + '<img class="edit" src="img/images.png" alt="editar" data-identificador="' + key + '"/></p>';
  }
  document.getElementById("mensajes").innerHTML = allMessages;

  var EntidadesBorrar = document.getElementsByClassName("delete");
  var EntidadesEditar = document.getElementsByClassName("edit");
  for (var i = 0; i < EntidadesBorrar.length; i++) {
    EntidadesBorrar[i].addEventListener("click", borrarMensaje);
    EntidadesEditar[i].addEventListener("click", editarMensaje);
  }
}

function inicializarFirebase(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDv6idH4LHbZrNN7tVkkYeJnt1x0BSebQo",
    authDomain: "diariometalero.firebaseapp.com",
    databaseURL: "https://diariometalero.firebaseio.com",
    projectId: "diariometalero",
    storageBucket: "diariometalero.appspot.com",
    messagingSenderId: "690756767880"
  };
  firebase.initializeApp(config);
}

function registrarFirebase() {
  event.preventDefault();
  var database = firebase.database();
  var introduceRef = database.ref('Mensajes');
  var data = {}
  data.nombre = document.getElementById("name").value;
  data.mensaje = document.getElementById("message").value;
  data.edad = document.getElementById("message").value;
  introduceRef.on('value', gotData, errData);
  introduceRef.push(data);
}

function gotData(data) {
  var scores = data.val();
  var keys = Object.keys(scores);

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var initials = scores[k].initials;
    var score = scores[k].score;
  }
}

function errData(err) {
  console.log("Error");
  console.log(err);
}
