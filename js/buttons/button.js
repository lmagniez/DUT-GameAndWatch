
var button;

var buttonX = 4;
var buttonY = 0;
var buttonL = 55;
var buttonH = 55;

function spriteButton(options) {

    var that = {},
    positionButton = options.positionButton;//0, 1 



    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;


    //UPDATE THE SPRITE
    that.update = function () {

       if(TOUCHE_SAUT)positionButton=1;
        else positionButton=0;

    };

    //RENDER THE SPRITE
    that.render = function () {
        // Draw the animation
        contextButton.drawImage(
            that.image,
            buttonX+positionButton*buttonL,
            buttonY,
            buttonL,
            buttonH,
            buttonX,
            buttonY,
            buttonL,
            buttonH
        );
    };

    return that;






}

function GenererButton() {

    var buttonImg;
    buttonImg = new Image();

    button = spriteButton({
        context: canvas.getContext("2d"),
        image: buttonImg,
        positionObstacle: 0
    });


    // Start the game loop as soon as the sprite sheet is loaded

    buttonImg.src = "img/sprites/pad/button.png";


}
