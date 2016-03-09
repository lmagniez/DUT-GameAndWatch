
var collision=false;
var jeu = true;
var readyToStart = false;

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

var score=0;
var sauter=true;


//si tab[posMario]=posBarrel -> collision

var collisionBarrel=[29,28,27,26,25,23,22,21,20,19,-1,16,2,6,10]; 
//si tab[posObstacle]=posMario -> collision
var collisionObstacle=[-1,23,24,-1,10];




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
    that.setPos= function(pos){
        positionMario=pos;
    };


    //UPDATE THE SPRITE
    that.update = function () {

        console.log(score);

        tickSaut += 1;
        tickCount += 1;

        //TEST DE COLLISION
        if(collisionObstacle[obstacle.getPos()]==mario.getPos())
            animationDeath(positionMario);






        if(tickSaut >= 40){
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
                        animationChute();
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
                            animationGagne();
                        }
                        //ANIMATION CHUTE
                        else{
                            animationChute();
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
            animationDeath(mario.getPos());
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

    marioImg.src = "img/sprites/mario.png";

}

function animationDeath(position)
{

    death();
    setTimeout(function(){
        mario.setPos(-1);
        setTimeout(function(){
            mario.setPos(position);
            setTimeout(function(){
                mario.setPos(-1);
                setTimeout(function(){
                    mario.setPos(position);
                    setTimeout(function(){
                        mario.setPos(-1);
                        readyToStart=true;
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }, 500);
}

function animationChute()
{
    death();
    setTimeout(function(){
        mario.setPos(15);
        setTimeout(function(){
            mario.setPos(16);
            setTimeout(function(){
                mario.setPos(-1);
                setTimeout(function(){
                    mario.setPos(16);
                    setTimeout(function(){
                        mario.setPos(-1);
                        readyToStart=true;
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }, 500);   
}

function animationGagne()
{
    win();
    grue.setPos(2);
    setTimeout(function(){
        mario.setPos(18);
        grue.setPos(1);
        crochet.setPos(2);



        setTimeout(function(){
            mario.setPos(19);
            grue.setPos(2);
            crochet.setPos(-1);
            DetruireVie();
            for(i=1;i<=10;i++)
                setTimeout(function(){
                    score+=1;
                }, 150*i);
            setTimeout(function(){
                grue.setPos(0);
                mario.setPos(20);
                bouton.desactiver();

                if(vieDK.length===0)
                    animationDKChute();
                readyToStart=true;
            }, 1000);
        }, 1000);
    }, 1000);




}


function death(){
    jeu=false;
    barrels=[];
    tickSaut=50;
    
    
    DetruireVieM();
    if(vie.length==0)
    {
        score=0;
        GenererVieM(2);
        GenererVieM(1);
        GenererVieM(0);
    }
}

function win(){
    jeu=false;
    barrels=[];
}

