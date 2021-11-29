function dibujarFlecha(x = 200) {
    var canvas = document.getElementById("canvas2");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      crearFlecha(ctx, x);
      ctx.fill();
      ctx.strokeRect(x, 5, 55, 60);
      ctx.strokeStill = "black";
    }
}

function crearFlecha(ctx, x){
    ctx.beginPath();
    ctx.moveTo(x+15,100);
    ctx.lineTo(x+40,100);
    ctx.lineTo(x+25,75);
    ctx.closePath();
}