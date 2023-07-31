class Stock{
    constructor (id, producto, precio, img){
        this.producto = producto;
        this.precio = precio;
        this.id = id;
        this.img = img
        // realice un mathround para redondear y un match ramdon que lo multiple por 100 por si en algun momento necesito el codigo exacto del producto que compro o elimino
        this.codigoproducto = Math.round(Math.random()*100);
    }


    datosproducto(){
        return "- " + this.id + " " + this.producto +  "$" + this.precio + "\n";
    }

    getPrecio(){
        return this.precio;
    }
}