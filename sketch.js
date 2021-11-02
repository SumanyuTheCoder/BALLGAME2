var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg,bgIMG;
var sun,sunIMG;
var ground,groundIMG;
var ball,planeIMG;
var CreateLog;
var logIMG,logIMG2;
var line;

var Loading,loadingwheel;
var wheelblocker;
var BallSound;
function preload(){
  bgIMG = loadImage("background.png")
  sunIMG = loadImage("sun.png")
  groundIMG = loadImage("ground.png")
  planeIMG = loadImage("Ball.png")
  logIMG = loadImage("log.png")
  logIMG2 = loadImage("log2.png")
  BallSound = loadSound("ball-sound.mp3")
}
function setup() {
    createCanvas(360,640);

    bg = createSprite(200,460)
    bg.addImage(bgIMG)
    bg.scale = 6

    ground = createSprite(145,550)
    ground.addImage(groundIMG)
    ground.scale = 3
    ground.x = ground.width /2;
    ground.velocityX = -6;
        
    sun = createSprite(300,50)
    sun.addImage(sunIMG)
    sun.scale = 0.5

    ball = createSprite(60,280)
    ball.addImage(planeIMG);
    ball.scale = 0.2;

    line = createSprite(170,155,400,2)
    line.shapeColor = "black"

    Loading = createSprite(180,330,230,50);
    Loading.shapeColor = "black";
    Loading.visible = false


    loadingwheel = createSprite(90,330,40,40)
    loadingwheel.shapeColor = "lightgreen"
    loadingwheel.visible = false

    wheelblocker = createSprite(320,330,50,50)
    wheelblocker.visible = false
    CreateLog = new Group();
}

function draw() {

  if((touches.length > 0 || keyDown("SPACE")) ) {
    BallSound.play()
    ball.velocityY = -12;
    touches = [];
  
  
if(gameState === PLAY){
  createLog();
  createLog2();

  //if(keyDown("space") && ball.y >= 159) {
   // ball.velocityY = -12;
  //}

  ball.velocityY = ball.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;

    }
    if(ball.isTouching(CreateLog)){
      gameState = END
  }

  
  }



if(gameState === END ){
  CreateLog.velocityX = 0
  ground.velocityX = 0
  ball.velocityY = 0
  Loading.visible = true
  loadingwheel.visible = true
  loadingwheel.velocityX = 2;
  
  if(loadingwheel.isTouching(wheelblocker)){
    gameState = PLAY;
    ground.velocityX = -6
    Loading.visible = false;
  loadingwheel.visible = false;
  loadingwheel.x = 90
  }

}

  
  
  ball.collide(ground) 
  ball.collide(line)
  loadingwheel.collide(wheelblocker)
  //ball.collide(CreateLog)


    

    
  drawSprites();

}
function createLog(){
  if (frameCount % 140 === 0) {
    var log = createSprite(590,490);
    log.x= Math.round(random(200,400));
    log.addImage(logIMG)
    log.velocityX = -2;
    log.scale = 0.4;
    CreateLog.add(log);

  }
}

function createLog2(){
  if (frameCount % 130 === 0) {
    var log1 = createSprite(230,205);
    log1.x= Math.round(random(200,400));
    log1.addImage(logIMG2)
    log1.velocityX = -2;
    log1.scale = 0.4;
    CreateLog.add(log1);
  }
}
