var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY=1;
var END=0;
var gameState=1;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

  treasureCollection = 0;
  
}

function draw() {
  edges= createEdgeSprites();
  boy.collide(edges);
  if(gameState === PLAY){
     background(0);
     boy.x = World.mouseX;
     if(path.y > 400 ){
      path.y = height/2;
     }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    if(cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150;
    }
    else if(swordGroup.isTouching(boy)) {
        gameState=END;
      
        diamondsG.destroyEach();
        diamondsG.setVelocityYEach(0);
        cashG.destroyEach();
        cashG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        swordGroup.destroyEach();  
        jwelleryG.destroyEach();
        jwelleryG.setVelocityYEach(0);
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=200;
        boy.scale=0.6;
        path.VelocityY=0;   
 
      
    }
 
    //code to reset the background
    drawSprites();
    
    textSize(20);
    fill(255);
    text("Treasure: "+ treasureCollection,150,30);
  }
  if(gameState===END){
    textSize(20);
    fill("red")  
    text("Press 'space'  to restart",120,380);
    if( keyDown("space")){
      gameState=PLAY;
      treasureCollection = 0;
      boy.x=70;
      boy.y=330;
        
      boy.addAnimation("SahilRunning",boyImg);
      boy.scale=0.08;

    }
  }
    
}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 250 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 4;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 290 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 300 == 0) {
    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}