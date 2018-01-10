var canvas = document.getElementById("juegoCanvas");
var contexto = canvas.getContext("2d");

var máquina = {
	saldo: 0,
	productos: ["BOCADILLO", "MANZANA", "CHOCOLATE", "AGUA", "CACAHUETES"],
	precios: [2, 1, 1, 0.5, 1.5],
	cantidades: [5, 6, 3, 6, 2],

	introducirMoneda: function (saldo){
		this.saldo += saldo;
		return alert("Se han añadido "+ saldo + " unidades monetarias. \n" +
				     		"Saldo actual: " + this.saldo + " unidades monetarias.")
	},

	seleccionarProducto: function (producto){

		//Buscamos el producto en la máquina expendedora
		for (i = 0; i < this.productos.length; i++){

			//Si lo encontramos...
			if (this.productos[i] == producto){

				//...comprobamos si hay productos disponibles
				if (this.cantidades[i] > 0) {

					// así como si nuestro saldo es suficiente para comprarlo
					if (this.saldo >= this.precios[i]) {

						//actualizamos el saldo y la cantidad del producto
						this.saldo -= this.precios[i];
						this.cantidades[i] -= 1;
						return alert("¡Compra realizada! \n" +
								     "Ha comprado el producto: " + this.productos[i] + ". \n" +
								     "Saldo actual: " + this.saldo + " unidades monetarias. \n" +
								     "Cantidad de producto restante: "  + this.cantidades[i] + " unidades físicas.")

					//...si no tenemos saldo suficiente
					} else {
						return alert("Saldo insuficiente, el precio del producto " + this.productos[i] + " es de " + this.precios[i] + " unidades monetarias.");
					}

				//...si no quedan existencias disponibles del producto
				} else {
					return alert("No quedan existencias del producto: "+ this.productos[i] + ".");
				}

			}
		}
		//...si no encontraoms el producto en la máquina
		return alert("No se ha encontrado el producto. La máquina no dispone de: "+ producto + ".");

	},

	devoluciónMoneda: function (){
		this.saldo = 0;
		return alert("Devolución realizada. \n" +
				     "Saldo actual: " + this.saldo + " unidades monetarias.")
	},

	añadirProducto: function (producto, precio, cantidad){

		var pos = this.productos.indexOf(producto);
		if (pos != -1){
			return alert("No se pudo añadir el producto. La máquina ya dispone del producto: "+ producto + ".");
		}

		this.productos.push(producto);
		this.precios.push(precio);
		this.cantidades.push(cantidad);
		return alert("¡Operación realizada! \n" +
					 "Ha añadido el producto: " + producto + ". \n" +
					 "Con un precio de: " + precio + " unidades monetarias. \n" +
					 "Y con una cantidad de : "  + cantidad + " unidades físicas.")
	},

	eliminarProducto: function (producto){
		var pos = this.productos.indexOf(producto);
		if(pos == -1) {
			return alert("No se ha encontrado el producto. La máquina no dispone de: "+ producto + ".");
		}
		this.productos.splice(pos, 1);
		this.precios.splice(pos, 1);
		this.cantidades.splice(pos, 1);
		return alert("¡Operación realizada! \n" +
					 "Se ha eliminado el producto: " + producto + ".")
	},

	cambiarPrecio: function (producto, precio){
		var pos = this.productos.indexOf(producto);
		if(pos == -1) {
			return alert("No se ha encontrado el producto. La máquina no dispone de: "+ producto + ".");
		}
		this.precios[pos] = precio;
		return alert("¡Operación realizada! \n" +
					 "Se ha actualizado el precio del producto a: " + precio + " unidades monetarias.")
	},

	cambiarCantidad: function (producto, cantidad){
		var pos = this.productos.indexOf(producto);
		if(pos == -1) {
			return alert("No se ha encontrado el producto. La máquina no dispone de: "+ producto + ".");
		}
		this.cantidades[pos] = cantidad;
		return alert("¡Operación realizada! \n" +
					 "Se ha actualizado la cantidad del producto a: " + cantidad + " unidades físicas.")
	}

}

function pulsarIntroducirMoneda(){
	var saldo =  parseFloat(prompt("Por favor, introduzca el saldo a añadir."));
	while (isNaN(saldo) || saldo < 0) {
		saldo =  parseFloat(prompt("Dato incorrecto, no ha introducido un número válido. Por favor, introduzca el saldo a añadir."));
	}
	máquina.introducirMoneda(saldo);
}

