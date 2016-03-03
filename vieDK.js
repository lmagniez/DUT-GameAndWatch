var vieDK=[];

var vieDKX = [171,178,184,189] ;
var vieDKY = [51,51,51,51] ;
var vieDKL = [10,6,6,7] ;
var vieDKH = [33,33,33,33] ;


function spriteVie(options) {
    
    var that = {},
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        position=options.position;//0, 1


    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;


    //RENDER THE SPRITE
    that.render = function () {
        //console.log("ok");
        // Draw the animation
        that.context.drawImage(
            that.image,
            10*position,
            25,
            vieDKL[position],
            vieDKH[position],
            vieDKX[position],
            vieDKY[position],
            vieDKL[position],
            vieDKH[position]
        );
    };

    return that;

}

function GenererVie(pos) {

    var plateformeImg;
    vieImg = new Image();

    vieDK.push(spriteVie({
        context: canvas.getContext("2d"),
        image: vieImg,
        ticksPerFrame: 1,
        position: pos
    }));
    


    // Start the game loop as soon as the sprite sheet is loaded

    vieImg.src = "img/sprites/crochets.png";

}

function DetruireVie(){
    vieDK.splice(0,1);
}


