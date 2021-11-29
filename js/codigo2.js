let verificar = document.getElementById("verificar");
let texto;
let posicion;

verificar.onclick = ()=>{ 
    posicion = 200;
    texto = document.getElementById("btnText-verificar").value;
    draw(texto);
    dibujarFlecha();
    let regExp = new RegExp("[abB ]+","g");
    regExp = regExp.exec(texto);
    document.getElementById("resultado").innerHTML = "";
    descolorear(myDiagram, true);
    try {
        if(texto == ""){
            pintarNodo(myDiagram.findNodeForKey(0));
        }else if(texto == regExp[0]){
            tiempo = document.getElementById("velocidad").value;
            verificarPalabra(texto, 0, 0, tiempo);
        }else{
            mostrarError();
        } 
    } catch (e) {
        if(e instanceof TypeError){ mostrarError(); }
    }
}

function verificarPalabra(texto, indice, numNodo, tiempo) {
    let nodo = myDiagram.findNodeForKey(numNodo);
    despintarNodo(nodo);
    window.setTimeout(function(){
        pintarNodo(nodo);
        window.setTimeout(function(){
            if(indice < texto.length){
                let aristas = nodo.findTreeChildrenLinks();
                let results = aristas.ub._dataArray.filter(function (arista) { return arista.data.text == texto.charAt(indice) && arista.fromNode == nodo;});   
                try {
                    if(results[0].data.text == texto.charAt(indice)){
                        pintarRecorrido(results[0]);
                        moverCinta(indice, results);
                        return verificarPalabra(texto, indice + 1, results[0].toNode.data.id, tiempo);
                    }
                } catch (error) {
                    if(error instanceof TypeError){
                        moverCinta(indice);
                        return verificarPalabra(texto, indice + 1, nodo.data.id, tiempo);
                    }
                }
            }else{ return volverInicio(tiempo);  }
        }, tiempo);
    }, tiempo/2)
}

function volverInicio(tiempo){
    if(posicion < 200){
        posicion += 55;
        window.setTimeout(()=>{
            draw(texto, posicion);
            return volverInicio(tiempo);
        }, tiempo);
    }
    return 0;
}

function moverCinta(indice, results = 0){
    if(results != 0){
        switch (results[0].toNode.data.id) {
            case 0:
                posicion += -55;
                draw(texto, posicion);         
                break;
            case 1:
                texto = texto.replaceAt(indice, "a");
                posicion += -55;
                draw(texto, posicion);         
                break;
            case 2:
                indice+= texto.length + 1;
                posicion += 55;
                draw(texto, posicion);
                break;    
            default:
                posicion += 55;
                draw(texto, posicion);         
                break;
        }
    }else{
        posicion += -55;
        draw(texto, posicion);
    }
}

function pintarRecorrido(arista){
    despintarNodo(arista.fromNode);
    pintarNodo(arista.toNode);
    pintarArista(arista, tiempo);
}

function pintarArista(arista, tiempo) {
    window.setTimeout(function(){ 
        arista.path.stroke = "#52ce60";
    },tiempo/2);
    window.setTimeout(function(){ 
        arista.path.stroke = "black";
    }, tiempo);
}

function pintarNodo(nodo) {
    var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
    shape.fill = "red"; //Cambiar el color a un nodo   
}

function despintarNodo(nodo) {
    var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
    shape.fill = "white"; //Cambiar el color a un nodo  
}

function descolorear(diagrama, limpiarTodo = false){
    if(limpiarTodo){
        despintarNodo(diagrama.findNodeForKey(0));
        despintarNodo(diagrama.findNodeForKey(1));
        despintarNodo(diagrama.findNodeForKey(2));
    }else{
        despintarNodo(diagrama.findNodeForKey(2));
    }
}

function mostrarError() {
    document.getElementById("resultado").innerHTML = "Hay simbolos que no pertenecen al lenguaje";
    document.getElementById("resultado").setAttribute("style", "color: rgb(173, 0, 0);");
    document.getElementById("resultado").setAttribute("key","errorLenguaje");
    idioma();
}

function idioma() {
    switch (document.getElementById("verificar").value) {
        case "Verificar":
            document.getElementById("Es").click();
            break;
        case "Check":
            document.getElementById("En").click();
            break;
        case "Chèque":
            document.getElementById("Fr").click();
            break;
        case "查看":
            document.getElementById("中国").click();
            break;
        case "prüfen":
            document.getElementById("De").click();
            break;
        case "Verifica":
            document.getElementById("Po").click();
            break;
    
        default:
            break;
    }
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}