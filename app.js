let numeroSecreto = 0;
let intentos = 0;
let maximosIntentos = 3;
let listaNumeroSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    // console.log(intentos)
    
    if(numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número secreto en ${intentos} ${intentos === 1 ? "intento" : "intentos"}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#intento').setAttribute('disabled','true');
    } else{
        // El usuario no acertó.
        if(numeroDeUsuario > numeroSecreto ){
            asignarTextoElemento('p',`El número secreto es menor, te ${maximosIntentos - intentos == 1 ?"queda":"quedan" } ${maximosIntentos - intentos} ${maximosIntentos - intentos == 1 ?"intento.":"intentos." }`);
        }else{
            asignarTextoElemento('p',`El número secreto es mayor, te ${maximosIntentos - intentos == 1 ?"queda":"quedan" } ${maximosIntentos - intentos} ${maximosIntentos - intentos == 1 ?"intento.":"intentos." }`);
        }
        if(intentos >= maximosIntentos){
            asignarTextoElemento('p',`Alacansaste el número máximo de intentos.`);
            document.querySelector('#intento').setAttribute('disabled','true');
            document.querySelector('#reiniciar').removeAttribute('disabled');
        }
        intentos++;
        limpiarCaja();
    
    }
    
    
    
    return;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    // console.log(numeroGenerado);
    // console.log(listaNumeroSorteados);
    // Si ya sorteamos todos los números
    if (listaNumeroSorteados.length  == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
        document.querySelector('#intento').setAttribute('disabled','true');
        document.querySelector('#reiniciar').setAttribute('disabled','true');
        document.querySelector('#valorUsuario').setAttribute('disabled','true');
    } else {
        // Si el número generado está incluido en la lista
        if (listaNumeroSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

    
}

function condicionesIniciales(){
    asignarTextoElemento('h1','El número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}. Tienes ${maximosIntentos} intentos`);
    intentos = 1;
    numeroSecreto = generarNumeroSecreto();
    console.log(numeroSecreto);
}

function limpiarCaja() {
    // let valorCaja = document.querySelector('#valorUsuario');
    // valorCaja.value = '';
    document.querySelector('#valorUsuario').value = '';
}

function reiniciarJuego() {
    // Limpiar la caja
    limpiarCaja();

    // Indicar mensaje de intervalos de números
    // Generar el número aleatorio
    // Inicializar el número de intentos
    document.getElementById('intento').removeAttribute('disabled');
    condicionesIniciales();
    // Desahilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();