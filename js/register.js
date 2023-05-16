const user = document.getElementById("user")
const email = document.getElementById("email")
const pass = document.getElementById("pass")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")


form.addEventListener("submit", e=>{
    e.preventDefault() 
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    parrafo.innerHTML = ""
    if(user.value.length <6){
        warnings += `Nombre de usuario invalido <br>`
        entrar = true
    }
      
    if(!regexEmail.test(email.value)){
        warnings += `Email invalido <br>`
        entrar = true
    }
   

    if(pass.value.length <=8){
        warnings += `Contraseña invalida <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }
    
    if(user.value.length >6 && regexEmail.test(email.value) && pass.value.length >=8){
        alert
        entrar = true
        window.location = "/Views/login.html"
    }
    
})