function gameLoop () {



    window.requestAnimationFrame(gameLoop);

    // Clear the canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);


    if(cptBarrel>1){
        for (i = 0; i < barrels.length; i += 1) {

            if(!barrels[i].update())
                barrels[i].render();
        }
    }
}