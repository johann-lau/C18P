var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

const PLAY=1;const END=0;var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  // Moving background
  path=createSprite(windowWidth/2,200);
  path.addImage(pathImg);
  path.velocityY = 6;

  //creating boy running
  boy = createSprite(windowWidth/2,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.addAnimation("Game Over",endImg);
  boy.scale=0.08;

  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
}

function draw() {
  if(gameState===PLAY){
    background(0);
    boy.x = World.mouseX;
    
    edges= createEdgeSprites();
    boy.collide(edges);
    
    //code to reset the background
    if(path.y > 2525){
      path.y = 0;
    }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+150;
    } else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;
    } else {
      if(swordGroup.isTouching(boy)) {
        gameState = END;
        boy.changeImage("Game Over");
        boy.scale = displayWidth/1000;
        boy.x = displayWidth/2;
        boy.y = 300;
        cashG.setVelocityEach(0);
        diamondsG.setVelocityEach(0);
        jwelleryG.setVelocityEach(0);
        swordGroup.setVelocityEach(0);
        cashG.setLifetimeEach(-1);
        diamondsG.setLifetimeEach(-1);
        jwelleryG.setLifetimeEach(-1);
        swordGroup.setLifetimeEach(-1);
      }
    }
    
    drawSprites();
    textSize(20);
    fill(255);
    text("Treasure: "+ treasureCollection,displayWidth-150,30);
  }
}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, windowWidth-50),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 6;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, windowWidth-50),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 6;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, windowWidth-50),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = 6;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, windowWidth-50),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 6;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}