function pulsarSeleccionarProducto(){
	//toUpperCase() pasa toda la string a mayúsculas para realizar comparaciones no sensitivas de mayúsculas/minúsculas
	var producto = prompt("Por favor, indique el producto que desea comprar.");
	while(producto == ""){
		producto = prompt("Dato incorrecto. Por favor, indique el producto que desea comprar.");
	}
	máquina.seleccionarProducto(producto.toUpperCase());
}

function pulsarDevoluciónMoneda(){
	máquina.devoluciónMoneda();
}


function pulsarAñadirProducto(){
	var producto = prompt("Por favor, indique el producto que desea añadir.");
	while(producto == ""){
		producto = prompt("Dato incorrecto. Por favor, indique el producto que desea añadir.");
	}

	var precio = parseFloat(prompt("Por favor, indique el precio del producto que desea añadir."));
	while (isNaN(precio) || precio < 0) {
		precio =  parseFloat(prompt("Dato incorrecto, no ha introducido un número válido. Por favor, introduzca el precio del nuevo producto."));
	}

	var cantidad = parseInt(prompt("Por favor, indique la cantidad disponible del producto que desea añadir."));
	while (isNaN(cantidad) || cantidad < 0) {
		cantidad =  parseInt(prompt("Dato incorrecto, no ha introducido un número válido. Por favor, introduzca la cantidad disponible del nuevo producto."));
	}

	máquina.añadirProducto(producto.toUpperCase(), precio, cantidad);
}

function pulsarEliminarProducto(){
	var producto = prompt("Por favor, indique el producto que desea eliminar.");
	while(producto == ""){
		producto = prompt("Dato incorrecto. Por favor, indique el producto que desea eliminar.");
	}
	máquina.eliminarProducto(producto.toUpperCase());
}

function pulsarCambiarPrecio(){
	var producto = prompt("Por favor, indique el producto al que desea cambiar el precio.");
	while(producto == ""){
		producto = prompt("Dato incorrecto. Por favor, indique el producto al que desea cambiar el precio.");
	}

	var precio = parseFloat(prompt("Por favor, indique el nuevo precio del producto."));
	while (isNaN(precio) || precio < 0) {
		precio =  parseFloat(prompt("Dato incorrecto, no ha introducido un número válido. Por favor, introduzca el nuevo precio del producto."));
	}

	máquina.cambiarPrecio(producto.toUpperCase(), precio);
}

function pulsarCambiarCantidad(){
	var producto = prompt("Por favor, indique el producto al que desea cambiar la cantidad disponible.");
	while(producto == ""){
		producto = prompt("Dato incorrecto. Por favor, indique el producto al que desea cambiar la cantidad disponible.");
	}

	var cantidad = parseInt(prompt("Por favor, indique la cantidad disponible del producto que desea añadir."));
	while (isNaN(cantidad) || cantidad < 0) {
		cantidad =  parseInt(prompt("Dato incorrecto, no ha introducido un número válido. Por favor, introduzca la cantidad disponible del nuevo producto."));
	}

	máquina.cambiarCantidad(producto.toUpperCase(), cantidad);
}


function actualizarJuego(){
	contexto.rect(0, 0, canvas.width, canvas.height);
	contexto.fillStyle = "#ddeaff";
	contexto.fill();

	//HUD Saldo actual
	var moneda =  new Image();
	moneda.src = "moneda.png";
	contexto.drawImage(moneda,10,520);
	contexto.font = "18px Gravity";
	contexto.textAlign = "left";
	contexto.fillStyle = "black";
	contexto.fillText("Saldo actual: " + máquina.saldo + " unidades monetarias.", 80,560);

	//HUD Productos disponibles
	var x = 50;
	var y = 200;
	var ySpace = 30;

	for (i = 0; i < máquina.productos.length; i++) {
		contexto.fillText(máquina.productos[i] , x,y);
		contexto.fillText("Precio: " + máquina.precios[i] + " unidades monetarias.", x+200,y);
		contexto.fillText("Cantidad disponible: " + máquina.cantidades[i] + " unidades físicas.", x+550,y);
		y += ySpace;
	}

	//HUD Título
	contexto.font = "40px Gravity";
	contexto.textAlign = "center";
	contexto.fillText("MÁQUINA EXPENDEDORA DE COMIDA", 500,100);
}

var bucleDelJuego = setInterval(actualizarJuego, 40);
