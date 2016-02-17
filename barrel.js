var lancerBarrel=false;

var barrels=[];
var cptBarrel=0;

var barrelX=[38,47,47,47, //DK gauche
             88,94,95,97, //DK milieu
             137,140,141,142, //DK droite
             142,120,96,72,47,10, //palier 3
             9,10,52,93,131,169,206, //palier 2
             206,169,130,92,51,10 //palier 1
            ];

var barrelY=[31,83,110,146, //DK gauche
             31,83,109,146, //DK milieu
             32,83,110,147, //DK droite
             166,168,168,170,171,173, //palier 3
             211,242,245,249,253,256,262, //palier 2
             305,309,312,316,319,323 //palier 1
            ];
var barrelL=[31,16,14,13,
             30,16,14,13,
             32,16,14,13,
             12,12,12,12,12,12,
             12,12,11,12,12,11,12,
             12,12,12,12,12,12
            ];
var barrelH=[19,12,13,11, //DK gauche
             18,12,13,12, //DK milieu
             21,12,13,12, //DK droite
             12,11,12,11,11,12, //palier 3
             11,11,12,11,11,12,12, //palier 2
             12,11,12,11,12,12 //palier 1
            ];
var i;




function sprite (options) {

    var that = {},
        frameIndex = parseInt(Math.random() * 5 + 1),
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1,
        //cptUpdate=0,//nb de deplacement depuis le debut
        positionDK=options.positionDK,//0, 1 ou 2
        positionBarrel=options.positionBarrel;
    ;


    that.context = options.context;
    that.width = options.width;
    that.height = options.height;

    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;

    that.idBarrel=options.idBarrel;


    //UPDATE THE SPRITE
    that.update = function () {
        
        
        
        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;
            if(positionBarrel===0
               ||positionBarrel===4
               ||positionBarrel===8)
            lancerBarrel=false;

            // If the current frame index is in range
            if (positionBarrel < numberOfFrames - 1) {	
                // Go to the next frame
                if(positionBarrel===3)
                    positionBarrel=16;
                else if(positionBarrel===7)
                    positionBarrel=14;
                else positionBarrel += 1;

                //console.log("positionBarrel:"+positionBarrel);
                
                return false;

            } else {//on supprime si arrivé au bout
                barrels.splice(i, 1);
                cptBarrel=cptBarrel-1;
                /*
                console.log("cptBarrel:"+cptBarrel);
                console.log("barrels length:"+barrels.length);
                console.log("that.idBarrel:"+that.idBarrel);
                */
                return true;
            }


        }
    }; 

    //RENDER THE SPRITE
    that.render = function () {
        //console.log("ok");
        // Draw the animation
        that.context.drawImage(
            that.image,
            barrelX[positionBarrel],
            barrelY[positionBarrel],
            barrelL[positionBarrel],
            barrelH[positionBarrel],
            barrelX[positionBarrel],
            barrelY[positionBarrel],
            barrelL[positionBarrel],
            barrelH[positionBarrel]);
    };   

    return that;


}


//0 1 2 en fonction position dk
function GenererBarrel(position){

    cptBarrel=cptBarrel+1;
    var barrelIndex, barrelImg;
    barrelImg = new Image();
    barrelIndex = barrels.length;

    barrels[barrelIndex] = sprite({
        context: canvas.getContext("2d"),
        image: barrelImg,
        numberOfFrames: 31,
        ticksPerFrame: 25,
        positionDK: position,
        positionBarrel: position*4,
    });
    
    lancerBarrel=true;
    
    



    // Start the game loop as soon as the sprite sheet is loaded

    barrelImg.src = "img/sprites/barrel.png";


}


