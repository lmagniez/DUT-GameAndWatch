var DECALAGE = 161;//decalage entre les deux écrans

var collision=false;//collision
var jeu = true;//autorise update
var readyToStart = false;//demande appui sur espace (game.js)


//Barre
var CODE_TOUCHE_BAS = 40;
var CODE_TOUCHE_DROITE = 39;
var CODE_TOUCHE_HAUT = 38;
var CODE_TOUCHE_GAUCHE = 37;
var CODE_BARRE_ESPACE = 32;

//vrai si on doit aller à droite
var ALLER_BAS = false;
var ALLER_HAUT = false;
var ALLER_GAUCHE = false;
var ALLER_DROITE = false;

//vrai si on appui sur la touche
var TOUCHE_BAS = false;
var TOUCHE_HAUT = false;
var TOUCHE_GAUCHE= false;
var TOUCHE_DROITE = false;
var TOUCHE_SAUT = false;

//Utilise pour 2 joueurs
var CODE_TOUCHE_DROITE_DK = 90; //Z
var CODE_TOUCHE_GAUCHE_DK = 65; //A
var CODE_BARREL = 69; //E

var ALLER_GAUCHE_DK = false;
var ALLER_DROITE_DK = false;


//vrai quand va lancer barrel
var BARREL = false;

//vrai quand mario va sauter
var SAUT = false;

var DEPLACEMENT=true;//empeche répétition du déplacement quand maintient touche
var tickSaut=50;//nb de frame du saut
var position_pred=-1;//pour récupérer la position d'origine quand on saute

var score=0;
var sauter=true;


//si tab[posMario]=posBarrel -> collision
var collisionBarrel=[29,28,27,26,25,23,22,21,20,19,-1,16,2,6,10]; 
//si tab[posObstacle]=posMario -> collision
var collisionObstacle=[-1,23,24,-1,10];


//INITIALISATION DES SONS
var sonTouche = new Audio("./sounds/appuiTouche.ogg");
var sonCle = new Audio("./sounds/cle.ogg");
var sonFrame = new Audio("./sounds/frame.ogg");
var sonCollision = new Audio("./sounds/collision.ogg");
var sonRelacheTouche = new Audio("./sounds/relacheTouche.ogg");
var sonMario = new Audio("./sounds/saut.ogg");
var sonGameOver = new Audio("./sounds/gameOver.ogg");


//GESTION DES EVENENEMENTS CLAVIER
var onKeyDown = function(event) {
    if ( event.keyCode == CODE_TOUCHE_DROITE &&DEPLACEMENT ) {
        sonTouche.play();
        ALLER_DROITE = true;
        DEPLACEMENT=false;
        TOUCHE_DROITE = true;
    } else if ( event.keyCode == CODE_TOUCHE_GAUCHE &&DEPLACEMENT ) {
        sonTouche.play();
        ALLER_GAUCHE = true;
        DEPLACEMENT=false;
        TOUCHE_GAUCHE=true;
    } 
    else if ( event.keyCode == CODE_TOUCHE_BAS &&DEPLACEMENT) {
        sonTouche.play();
        ALLER_BAS = true;
        DEPLACEMENT=false;
        TOUCHE_BAS=true;
    } 
    else if ( event.keyCode == CODE_TOUCHE_HAUT &&DEPLACEMENT) {
        sonTouche.play();
        ALLER_HAUT = true;
        DEPLACEMENT=false;
        TOUCHE_HAUT=true;
    }
    else if ( event.keyCode == CODE_BARRE_ESPACE &&DEPLACEMENT ) {
        sonTouche.play();
        SAUT = true;
        DEPLACEMENT=false;
        TOUCHE_SAUT=true;
    }
    //DK 2 JOUEURS
    else if (event.keyCode == CODE_TOUCHE_DROITE_DK) {
        console.log("droite ok");
        sonTouche.play();
        ALLER_DROITE_DK = true;
    } else if ( event.keyCode == CODE_TOUCHE_GAUCHE_DK ) {
        console.log("gauche ok");
        sonTouche.play();
        ALLER_GAUCHE_DK = true;
    } 
    else if ( event.keyCode == CODE_BARREL ) {
        console.log("barrel ok");
        sonTouche.play();
        BARREL = true;
    }
}

