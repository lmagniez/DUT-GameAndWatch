//VIES DE MARIO

var vie=[];

var vieX = [108,124,140] ;
var vieY = [335+DECALAGE,335+DECALAGE,335+DECALAGE] ;
var vieL = [15,15,15,15] ;
var vieH = [19,19,19,19] ;


function spriteVieM(options) {
    
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
            vieX[position],
            vieY[position],
            vieL[position],
            vieH[position],
            vieX[position],
            vieY[position],
            vieL[position],
            vieH[position]
        );
    };

    return that;

}

//genere une vie à la position pos (entre 0 et 2)
function GenererVieM(pos) {

    var plateformeImg;
    vieImg = new Image();

    vie.push(spriteVieM({
        context: canvas.getContext("2d"),
        image: vieImg,
        ticksPerFrame: 1,
        position: pos
    }));
    
    vieImg.src = "img/sprites/game.png";

}

//Retire la dernière vie enregistrée
function DetruireVieM(){
    vie.splice(0,1);
}
