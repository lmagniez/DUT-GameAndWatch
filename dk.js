var dk;
var mains;

var dkX=[42,89,129];
var dkY=[44,44,45];
var dkL=[33,29,35];
var dkH=[30,31,31];

var mainX=[30,66,80,113,123,159];
var mainY=[56,52,54,54,50,57];
var mainL=[15,14,12,12,15,14];
var mainH=[14,12,13,13,10,13];

var posDK;


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
                mainX[2*posDK],
                mainY[2*posDK],
                mainL[2*posDK],
                mainH[2*posDK],
                mainX[2*posDK],
                mainY[2*posDK],
                mainL[2*posDK],
                mainH[2*posDK]);

            that.context.drawImage(
                that.image,
                mainX[2*posDK+1],
                mainY[2*posDK+1],
                mainL[2*posDK+1],
                mainH[2*posDK+1],
                mainX[2*posDK+1],
                mainY[2*posDK+1],
                mainL[2*posDK+1],
                mainH[2*posDK+1]);
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


