//Variables

const boton = document.querySelector(".boton")
const tweets = document.querySelector("#tweets")
const form = document.querySelector("form")

let arrayTweets = []

//Eventos
boton.addEventListener("click", agregarTweet)

document.addEventListener("DOMContentLoaded", () => {
    arrayTweets = JSON.parse(localStorage.getItem("arrayTweets")) || []
    crearHtml()
})

//Funciones
function agregarTweet(e){
    e.preventDefault()

    const texto = document.querySelector(".textArea").value

    if(texto.trim() == ""){
        const contenedorBoton = document.querySelector(".contenedorBoton")
        const error = document.createElement("p")
        error.classList.add("error")
        error.textContent= "No se puede ingresar un tweet vacío"
        contenedorBoton.appendChild(error)
        setTimeout(() => {
            contenedorBoton.removeChild(contenedorBoton.lastChild)
        }, 3000);
        return
    }

    const historial = {
        id:Date.now(),
        texto
    }

    arrayTweets = [...arrayTweets, historial]
    crearHtml()
    form.submit()
}

function crearHtml(){
    limpiaHtml()
    if(arrayTweets.length > 0){
        arrayTweets.forEach(element => {
            const botonEliminar = document.createElement("a")
            botonEliminar.classList.add("botonEliminar")
            botonEliminar.textContent = "Eliminar"

            // botonEliminar.addEventListener("click",borrarTweet)

            botonEliminar.onclick = () => {
                borrarTweet(element.id)
            }

            const li = document.createElement("li")

            li.textContent = element.texto
            li.appendChild(botonEliminar)

            tweets.appendChild(li)

        });
    }
    guardarEnStorage("arrayTweets", arrayTweets)
}

function borrarTweet(id){
    arrayTweets = arrayTweets.filter(elemtent => elemtent.id !== id)
    crearHtml()
}

//Limpio el html
function limpiaHtml(){
    while(tweets.firstChild){
        tweets.removeChild(tweets.firstChild)
    }
}

//Local Storage
function guardarEnStorage(llave, valor){
    localStorage.setItem(llave,JSON.stringify(valor))
}