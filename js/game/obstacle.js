var obstacle;

var obstacleX = [179, 140, 101, 63, 26];
var obstacleY = [207, 204, 200, 197, 197];
var obstacleL = [30, 30, 29, 29, 30];
var obstacleH = [15, 14, 14, 15, 11];

function spriteObstacle(options) {

    var that = {},
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1,
        //cptUpdate=0,//nb de deplacement depuis le debut
        positionObstacle = options.positionObstacle;//0, 1 ou 2



    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;



    that.getPos = function () {
        return positionObstacle;
    };

    //UPDATE THE SPRITE
    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            
            //TEST DE COLLISION
            if(collisionBarrel[positionObstacle]==mario.getPos())
                collision=true;


            // If the current frame index is in range
            if (positionObstacle < numberOfFrames) {
                // Go to the next frame
                positionObstacle += 1;

            } else {//on supprime si arrivé au bout
                //obstacle = null;
                return;
            }


        }
    };

    //RENDER THE SPRITE
    that.render = function () {
        // Draw the animation
        that.context.drawImage(
            that.image,
            obstacleX[positionObstacle],
            obstacleY[positionObstacle],
            obstacleL[positionObstacle],
            obstacleH[positionObstacle],
            obstacleX[positionObstacle],
            obstacleY[positionObstacle],
            obstacleL[positionObstacle],
            obstacleH[positionObstacle]
        );
    };

    return that;






}

function GenererObstacle() {

    var obstacleImg;
    obstacleImg = new Image();

    obstacle = spriteObstacle({
        context: canvas.getContext("2d"),
        image: obstacleImg,
        numberOfFrames: 5,
        ticksPerFrame: 50,
        positionObstacle: 0
    });


    // Start the game loop as soon as the sprite sheet is loaded

    obstacleImg.src = "img/sprites/bar.png";


}
