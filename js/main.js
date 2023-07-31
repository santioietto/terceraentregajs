
// Creo nuevo array vacio para utilizarlo como base de datos del login
let usuario = new Array();
usuario.push(new Logearte("Santi", "santi111", "s@gmail.com"));
usuario.push(new Logearte("Agus", "agus222", "agus@gmail.com"));
usuario.push(new Logearte("Octi", "octi333", "octim@gmail.com"));

// // Creo array vacio para utulizarlo como carrito
let carrito = new Array();

// Creo array vacio y pusheo los datos de los productos en stock
let stock = new Array();
stock.push(new Stock(stock.length + 1, "Semillas ", 5000, "https://agroverdad.com.ar/wp-content/uploads/2022/07/ley-de-semillas-ultimo-debate.jpg"));
stock.push(new Stock(stock.length + 1, "Insecticidas ", 6000, "https://argentina.agrofystatic.com/media/catalog/product/cache/1/image/850x600/0dc2d03fe217f8c83829496872af24a0/i/n/insecticida-m-i-r-agrofy-0-20210902152444.jpg?usewebp=true"));
stock.push(new Stock(stock.length + 1, "Herbicida ", 5000, "https://www.argentinaforestal.com/wp-content/uploads/2023/06/Agrosustentable-Bioinsumos-680x450.jpg?x52833"));
stock.push(new Stock(stock.length + 1, "Deposito ", 4000, "https://www.folhadecandelaria.com.br/arquivos/noticias/full/aeb81fa85e48851dcb6f32bb827e4c2702032018150836.JPG"));
stock.push(new Stock(stock.length + 1, "Tratamiento ", 2000, "https://i0.wp.com/www.hablemosdelcampo.com/wp-content/uploads/2019/06/40814080_l.jpg?resize=1024%2C683&ssl=1"));




// Selecciono el boton de ingresar y le agrego un evento
let ingresar = document.querySelector("#Ingresar")
ingresar.addEventListener("click", (e) => {
    e.preventDefault();
    let divuser = document.querySelector("#divuser")
    divuser.innerHTML = "";
    let borrar = document.getElementById("mostrarprod")
    borrar.innerHTML = "";
    let vacio = document.getElementById("vacio")
    vacio.innerHTML = "";
    carrito = []

    ingreso();
})


// Validacion de ingreso al carrito, si ingreso muestra todo los productos y puede empezar a comprar
function ingreso() {
    let user1 = document.getElementById("User").value;
    let pass1 = document.getElementById("Pass").value;
    if (user1.trim() === "" || pass1.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingresaste usuario o contraseña erroneo!',
            color: "#FFFFFF"
        })
        return false;
    }
    for (let i = 0; i < usuario.length; i++) {
        if (user1 == usuario[i].user && pass1 == usuario[i].pass) {
            
            msjprincipal();
            chau();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Bienvenido',
                showConfirmButton: false,
                timer: 2000,
                
            })


            let divuser = document.querySelector("#divuser")
            let user1 = document.createElement("h2")
            user1.innerHTML = `Realiza tu compra ${usuario[i].user}`
            divuser.appendChild(user1)
            

            mostrarProductos();

            mostrarBotonesCarrito();
            agregarProducto();
            eliminarProducto();
            comprarProducto();
            elementospendientes();
            return true;

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingresaste usuario o contraseña erroneo!',
                color: "#FFFFFF"
            })
        }


    }
    
    return false;
}



// Llamo al boton agregar y le asigno eventos para agregar productos al carrito
function agregarProducto() {
    let agregar = document.querySelector("#agregprod")
    agregar.addEventListener("click", () => {

        let respuesta = document.querySelector("#prod").value
        if (isNaN(respuesta)) {
            Swal.fire('Codigo invalido, ingresa un numero')
            return;
        }
        if (respuesta > stock.length) {
            Swal.fire('El codigo ingresado no existe')
        } else {

            let buscar = stock.find(e => e.id == respuesta)
            carrito.push(buscar)
            recorrer();
            storage();
        }

    })
}


// elimnar producto lo cree para llamar al boton eliminar y asignarle un evento de eliminar, recorrer y storagr
function eliminarProducto() {
    let eliminar = document.querySelector("#elimprod")
    eliminar.addEventListener("click", () => {
        eliminar1();
        recorrer();
        storage();
    })
}

