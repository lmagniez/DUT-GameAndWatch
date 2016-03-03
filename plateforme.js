var vie=[];
var plateforme=[];

var plateformeX = [31,10,69,117] ;
var plateformeY = [77,86,94,100] ;
var plateformeL = [141,28,17,38] ;
var plateformeH = [6,39,42,16] ;

var vieDKX = [172,178,184,189] ;
var vieDKY = [51,51,51,51] ;
var vieDKL = [10,6,6,7] ;
var vieDKH = [33,33,33,33] ;


function spritePlateforme(options) {

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
            plateformeX[position],
            plateformeY[position],
            plateformeL[position],
            plateformeH[position],
            plateformeX[position],
            plateformeY[position],
            plateformeL[position],
            plateformeH[position]
        );
    };

    return that;

}

function GenererPlateforme(pos) {

    var plateformeImg;
    plateformeImg = new Image();

    plateforme.push(spritePlateforme({
        context: canvas.getContext("2d"),
        image: plateformeImg,
        ticksPerFrame: 1,
        position: pos
    }));


    // Start the game loop as soon as the sprite sheet is loaded

    plateformeImg.src = "img/sprites/bar.png";

}


