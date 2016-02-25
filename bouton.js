var bouton;

var boutonX=[20,25];
var boutonY=[126,138];
var boutonL=[9,11];
var boutonH=[10,5];

function spriteBouton(options) {

    var that = {},
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        position=0,//0, 1
        actif=false;


    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;



    that.getPos = function () {
        return position;
    };
    
    that.isActif = function() {
        return actif;
    };
    
    that.activer = function (){
        actif=true;
    };
    
    that.desactiver = function (){
        actif=false;
    };
    

    //UPDATE THE SPRITE
    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range
            if (actif) {
                position= 1;
            } else {//on supprime si arrivé au bout
                position=0;
            }


        }
    };

    //RENDER THE SPRITE
    that.render = function () {
        //console.log("ok");
        // Draw the animation
        that.context.drawImage(
            that.image,
            boutonX[position],
            boutonY[position],
            boutonL[position],
            boutonH[position],
            boutonX[position],
            boutonY[position],
            boutonL[position],
            boutonH[position]
        );
    };

    return that;

}

function GenererBouton() {

    var boutonImg;
    boutonImg = new Image();

    bouton = spriteBouton({
        context: canvas.getContext("2d"),
        image: boutonImg,
        ticksPerFrame: 1,
        position: 0
    });


    // Start the game loop as soon as the sprite sheet is loaded

    boutonImg.src = "img/sprites/bar.png";


}


