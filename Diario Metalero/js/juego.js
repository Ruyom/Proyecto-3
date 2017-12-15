window.onload = inicializar;
var iniciar
function inicializar() {
  iniciar = document.getElementById("iniciar");
}
var CambioColores = 0;

function corrigeImagen(){
  document.getElementById("wins").innerHTML = "<b>Ganadas:</b> "+ganadas+"   <b>Perdidas:</b> "+perdidas;
  document.getElementById("imagen").src="img/nada.jpg";
}


function CambiarFondo() {
  if (CambioColores == 0) {
    document.body.style.backgroundColor = "#000";
    document.getElementById("ModoNoche").value = "Modo Día";
    CambioColores = 1;
  } else {
    document.body.style.backgroundColor = "#fff";
    document.getElementById("ModoNoche").value = "Modo Noche";
    CambioColores = 0;
  }
}

function Iluminar() {
  document.getElementById("TituloJuego").style.color = "#fff";
}

function Apagar() {
  document.getElementById("TituloJuego").style.color = "#111";
}

var posib=["PIEDRA","PAPEL","TIJERA"];
var ganadas=0;
var perdidas=0;
var aleatorio;
var mano=0;
var manos=["img/piedra.jpg","img/papel.jpg","img/tijera.jpg"];
function reinicio(){
  document.getElementById("oculto").style.display = 'none';
  document.getElementById("imagen").src="img/nada.jpg";
  var aleatorio=Math.round(Math.random());
  var count=0;
  document.getElementById("mensaje").innerHTML = "";
  document.getElementById("primerbot").style.display = 'block';
  document.getElementById("salida").innerHTML = "";
}

function botonesEleccion(){
  var i
  for (i=0;i<document.elegido.eleccion.length;i++){
    if (document.elegido.eleccion[i].checked)
    break;
  }
  document.getElementById("primerbot").style.display = 'none';
  document.getElementById("salida").innerHTML = "La maquina juega: ";
  randomJuego(document.elegido.eleccion[i].value);
}

function randomJuego(eleg){
  aleatorio=Math.round(Math.random()*2);
  var count=0;
  var hola=setInterval(function(){
    if(mano==0){
      document.getElementById("imagen").src=manos[mano];
      mano=1;
    } else if (mano==1){
      document.getElementById("imagen").src=manos[mano];
      mano=2;
    } else{
      document.getElementById("imagen").src=manos[mano];
      mano=0;
    }
    count++;
    if(count >= 25) {
      clearInterval(hola);
      document.getElementById("imagen").src=manos[aleatorio];
      comprueba(eleg);
    }
  }, 100);
}

function comprueba(eleg){
  document.getElementById("salida").innerHTML = "La maquina juega: <b>"+ posib[aleatorio]+"</b>";
  document.getElementById("oculto").style.display = 'block';
  if(eleg==aleatorio){
    document.getElementById("mensaje").innerHTML = "<b>EMPATE</b>";
    document.getElementById("wins").innerHTML = "<b>Ganadas:</b> "+ganadas+"   <b>Perdidas:</b> "+perdidas;
  } else if(eleg==0){
    if(aleatorio == 2){
      document.getElementById("mensaje").innerHTML = "<b>HAS GANADO</b>";
      ganadas++;
      document.getElementById("wins").innerHTML = "<b>Ganadas:</b> "+ganadas+"   <b>Perdidas:</b> "+perdidas;
    } else {
      document.getElementById("mensaje").innerHTML = "<b>HAS PERDIDO</b>";
      perdidas++;
      document.getElementById("wins").innerHTML = "Ganadas: "+ganadas+"   Perdidas: "+perdidas;
    }

  } else if(eleg==1){
    if(aleatorio == 0){
      document.getElementById("mensaje").innerHTML = "<b>HAS GANADO</b>";
      ganadas++;
      document.getElementById("wins").innerHTML = "<b>Ganadas:</b> "+ganadas+"   <b>Perdidas:</b> "+perdidas;
    } else {
      document.getElementById("mensaje").innerHTML = "<b>HAS PERDIDO</b>";
      perdidas++;
      document.getElementById("wins").innerHTML = "Ganadas: "+ganadas+"   Perdidas: "+perdidas;
    }

  } else if(eleg==2){
    if(aleatorio == 1){
      document.getElementById("mensaje").innerHTML = "<b>HAS GANADO</b>";
      ganadas++;
      document.getElementById("wins").innerHTML = "<b>Ganadas:</b> "+ganadas+"   <b>Perdidas:</b> "+perdidas;
    } else {
      document.getElementById("mensaje").innerHTML = "<b>HAS PERDIDO</b>";
      perdidas++;
      document.getElementById("wins").innerHTML = "Ganadas: "+ganadas+"   Perdidas: "+perdidas;
    }
  }
}
