var dk;
var mains;

var dkX=[42,89,129,157];
var dkY=[44,44,45,150];
var dkL=[33,29,35,36];
var dkH=[30,31,31,42];

var mainX=[30,66,80,113,123,159];
var mainY=[56,52,54,54,50,57];
var mainL=[15,14,12,12,15,14];
var mainH=[14,12,13,13,10,13];


function spriteDK (options) {

    var that = {},
        frameIndex = parseInt(Math.random() * 5 + 1),
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1,
        positionDK=options.positionDK
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

    that.idBarrel=options.idBarrel;

    that.getPos= function(){
        return positionDK;
    };
    that.setPos= function(pos){
        positionDK=pos;
    };


    //UPDATE THE SPRITE
    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;
            if(!lancerBarrel){
                res = Math.random();


                if(res>0.5){//Gauche
                    if(positionDK!=0){
                        positionDK=positionDK-1;
                        posDK=positionDK;
                    }
                }
                else{//Droite
                    if(positionDK!=2){
                        positionDK=positionDK+1;
                        posDK=positionDK;
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
            dkX[positionDK],
            dkY[positionDK],
            dkL[positionDK],
            dkH[positionDK],
            dkX[positionDK],
            dkY[positionDK],
            dkL[positionDK],
            dkH[positionDK]);
    };   

    return that;


}

function spriteMain (options) {

    var that = {}
    ;


    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;


    //RENDER THE SPRITE
    that.render = function () {

        if(!lancerBarrel){
            // Draw the animation
            that.context.drawImage(
                that.image,
                mainX[2*dk.getPos()],
                mainY[2*dk.getPos()],
                mainL[2*dk.getPos()],
                mainH[2*dk.getPos()],
                mainX[2*dk.getPos()],
                mainY[2*dk.getPos()],
                mainL[2*dk.getPos()],
                mainH[2*dk.getPos()]);

            that.context.drawImage(
                that.image,
                mainX[2*dk.getPos()+1],
                mainY[2*dk.getPos()+1],
                mainL[2*dk.getPos()+1],
                mainH[2*dk.getPos()+1],
                mainX[2*dk.getPos()+1],
                mainY[2*dk.getPos()+1],
                mainL[2*dk.getPos()+1],
                mainH[2*dk.getPos()+1]);
        }
    };   

    return that;


}




//0 1 2 en fonction position dk
function GenererDK(position){

    var dkImg, mainImg;
    dkImg = new Image();
    mainImg = new Image();

    dk = spriteDK({
        context: canvas.getContext("2d"),
        image: dkImg,
        ticksPerFrame: 50,
        positionDK: position,
    });

    mains= spriteMain({
        context: canvas.getContext("2d"),
        image: mainImg
    }); 


    // Start the game loop as soon as the sprite sheet is loaded

    dkImg.src = "img/sprites/dk.png";
    mainImg.src = "img/sprites/barrel.png";

}

function animationDKChute()
{
    death();
    setTimeout(function(){
        dk.setPos(3);
        plateforme.splice(0,1);
        GenererPlateforme(1);
        GenererPlateforme(2);
        GenererPlateforme(3);
        setTimeout(function(){
            readyToStart=true;
        }, 1000);
        for(i=1;i<=10;i++)
            setTimeout(function(){
                score+=1;
            }, 150*i);

    }, 1000);

}


