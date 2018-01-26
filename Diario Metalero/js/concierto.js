window.onload = inicializar;

function inicializar() {
  inicializarFirebase();
  document.getElementById("formulario").addEventListener("submit", registrarFirebase);
  mostrarMensajes();
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

function mostrarMensajes() {
  var refMensajes = firebase.database().ref().child("Conciertos");
  refMensajes.on("value", cargarDatos);
}

function cargarDatos(snapshot) {
  var datos = snapshot.val();
  var allMessages = "";
  for (var key in datos) {
    allMessages = allMessages + '<tr><td><img class="delete" src="img/images.png" alt="borrar" data-identificador="' + key + '"/>'
    + datos[key].Nombre + '</td><td>' + datos[key].Genero + '</td><td>'+ datos[key].Fecha + '</td><td>' + datos[key].Pais
    + '</td><td>' + datos[key].tipos + '</td><td>' + datos[key].Horas + '</td><td>' + datos[key].Email
    + '<img class="edit" src="img/images.png" alt="editar" data-identificador="' + key + '"/></p>';
  }
  document.getElementById("Conciertos").innerHTML = allMessages;

  var EntidadesBorrar = document.getElementsByClassName("delete");
  var EntidadesEditar = document.getElementsByClassName("edit");
  for (var i = 0; i < EntidadesBorrar.length; i++) {
    EntidadesBorrar[i].addEventListener("click", borrarMensaje);
    EntidadesEditar[i].addEventListener("click", editarMensaje);
  }
}

function registrarFirebase() {
  event.preventDefault();
  var database = firebase.database();
  var introduceRef = database.ref('Conciertos');
  var data = {}
  data.Nombre = document.getElementById("name").value;
  data.Genero = formulario.genero.value;
  data.Fecha = document.getElementById("fecha").value;
  data.Pais = document.getElementById("pais").value;
  data.Tipo = formulario.gender.value;
  data.Horas = formulario.hours.value;
  data.Email = formulario.correo.value;
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



/*
function borrarMensaje() {
  var clave = this.getAttribute("data-identificador");
  var refMensajes = firebase.database().ref().child("Conciertos").child(clave);
  refMensajes.remove();
}

function editarMensaje() {
  var clave = this.getAttribute("data-identificador");
  var refMensajes = firebase.database().ref().child("Conciertos").child(clave);
  //  refMensajes.update();
  refMensajes.once("value", function(snapshot){
    var datos = snapshot.val();
    var Formulario = document.getElementById("formulario");
    Formulario.name.value = datos.nombre;
    Formulario.message.value = datos.mensaje
  });
}

*/
