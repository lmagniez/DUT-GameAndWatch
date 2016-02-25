var crochet;

var spriteCrochetX= [0,21,42,63,84] ;
var spriteCrochetY= [0,0,0,0,0] ;

var crochetX=[183,192,205,212,218] ;
var crochetY=[86,89,91,93,94] ;
var crochetL=[21,14,6,11,16] ;
var crochetH=[17,22,24,21,13] ;

function spriteCrochet(options) {

    var that = {},
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1,
        //cptUpdate=0,//nb de deplacement depuis le debut
        positionCrochet = options.positionCrochet,
        sens=1,
        nbTours=2,
        animation=false;// 1 -> 2 <-



    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;

    that.setAnimationON=function(){
        animation=true;
    };

    that.setAnimationOFF=function(){
        animation=false;
        sens=1;
        nbTours=2;
        position=-1;
    };

    that.getPos = function () {
        return positionCrochet;
    };

    that.setPos = function(pos) {
        positionCrochet=pos;
    };


    //UPDATE THE SPRITE
    that.update = function () {


        console.log("crochet:"+animation);


        if(!animation)
            if(!bouton.isActif()){
                positionCrochet=-1;
                sens=1;
                nbTours=2;
            }
            else
            {
                if(nbTours===0){
                    bouton.desactiver();
                    return;
                }

                if(positionCrochet===-1){
                    positionCrochet=0;
                    nbTours=2;
                }

                tickCount += 1;

                if (tickCount > ticksPerFrame) {

                    tickCount = 0;

                    if(sens===1){
                        positionCrochet+=1;

                    }
                    else if(sens===2){
                        positionCrochet+=-1;   
                    }

                    if(positionCrochet===numberOfFrames-1){
                        sens=2;
                    }
                    else if(positionCrochet===0){
                        sens=1;
                        nbTours+=-1;
                    }

                }
            }
    };

    //RENDER THE SPRITE
    that.render = function () {
        // Draw the animation
        that.context.drawImage(
            that.image,
            spriteCrochetX[positionCrochet],
            spriteCrochetY[positionCrochet],
            crochetL[positionCrochet],
            crochetH[positionCrochet],
            crochetX[positionCrochet],
            crochetY[positionCrochet],
            crochetL[positionCrochet],
            crochetH[positionCrochet]
        );
    };

    return that;






}

function GenererCrochet() {

    var crochetImg;
    crochetImg = new Image();

    crochet = spriteCrochet({
        context: canvas.getContext("2d"),
        image: crochetImg,
        numberOfFrames: 5,
        ticksPerFrame: 100,
        positionCrochet: 0,
        sens:1
    });


    // Start the game loop as soon as the sprite sheet is loaded

    crochetImg.src = "img/sprites/crochets.png";


}