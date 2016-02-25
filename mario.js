
var collision=false;

var CODE_TOUCHE_BAS = 40;
var CODE_TOUCHE_DROITE = 39;
var CODE_TOUCHE_HAUT = 38;
var CODE_TOUCHE_GAUCHE = 37;

var CODE_BARRE_ESPACE = 32;
var ALLER_BAS = false;
var ALLER_HAUT = false;
var ALLER_GAUCHE = false;
var ALLER_DROITE = false;
var SAUT = false;
var tickSaut=50;
var position_pred=-1;


//si tab[posMario]=posBarrel -> collision

var collisionBarrel=[29,28,27,26,25,23,22,21,20,19,-1,16,2,6,10]; 
//si tab[posObstacle]=posMario -> collision
var collisionObstacle=[-1,23,24,-1,10];

var requestAnimId;

var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
        || window[vendors[x] + 'CancelRequestAnimationFrame'];
}  



var onKeyDown = function(event) {
    if ( event.keyCode == CODE_TOUCHE_DROITE ) {
        ALLER_DROITE = true;
        ALLER_DROITE = true;
    } else if ( event.keyCode == CODE_TOUCHE_GAUCHE ) {
        ALLER_GAUCHE = true;
    } 
    else if ( event.keyCode == CODE_TOUCHE_BAS ) {
        ALLER_BAS = true;
    } 
    else if ( event.keyCode == CODE_TOUCHE_HAUT ) {
        ALLER_HAUT = true;
    }
    else if ( event.keyCode == CODE_BARRE_ESPACE ) {
        SAUT = true;
    }
}

var onKeyUp = function(event) {

    if ( event.keyCode == CODE_TOUCHE_BAS ) {
        ALLER_BAS = false;
    } else if ( event.keyCode == CODE_TOUCHE_HAUT ) {
        ALLER_HAUT = false;
    }
}


////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////


var mario;

var marioX=[25,69,106,146,181,//palier 1
            178,146,106,67,26,26,//palier 2
            23,33,90,130,//palier 3
            177,194,//chute
            158,191,196,222,//grue
            27,145,146,107];//saut
var marioY=[309,305,302,299,294,
            246,242,240,234,233,210,
            158,118,120,117,
            131,161,
            95,115,50,159,
            285,275,219,216]
var marioL=[22,22,21,20,24,
            25,19,22,21,23,25,
            24,29,28,26,
            25,28,
            27,29,33,23,
            23,23,22,21];
var marioH=[24,24,24,24,26,
            24,25,24,26,24,25,
            26,26,22,26,
            24,29,
            34,24,31,26,
            22,23,23,22];




function spriteMario (options) {

    var that = {},
        frameIndex = parseInt(Math.random() * 5 + 1),
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1,
        positionMario=options.positionMario
    //cptUpdate=0,//nb de deplacement depuis le debut
    //0, 1 ou 2
    ;


    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;

    that.getPos= function(){
        return positionMario;
    };


    //UPDATE THE SPRITE
    that.update = function () {

        console.log(positionMario);

        if(collision)
            positionMario=-1;

        tickSaut += 1;
        tickCount += 1;

        //TEST DE COLLISION
        if(collisionObstacle[obstacle.getPos()]==mario.getPos())
            collision=true;

        if(tickSaut >= 50){

            if(position_pred!=-1){
                positionMario=position_pred;
                position_pred=-1;
                ALLER_BAS=false;
                ALLER_DROITE=false;
                ALLER_GAUCHE=false;
                ALLER_HAUT=false;
                SAUT=false;
            }

            if (tickCount > ticksPerFrame) {

                tickCount = 0;



                if(ALLER_DROITE){
                    ALLER_DROITE=false;


                    //if(positionMario>14)
                    //    positionMario=positionMario+1;

                    if(positionMario>=0&&positionMario<=3
                       ||(positionMario>=12&&positionMario<=14)){

                        testCollision(positionMario);
                        positionMario=positionMario+1;


                    }
                    else if(positionMario>=6&&positionMario<=9){
                        testCollision(positionMario-1);
                        positionMario=positionMario-1;
                    }


                    if(positionMario==15)
                        setTimeout(function(){
                            positionMario=16;
                        }, 500);



                }
                else if(ALLER_GAUCHE){
                    ALLER_GAUCHE=false;
                    if(positionMario>=1&&positionMario<=4||
                       (positionMario>=13&&positionMario<=14)){
                        testCollision(positionMario-1);
                        positionMario=positionMario-1;
                    }
                    else if(positionMario>=5&&positionMario<=8){
                        testCollision(positionMario);
                        positionMario=positionMario+1;
                    }

                    if(positionMario===12){
                        bouton.activer();
                    }





                }
                else if(ALLER_HAUT){
                    ALLER_HAUT=false;
                    if(positionMario==4||(positionMario>=9&&positionMario<=11))
                        positionMario=positionMario+1;
                }

                else if(ALLER_BAS){
                    ALLER_BAS=false;
                    if(positionMario==5||(positionMario>=10&&positionMario<=12)){
                        testCollision(positionMario-1);
                        positionMario=positionMario-1;
                    }

                }

                else if(SAUT){
                    SAUT=false;
                    if(positionMario==0){
                        position_pred=0;
                        positionMario=21;
                        tickSaut=0;    
                    }
                    else if(positionMario==3){
                        position_pred=3;
                        positionMario=22;
                        tickSaut=0;
                    }
                    else if(positionMario==6){
                        position_pred=6
                        positionMario=23;
                        tickSaut=0;
                    }
                    else if(positionMario==7){
                        position_pred=7;
                        positionMario=24;
                        tickSaut=0;
                    }
                    else if(positionMario==14){
                        //recuperer crochet
                        positionMario=positionMario+3;
                        
                        //ANIMATION RECUPERATION
                        if(crochet.getPos()===0){

                            bouton.desactiver();

                            //positionMario=19;
                            crochet.setAnimationON();
                            grue.setAnimationON();


                            setTimeout(function(){
                                positionMario=18;
                                grue.setPos(1);
                                crochet.setPos(2);

                                setTimeout(function(){
                                    positionMario=19;
                                    grue.setPos(2);
                                    crochet.setPos(-1);
                                    setTimeout(function(){
                                        grue.setPos(0);
                                        positionMario=20;
                                        setTimeout(function(){
                                            crochet.setAnimationOFF();
                                            grue.setAnimationOFF();
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);




                        }
                        //ANIMATION CHUTE
                        else{
                            setTimeout(function(){
                                positionMario=15;
                                setTimeout(function(){
                                    positionMario=16;
                                }, 500);
                            }, 500);
                        }

                    }

                }

            }
        }
    }; 



    //RENDER THE SPRITE
    that.render = function () {
        // Draw the animation
        that.context.drawImage(
            that.image,
            marioX[positionMario],
            marioY[positionMario],
            marioL[positionMario],
            marioH[positionMario],
            marioX[positionMario],
            marioY[positionMario],
            marioL[positionMario],
            marioH[positionMario]);
    };   

    return that;


}


function testCollision(pos){
    for (i = 0; i < barrels.length; i += 1) {

        if(collisionBarrel[pos]==barrels[i].getPos()){
            //positionMario=-1;
            collision=true;
        }
    }
};

//0 1 2 en fonction position dk
function GenererMario(position){

    var marioImg    
    marioImg = new Image();

    mario = spriteMario({
        context: canvas.getContext("2d"),
        image: marioImg,
        ticksPerFrame: 1,
        positionMario: position,
    });



    // Start the game loop as soon as the sprite sheet is loaded

    marioImg.src = "img/sprites/mario.png";

}


