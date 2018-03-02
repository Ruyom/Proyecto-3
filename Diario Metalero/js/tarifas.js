window.onload = Inicializar;

var refTarifas;

function Inicializar(){
  InicializarFirebase();
  document.getElementById('formularioTarifas').addEventListener("submit", registrarFirebase);
  mostrarMensajes();
}



function InicializarFirebase(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDv6idH4LHbZrNN7tVkkYeJnt1x0BSebQo",
    authDomain: "diariometalero.firebaseapp.com",
    databaseURL: "https://diariometalero.firebaseio.com",
    projectId: "diariometalero",
    storageBucket: "diariometalero.appspot.com",
    messagingSenderId: "690756767880"
  };
  firebase.initializeApp( config);
}

function mostrarMensajes(){
  refTarifas = firebase.database().ref().child("Tarifas");
  refTarifas.on("value",mostrarDatos);
}


function mostrarDatos(snapshot) {
  var datos = snapshot.val();
  var datosMostrados = "";

  for (var key in datos){
    datosMostrados += '<tr><td>' + datos[key].Nombre +
    '</td><td>' + datos[key].Precio + '€</td><td>' +
    '<img class="delete" src="img/delete.png" alt="borrar" data-identificador="'
    + key + '"/>' + '<img class="edit" src="img/edit.png" alt="editar" data-identificador="'
    + key + '"/></td></tr>';
  }
  document.getElementById("datosTarifas").innerHTML = datosMostrados;

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
  var introduceRef = database.ref('Tarifas');
  var data = {};
  var formulario = document.getElementById('formularioTarifas');
  var comprobacion = 0;

  if (formulario.Name.value == '') {
    document.getElementById('avisoNombre').style.display = "block";
  } else {
    document.getElementById('avisoNombre').style.display = "none";
    comprobacion++;
  }

  if (formulario.price.value == '') {
    document.getElementById('avisoPrecio').style.display = "block";
  } else {
    document.getElementById('avisoPrecio').style.display = "none";
    comprobacion++;
  }

  if (comprobacion == 2) {
    data.Nombre = document.getElementById("Name").value;
    data.Precio = document.getElementById("price").value;
    introduceRef.on('value', gotData, errData);
    introduceRef.push(data);
  }
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

function borrarMensaje() {
  var clave = this.getAttribute("data-identificador");
  var refMensajes = firebase.database().ref().child("Tarifas").child(clave);
  refMensajes.remove();
}

function editarMensaje() {
  var clave = this.getAttribute("data-identificador");
  var refMensajes = firebase.database().ref().child("Tarifas").child(clave);

  refMensajes.once("value", function(snapshot){
    var data = snapshot.val();
    var Formulario = document.getElementById("formulario");

    document.getElementById("Name").value = data.Nombre;
    document.getElementById("price").value = data.Precio;
  });
}