var onKeyUp = function(event) {
    sonRelacheTouche.play();
    TOUCHE_BAS=false;
    TOUCHE_DROITE=false;
    TOUCHE_HAUT=false;
    TOUCHE_GAUCHE=false;
    TOUCHE_SAUT=false;
    DEPLACEMENT=true;
   
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
var marioY=[309+DECALAGE,305+DECALAGE,302+DECALAGE,299+DECALAGE,294+DECALAGE,
            246+DECALAGE,242+DECALAGE,240+DECALAGE,234+DECALAGE,233+DECALAGE,210+DECALAGE,
            158,118,120,117,
            131,161,
            95,115,50,159,
            285+DECALAGE,275+DECALAGE,219+DECALAGE,216+DECALAGE]
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





        //test si on saute
        if(tickSaut >= 40){
            
            //QUAND ON SAUTE, retourne case origine
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

                //DEPLACEMENT DE MARIO
                
                if(ALLER_DROITE){
                    ALLER_DROITE=false;

                    if(positionMario>=0&&positionMario<=3
                       ||(positionMario>=12&&positionMario<=14)){

                        testCollision(positionMario);
                        positionMario=positionMario+1;
                        sonMario.play();

                    }
                    else if(positionMario>=6&&positionMario<=9){
                        testCollision(positionMario-1);
                        positionMario=positionMario-1;
                        sonMario.play();
                        
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
                        sonMario.play();
                    }
                    else if(positionMario>=5&&positionMario<=8){
                        testCollision(positionMario);
                        positionMario=positionMario+1;
                        sonMario.play();
                    }
                    if(positionMario===12){
                        bouton.activer();
                        sonMario.play();
                    }
                }

                else if(ALLER_HAUT){
                    ALLER_HAUT=false;
                    if(positionMario==4||(positionMario>=9&&positionMario<=11)){
                        positionMario=positionMario+1;
                        sonMario.play();
                    }
                }

                else if(ALLER_BAS){
                    ALLER_BAS=false;
                    if(positionMario==5||(positionMario>=10&&positionMario<=12)){
                        testCollision(positionMario-1);
                        positionMario=positionMario-1;
                        sonMario.play();
                    }
                }

                else if(SAUT){
                    SAUT=false;
                    if(positionMario==0){
                        position_pred=0;
                        positionMario=21;
                        tickSaut=0;  
                        sonMario.play();
                    }
                    else if(positionMario==3){
                        position_pred=3;
                        positionMario=22;
                        tickSaut=0;
                        sonMario.play();
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
                        sonMario.play();
                    }
                    else if(positionMario==14){
                        //recuperer crochet
                        positionMario=positionMario+3;
                        sonMario.play();

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

//animation de mort de mario (clignote)
function animationDeath(position)
{

    sonCollision.play();
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
    sonCollision.play();
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

//animation victoire (attrape crochet)
function animationGagne()
{
    
    
    win();
    grue.setPos(2);
    setTimeout(function(){
        sonMario.play();
        mario.setPos(18);
        grue.setPos(1);
        crochet.setPos(2);



        setTimeout(function(){
            sonMario.play();
            mario.setPos(19);
            grue.setPos(2);
            crochet.setPos(-1);
            DetruireVie();
            sonCle.play();
            for(i=1;i<=10;i++)
                setTimeout(function(){
                    score+=1;
                }, 150*i);
            setTimeout(function(){
                sonMario.play();
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

//Perte d'une vie + fin de partie
function death(){
    jeu=false;
    lancerBarrel=false;
    barrels=[];
    tickSaut=50;
    
    
    DetruireVieM();
    if(vie.length==0)
    {
        setTimeout(function(){
            sonGameOver.play();
            pseudo=window.prompt("Votre pseudo");
            while(pseudo==''){ // Si l'utilisateur n'entre pas de pseudo
                pseudo=window.prompt("Vous avez bien un pseudo non ?")
            }
            if(pseudo!=null){ //Si l'utlisateur appuie sur annuler
                document.getElementById("score").value=score;
                document.getElementById("nom").value=pseudo;
                document.form.submit();
            }
            score=0;
            GenererVieM(2);
            GenererVieM(1);
            GenererVieM(0);
        },2000);
       
    }
}

function win(){
    jeu=false;
    lancerBarrel=false;
    barrels=[];
}


