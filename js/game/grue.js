var grue;

var grueX=[221,207,222] ;
var grueY=[114,81,35] ;
var grueL=[36,50,34] ;
var grueH=[56,24,39] ;

function spriteGrue(options) {

    var that = {},
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        position=0,//0, 1
        animation=false;


    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;

    that.setPos = function (pos) {
        position=pos;
    };

    that.getPos = function () {
        return position;
    };




    //UPDATE THE SPRITE
    that.update = function () {
        
        tickCount += 1;
        
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if(bouton.isActif()) {
                position= 1;
            } else {
                position=0;
            }
        }

    };

    //RENDER THE SPRITE
    that.render = function () {
        // Draw the animation
        that.context.drawImage(
            that.image,
            grueX[position],
            grueY[position],
            grueL[position],
            grueH[position],
            grueX[position],
            grueY[position],
            grueL[position],
            grueH[position]
        );
    };

    return that;

}

function GenererGrue() {

    var grueImg;
    grueImg = new Image();

    grue = spriteGrue({
        context: canvas.getContext("2d"),
        image: grueImg,
        ticksPerFrame: 1,
        position: 0
    });

    grueImg.src = "img/sprites/bar.png";

}