// en la funcion comprarProducto realizo el evento de comprar
function comprarProducto() {
    let comprar = document.querySelector("#compprod")
    comprar.addEventListener("click", () => {
        realizarcompra();
        storage();
        let vacio = document.getElementById("vacio")
        vacio.innerHTML = "";
    })
}



// mostrar productos a traves de la creacion de una etiqueta li con todos los datos de productos, en un div vacio
function mostrarProductos() {
    const mostrarprod = document.querySelector("#mostrarprod")
    stock.forEach(e => {
        let li = document.createElement("li")
        li.innerHTML = `<li>${e.id}- ${e.producto} $${e.precio}</li>
                        <img src="${e.img}">`
        mostrarprod.appendChild(li)

    });
}

// creo los botones desde DOM para agregarlos una vez que ingresa el usuario
function mostrarBotonesCarrito() {
    let botonesCarrito = document.getElementById("inicio")
    botonesCarrito.innerHTML = `<input type="text" placeholder="Ingresa el codigo del prod" id="prod">
                                <button id="agregprod">Agregar</button>
                                <button id="elimprod">Eliminar</button>
                                <button id="compprod">Comprar</button>                              
                                `
}

// funcion eliminar realiza las validaciones de eliminar, despues lo llamo en eliminarProducto
function eliminar1() {
    let respuesta = document.querySelector("#prod").value
    let devolucion = false;
    if (carrito.length == 0) {
        Swal.fire('El carrito esta vacio, agrega productos para eliminar')
        return;
    }

    if (isNaN(respuesta)) {
        Swal.fire('Codigo invalido, ingresa un numero')
        return;
    }
    // Realizo un for donde utilizo el metodo splice para que elimine el producto que seleccione
    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].id == respuesta) {
            carrito.splice(i, 1)

            devolucion = true
            i = carrito.length + 1;

        } else {
            devolucion = false;
        }
    }
    //valido la variable en falso para que me muestre que el codigo ingresado no existe
    if (!devolucion) {

        Swal.fire('El codigo que quieres eliminar no esta agregado al carrito')

    }
}

// recorrer eliminar los hijos del div, recorre el carrito y si hay algo, crea un nuevo div con la info de los productos
function recorrer() {
    let vacio = document.getElementById("vacio")
    while (vacio.firstChild) {
        vacio.removeChild(vacio.firstChild)
    }
    carrito.forEach(e => {
        let vacio = document.getElementById("vacio")
        let vacio1 = document.createElement("div")
        vacio1.classList = "inicio"
        vacio1.innerHTML = `${e.producto} $${e.precio}`
        vacio.appendChild(vacio1)
    })
}

// realizar compra acumula el precio para mostrarlo a traves de sweet alert y vaciar el carrito
function realizarcompra() {
    let acumular = 0;
    if (!carrito.length == 0) {
        carrito.filter(e => { acumular += e.precio });

        let total = `Compraste por un monto de ${acumular} \n Muchas Gracias!`
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: total,
            showConfirmButton: false,
            timer: 2000
        })

        carrito = []
    } else {
        Swal.fire('El carrito esta vacio, agrega productos para comprar')
    }

}

// funcion para eliminar el h2 de html
function msjprincipal(){
    let msj = document.querySelector("#msj")
    msj.innerHTML = ""
}

// funcion para eliminar el input del login y el boton
function chau(){
    let chau = document.querySelector("#chau")
    chau.innerHTML = ""
}


// funcion del localStorage
function storage(){
    localStorage.clear("carrito")
    let cambiar = JSON.stringify(carrito)
    localStorage.setItem("carrito", cambiar)
}


// funcion que trae el string de localStorage y lo convierto en objeto para trabajar con el si el carrito quedo pendiente de compra
function elementospendientes(){
    let volver = localStorage.getItem("carrito")
    volver = JSON.parse(volver)
    if (volver.length){
        Swal.fire({
            title: 'Compra pendiente',
            text: "Quiere recuperar el carrito?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Recuperar',
            color: "#FFFFFF"
          }).then((result) => {
            if (result.isConfirmed) {
            volver.forEach(e=> carrito.push(e))
            recorrer();
            }else{
                volver = []
                localStorage.clear();
            }
          })
    }
}