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
  refMensajes = firebase.database().ref().child("Tarifas");
  refMensajes.on("value", cargarTarifas);
}

function cargarDatos(snapshot) {
  var datos = snapshot.val();
  var allMessages = "";
  for (var key in datos) {
    allMessages = allMessages + '<tr><td>' + datos[key].Nombre + '</td><td>' + datos[key].Genero+ '</td><td>' + datos[key].Tipo + '</td><td>'+ datos[key].Fecha + '</td><td>' + datos[key].Pais
    + '</td><td>' + datos[key].tipos + '</td><td>' + datos[key].Horas + '</td><td>' + datos[key].Email
    + '</td><td><img class="delete" src="img/delete.png" alt="borrar" data-identificador="' + key + '"/>' + '<img class="edit" src="img/edit.png" alt="editar" data-identificador="' + key + '"/></td></tr>';
  }
  document.getElementById("Conciertos").innerHTML = allMessages;

  var EntidadesBorrar = document.getElementsByClassName("delete");
  var EntidadesEditar = document.getElementsByClassName("edit");
  for (var i = 0; i < EntidadesBorrar.length; i++) {
    EntidadesBorrar[i].addEventListener("click", borrarMensaje);
    EntidadesEditar[i].addEventListener("click", editarMensaje);
  }
}


function cargarTarifas(snapshot) {
  var datos = snapshot.val();
  var datosMostrados = "";

  for (var key in datos){
    datosMostrados += '<option value="' + datos[key].Nombre + '">' + datos[key].Nombre +
    ' (' + datos[key].Precio + ')</option>';
  }
  document.getElementById("seleccionarTarifa").innerHTML += datosMostrados;

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
  var comprobacion = 0;
  var formulario = document.getElementById('formulario');

  if (formulario.name.value == '') {
    document.getElementById('avisoNombre').style.display = "block";
  } else {
    comprobacion++;
    document.getElementById('avisoNombre').style.display = "none";
  }

  if (formulario.genero.value == '') {
    document.getElementById('avisoGenero').style.display = "block";
  } else {
    comprobacion++;
    document.getElementById('avisoGenero').style.display = "none";
  }

  if (formulario.fecha.value == '') {
    document.getElementById('avisoFecha').style.display = "block";
  } else {
    comprobacion++;
    document.getElementById('avisoFecha').style.display = "none";
  }

  if (formulario.pais.value == '') {
    document.getElementById('avisoPais').style.display = "block";
  } else {
    comprobacion++;
    document.getElementById('avisoPais').style.display = "none";
  }

  if (formulario.gender.value == '') {
    document.getElementById('avisoGener').style.display = "block";
  } else {
    comprobacion++;
    document.getElementById('avisoGener').style.display = "none";
  }

  if (formulario.hours.value == '') {
    document.getElementById('avisoHoras').style.display = "block";
  } else {
    comprobacion++;
    document.getElementById('avisoHoras').style.display = "none";
  }

  if (formulario.correo.value == '') {
    document.getElementById('avisoEmail').style.display = "block";
  } else {
    comprobacion++;
    document.getElementById('avisoEmail').style.display = "none";
  }

  if (formulario.SeleccionarTarifa.value == '') {
    document.getElementById('avisoTarifa').style.display = "block";
  } else {
    comprobacion++;
    document.getElementById('avisoTarifa').style.display = "none";
  }

  console.log(comprobacion);


  if (comprobacion == 8) {
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
  var refMensajes = firebase.database().ref().child("Conciertos").child(clave);
  refMensajes.remove();
}

function editarMensaje() {
  var clave = this.getAttribute("data-identificador");
  var refMensajes = firebase.database().ref().child("Conciertos").child(clave);
  //  refMensajes.update();
  refMensajes.once("value", function(snapshot){
    var data = snapshot.val();
    var Formulario = document.getElementById("formulario");

    document.getElementById("name").value = data.Nombre;
    Formulario.genero.value = data.Genero;
    document.getElementById("fecha").value = data.Fecha;
    document.getElementById("pais").value = data.Pais;
    Formulario.gender.value = data.Tipo;
    Formulario.hours.value = data.Horas;
    Formulario.correo.value = data.Email;
  });
}
