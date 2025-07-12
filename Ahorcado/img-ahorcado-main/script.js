const botonempezar = document.getElementById("botoniniciar");
const contenedorletra = document.getElementById("contenedorletra");
const letraingresada = document.getElementById("inputletra");
const imgahorcado = document.getElementById("imgahorcado");

const inicializarJuego = () => {
    const palabrasadivinar = ["numerar", "contar", "restar", "multiplicar"]
    const palabraSeleccionada = palabrasadivinar[Math.floor(Math.random() * palabrasadivinar.length)];


let palabraOculta= palabraSeleccionada.split("")
let letrasAdivinadas= palabraOculta.map(()=> "_")
let intentosRestantes = 6
let letrasIncorrectas = []

const objetodeljuego = {
    palabraOculta: palabraOculta,
    letrasAdivinadas: letrasAdivinadas,
    intentosRestantes: intentosRestantes,
    letrasIncorrectas: letrasIncorrectas
}

return objetodeljuego
}

const actualizarimgahorcado= (errores)=> {
    const rutaImagenes ={
        5: "02.jpeg",
        4: "03.jpeg",
        3: "04.jpeg",   
        2: "05.jpeg",
        1: "06.jpeg"
    }

    if(rutaImagenes.hasOwnProperty(errores)){
        imgahorcado.src = `./imagenes/${rutaImagenes[errores]}`
    } else {
        console.error("Numero de errores no valido: ", errores)
    }
}

const actualizarjuego = (juego) =>{
    document.getElementById("pAdivinar").innerHTML = `palabra: ${juego.letrasAdivinadas.join(" ")}`
    document.getElementById("nIntentos").innerHTML = `Intentos restantes: ${juego.intentosRestantes.join}`
    document.getElementById("errores").innerHTML = `Letras Incorrectas: ${juego.letrasIncorrectas.join(", ")}`
    imgahorcado(juego.intentosRestantes)
}

const adivinarLetra = (juego, letra) =>{
    letra = letra.toLowerCase()

    if(juego.palabraOculta.includes(letra)){
        for(let i= 0; i <juego.palabraOculta.length; i++){
        if  (juego.palabraOculta[i]=== letra){
            juego.letrasAdivinadas[i]= letra 
            document.getElementById("inputLetra").value=""
        }
    }
    letraingresada.value = "";
} else {
    juego.intentosRestantes--;
    juego.letrasIncorrectas.push(letra);
    imgahorcado(juego.intentosRestantes);
    document.getElementById("inputLetra").value="";
}

    if(juego.intentosRestantes ==0){
        alert("Perdiste, el personaje esta completamente ahorcado")
        alert(`La palabra correcta era: ${juego.palabraOculta.join("")}`);
    
} else if (!juego.letrasAdivinadas.includes("_")) {
    alert("¡Ganaste! Adivinaste la palabra completa.");
}

    actualizarinterfaz(juego);
};

const teclapresionada = (event) => {
    if (EventCounts.key == "Enter") {
        const letraingresada = letraingresada.value.toLowerCase();
        if (letraingresada === null || letraingresada ==="") {
            alert("Por favor ingresa una letra valida");
            return;
    }

    if (letraingresada.lenght !==1 || (!/a-zA-Z/).test(letraingresada)) {
        alert("Por favor ingrese una sola letra.");
        return;
    }

    adivinarLetra(juego, letraingresada);
    letraingresada.value = "";


}
};

function empezar(){
    botoniniciarstyle.display= "none";
    contenedorletra.display = "block";
    imgahorcado.style.display = "block";
    juego = inicializarJuego();

    letraingresada.addEventListener("keypress", teclapresionada)
}

botoniniciar.addEventListener("click", empezar);
