var vie=[];
var chiffres=[];


var scoreX= [188,203,219,235];
var scoreY= 339+DECALAGE;
var scoreL=11;
var scoreH=19;



function spriteScore(options) {

    var that = {},
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        position=options.position,//0, 1
        positionChiffre=options.positionChiffre;//0:unite, 1:dizaine...


    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;


    that.update = function(){

        unite = score%10;
        dizaine = ((score -unite)/10)%10;
        centaine = ((score -unite -10*dizaine)/100)%10;
        millier = ((score -unite -10*dizaine -100*centaine)/1000); 

        if(positionChiffre===3)
            position=unite;
        if(positionChiffre===2)
            position=dizaine;
        if(positionChiffre===1)
            position=centaine;
        if(positionChiffre===0)
            position=millier;

    }

    //RENDER THE SPRITE
    that.render = function () {
        //console.log("ok");
        // Draw the animation
        that.context.drawImage(
            that.image,
            11*position,
            0,
            scoreL,
            scoreH,
            scoreX[positionChiffre],
            scoreY,
            scoreL,
            scoreH
        );
    };

    return that;

}

function GenererScore(pos) {




    var scoreImg;
    scoreImg = new Image();
    chiffres.push(spriteScore({
        context: canvas.getContext("2d"),
        image: scoreImg,
        ticksPerFrame: 1,
        position: 0,
        positionChiffre: pos
    }));



    // Start the game loop as soon as the sprite sheet is loaded

    scoreImg.src = "img/sprites/score.png";

}


