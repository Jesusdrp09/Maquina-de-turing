function draw(texto, x = 200) {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(i = 0; i < texto.length; i++){
        ctx.strokeRect(x, 10, 55, 50);
        ctx.fillStyle = "rgba(0,0,0, 1)";
        ctx.font="bold 20px Verdana";
        ctx.fillText(texto.charAt(i),x + 20,40);
        ctx.strokeStill = "black";
        x += 55;
      }
    }
  }

