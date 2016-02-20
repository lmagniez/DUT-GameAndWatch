// au chargement de la page
// association des méthodes aux évènements :
// onKeyDown = à l'appui de la touche
// onKeyUp = au relèvement de la touche
window.onkeydown = onKeyDown;
window.onkeyup = onKeyUp;




function gameLoop () {



    window.requestAnimationFrame(gameLoop);

    // Clear the canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);


    if(cptBarrel>1){
        for (i = 0; i < barrels.length; i += 1) {

            barrels[i].update()
        }
        
        for (i = 0; i < barrels.length; i += 1) {
            barrels[i].render();
        }
    }
    
    mario.update();
    mario.render();
    dk.update();
    dk.render();
    mains.render();
    update();
    
}


//Get canvas
canvas = document.getElementById("sprites");
canvas.width = 258;
canvas.height = 393;
canvas.style.zIndex = 2;
canvas.style.position = "absolute";

canvas2 = document.getElementById("background"); 
canvas2.width = 258;
canvas2.height = 393;
canvas2.style.zIndex = 1;
canvas2.style.position = "absolute";


123, 198, 255


context= canvas2.getContext("2d");
context.globalAlpha=0.9;
//context.shadowOffsetX = 5;
//context.shadowOffsetY = 5;
//context.shadowBlur = 4;
context.shadowColor = 'rgba(123, 198, 255, 0.8)';
context.fillStyle = 'rgba(123, 198, 255, 0.8)';
context.fillRect(0, 0, 255, 384);


image=new Image();
image.src="img/background.png";
context.drawImage(
            image,
            0,
            0,
            258,
            393,
            0,
            0,
            258,
            393);




var clock=0;
update = function () {
    clock+= 1;
    if (clock > 200) {
        
        clock=0;
        GenererBarrel(posDK);
        
    }
}
//GenererBarrel(1);


GenererDK(1);
GenererMario(0);

gameLoop();