var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround1, invisibleGround2, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver,sky,skyImg



function preload(){
  trex_running =  loadImage("Car.png");
  trex_collided = loadImage("CarCrash.png");
  
  groundImage = loadImage("ground2.png");
  invGroundImage = loadImage("ground.png")
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");

  skyImg = loadImage("sky.jpg")
}

function setup() {
  createCanvas(1250,450);
    sky = createSprite(625,125,1250,250)
  sky.addImage(skyImg)
  trex = createSprite(100,300,20,50);
  trex.addImage(trex_running);
  
  trex.scale = 0.025;
  
  ground = createSprite(200,300,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(625,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  invisibleGround1 = createSprite(300,380,5000,1000);
  invisibleGround1.addImage(invGroundImage)
  invisibleGround1.scale = 0.1



  invisibleGround2 = createSprite(900,380,5000,1000);
  invisibleGround2.addImage(invGroundImage)
  invisibleGround2.scale = 0.1
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround1);
    trex.collide(invisibleGround2);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    gameOver.scale = 0.25

    trex.addImage(trex_collided);
    trex.scale = 0.5

    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
  fill('red')
  textSize(32)
  text("Press 'space' to boost nitro for jumping",400,100)
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,300,10,40);
    obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.scale = 0.1;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale = 0.05
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
      obstacle.scale = 0.5
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}