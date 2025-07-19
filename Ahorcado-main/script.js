const botoniniciar = document.getElementById('botoniniciar')
const contenedorLetra = document.getElementById('contenedorLetra');
const letraingresada = document.getElementById("inputLetra");
const imgahorcado= document.getElementById("imagenahorcado");

const inicializarJuego = () => {
    // Elegir una palabra aleatoria en una lista de palabras
    const palabrasadivinar = ["invadir", "numerar", "embolsar", "planetas"]
    const palabraaadivinar = palabrasadivinar[Math.floor(Math.random() * palabrasadivinar.length)];


    // Creando los objetos
    let palabraOculta = palabraaadivinar.split('');
    let letrasAdivinadas = palabraOculta.map(() => "_");
    let intentosRestantes = 6;
    let letrasIncorrectas = [];

    // Devuelve el objeto
    const objetodeljuego = {
        palabraOculta: palabraOculta,
        letrasAdivinadas: letrasAdivinadas,
        intentosRestantes: intentosRestantes,
        letrasIncorrectas: letrasIncorrectas,
    };
    return objetodeljuego;
};

// actualizar imagen segun numero de errores
const imgsahorcado = (errores) => {
    //con este objeto ruta imagenes declaro las rutas relativas de las imagenes segun su numero de errores
    const rutaImagenes = {
        5: "02.jpeg",
        4: "03.jpeg",
        3: "04.jpeg",
        2: "05.jpeg",
        1: "06.jpeg",
        0: "07.jpeg"
    };
    //traigo el elemento imagenahorcado del html para manipularlo
    const imagenAhorcado = document.getElementById("imagenahorcado");

    //verifica el numero de errores que se pasa como argumento es una propiedad del objeto rutaimagenes
    if (rutaImagenes.hasOwnProperty(errores)) {
        //reemplaza la imagen por la otra imagen segun el numero de errores
        imagenAhorcado.src = `./Ahorcado/img-ahorcado-main/imagenes/${rutaImagenes[errores]}`;
    } else {
        //si el numero no es valido en el rango determinado en rutaimagenes devuelve un error en la consola
        console.error("Número de errores no válido:", errores);
    }
};

//me muestra la interfaz en "tiempo real"
const actutualizarinterfaz=(juego)=>{
    document.getElementById('pAdivinar').innerHTML = `Palabra: ${juego.letrasAdivinadas.join(' ')}`;
    document.getElementById('nIntentos').innerHTML = `Intentos restantes: ${juego.intentosRestantes}`;
    document.getElementById('errores').innerHTML = `Letras incorrectas: ${juego.letrasIncorrectas.join(', ')}`;
    imgAhorcado(juego.intentosRestantes);
}

//logica para verificar si la letra esta dentro de la palabra seleccionada 
const adivinarLetra = (juego, letra) => {
    letra = letra.toLowerCase();

    //logica para verificar si la letra esta dentro de la palabra y si es asi reemplazar la letra en el campo en el que esta 
    if (juego.palabraOculta.includes(letra)) {
        for (let i = 0; i < juego.palabraOculta.length; i++) {
            if (juego.palabraOculta[i] === letra) {
                juego.letrasAdivinadas[i] = letra;
                document.getElementById("inputLetra").value= "";

            }
        }
        // si no se encuentra se resta un intento posible y cuando se resta se actualiza la imagen con la funcion "imgsahorcado"
        //que le pasamos el parametro intentos restantes
    } else {
        juego.intentosRestantes--;
        juego.letrasIncorrectas.push(letra);
        imgsahorcado(juego.intentosRestantes); 
        document.getElementById("inputLetra").value= "";

    }
    
    //verifica si el jugador perdio y de ser asi muestra una alerta de que perdio
    if (juego.intentosRestantes === 0) {
        alert("¡Perdiste! El personaje está completamente ahorcado.");
        alert(`La palabra correcta era: ${juego.palabraOculta.join('')}`);
        //si gano muestra una alerta que dice que gano
    } else if (!juego.letrasAdivinadas.includes("_")) {
        alert("¡Ganaste! Has adivinado la palabra correctamente.");
    }
    // actualiza la interfaz del juego con la funcion anteriormente declarada
    actutualizarinterfaz(juego);
};

const teclapresionada = (event) => {
    if (event.key === "Enter") {
        const letraIngresada = letraingresada.value.toLowerCase();
        //verifica si los valores de la letra ingresada son nulos o vacios
        if (letraIngresada === null || letraIngresada === "") {
            alert("Por favor ingresa una letra válida.");
            return;
        }
        //verifica que sea solo una letra y que sea una letra
        if (letraIngresada.length !== 1 || !(/[a-zA-Z]/).test(letraIngresada)) {
            alert("Por favor ingresa una sola letra.");
            return;
        }
        //ejercuta la funcion que verifica si la letra esta en la palara a adivinar
        adivinarLetra(juego, letraIngresada);
        letraingresada.value = "";
    }
};

function empezar() {
    //hace aparecer o oculta objetos del html
    botoniniciar.style.display = "none";
    contenedorLetra.style.display = "block";
    imgahorcado.style.display = "block";

    // Inicializar juego y asignar a la variable global
    juego = inicializarJuego();
    
    letraingresada.addEventListener('keypress', teclapresionada);
}

botoniniciar.addEventListener('click', empezar);
