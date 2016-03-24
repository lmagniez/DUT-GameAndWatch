
var pad;

var padX = 0;
var padY = 0;
var padL = 85;
var padH = 85;

function spritePad(options) {

    var that = {},
    positionPad = options.positionPad;//0, 1 



    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;


    //UPDATE THE SPRITE
    that.update = function () {

       if(TOUCHE_HAUT)positionPad=1;
        else if(TOUCHE_DROITE)positionPad=2;
        else if(TOUCHE_BAS)positionPad=3;
        else if(TOUCHE_GAUCHE)positionPad=4;
        else positionPad=0;

    };

    //RENDER THE SPRITE
    that.render = function () {
        // Draw the animation
        contextPad.drawImage(
            that.image,
            padX+positionPad*padL,
            padY,
            padL,
            padH,
            padX,
            padY,
            padL,
            padH
        );
    };

    return that;






}

function GenererPad() {

    var padImg;
    padImg = new Image();

    pad = spritePad({
        context: canvas.getContext("2d"),
        image: padImg,
        positionPad: 0
    });


    // Start the game loop as soon as the sprite sheet is loaded

    padImg.src = "img/sprites/pad/pad.png";


}
