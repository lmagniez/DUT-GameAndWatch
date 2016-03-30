

// au chargement de la page
// association des méthodes aux évènements :
// onKeyDown = à l'appui de la touche
// onKeyUp = au relèvement de la touche
window.onkeydown = onKeyDown;
window.onkeyup = onKeyUp;




function gameLoop () {

    launchBG();
    
    //Appuyer sur espace pour commencer la partie
    if(readyToStart&&SAUT){
        jeu=true;
        mario.setPos(0);
        dk.setPos(0);
        readyToStart=false;
        
        SAUT=false;
        ALLER_BAS=false;
        ALLER_DROITE=false;
        ALLER_GAUCHE=false
        ALLER_HAUT=false;
        
        plateforme=[];
        GenererPlateforme(0);    
    }



    window.requestAnimationFrame(gameLoop);
    // Clear the canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);


    //Si il y a au moins 1 barrel, on update et render
    if(cptBarrel>=1){
        if(jeu)
            for (i = 0; i < barrels.length; i += 1) {
                barrels[i].update()
            }

        for (i = 0; i < barrels.length; i += 1) {
            barrels[i].render();
        }
    }

    //Render (pas de update)
    for(i=0;i<plateforme.length;i+=1)
        plateforme[i].render();
    for(i=0;i<vieDK.length;i+=1)
        vieDK[i].render();
    for(i=0;i<vie.length;i+=1)
        vie[i].render();
    
    //update score
    for(i=0;i<chiffres.length;i+=1){
        chiffres[i].update();
        chiffres[i].render();
    }
    
    
    

    //UPDATE
    if(jeu)
    {
        mario.update();
        dk.update();
        update();
        if(obstacle.getPos()<5)
            obstacle.update();
        bouton.update();
        grue.update();
        crochet.update();
    }
    
    //Update render des boutons et pad
    button.update();
    button.render();
    pad.update();
    pad.render();

    //RENDER
    mario.render();
    dk.render();
    mains.render();
    if(obstacle.getPos()<5)
        obstacle.render();
    bouton.render();
    grue.render();
    crochet.render();


}


//CANVAS DES SPRITES
canvas = document.getElementById("sprites");
canvas.width = 258;
canvas.height = 393+DECALAGE;
canvas.style.zIndex = 2;
canvas.style.position = "absolute";

//CANVAS DU BACKGROUND
canvas2 = document.getElementById("background"); 
canvas2.width = 258;
canvas2.height = 393+DECALAGE;
canvas2.style.zIndex = 1;
canvas2.style.position = "absolute";

//CANVAS DU PAD
canvas3 = document.getElementById("pad"); 
canvas3.width = 126;
canvas3.height = 126;
canvas3.style.zIndex = 1;
canvas3.style.position = "absolute";

//CANVAS DU BOUTON
canvas4 = document.getElementById("button"); 
canvas4.width = 75;
canvas4.height = 75;
canvas4.style.zIndex = 1;
canvas4.style.position = "absolute";

context= canvas2.getContext("2d");
contextPad=canvas3.getContext("2d");
contextButton=canvas4.getContext("2d");


//generer le background
launchBG=function(){

    image=new Image();
    image.src="img/background.png";
    context.drawImage(
        image,
        0,
        0,
        258,
        393+DECALAGE,
        0,
        0,
        258,
        393+DECALAGE
    );

}


var clock=0;//clock des barrels
var clock2=0;//clock des obstacles

//Update pour l'apparition de barrel/obstacle
update = function () {
    clock+= 1;
    clock2+=1;
    if (clock > 400) {
        clock=0;
        GenererBarrel(dk.getPos());
    }
    if(clock2 > 700) {
        clock2=0;
        GenererObstacle();
    }
}

//GENERATION DES OBJETS (execute 1 fois)
GenererDK(1);
GenererMario(0);
GenererObstacle();
GenererBouton();
GenererGrue();
GenererCrochet();
GenererPlateforme(0);


GenererVie(3);
GenererVie(2);
GenererVie(1);
GenererVie(0);

GenererScore(0);
GenererScore(1);
GenererScore(2);
GenererScore(3);

GenererVieM(2);
GenererVieM(1);
GenererVieM(0);

GenererButton();
GenererPad();


launchBG();
gameLoop();