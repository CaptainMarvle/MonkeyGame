//make variables
var monkey, monkey_running, monkey_stoped;
var banana, bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, obstacleGroup;
var invisibleGround;
var score
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {

  //load Images
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  monkey_stoped = loadAnimation("sprite_7.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}


function setup() {

  //create the canvas
  createCanvas(600, 400);

  //create monkey sprite
  monkey = createSprite(100, 350, 20, 50)
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stoped", monkey_stoped);
  monkey.scale = 0.13;
  score = 0;
  survivalTime = 0;
  //create Edges
  edges = createEdgeSprites();

  //greate ground
  ground = createSprite(200, 390, 1200, 20);

  //making bananas 
  FoodGroup = createGroup();
  obstacleGroup = createGroup();

}

function draw() {
  //background
  background("lightGray");
  text("score " + score, 450, 50)
  monkey.collide(ground);

  if (gameState == PLAY) {

    monkey.velocityY = monkey.velocityY + 0.5;
    score = score + Math.round(frameCount / 60);
    survivalTime = Math.ceil(frameCount / frameRate())
    ground.velocityX = -4
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space")) {
      monkey.velocityY = -10;
    }

    if (FoodGroup.isTouching(monkey)) {

      FoodGroup.destroyEach();

    }

    if (monkey.isTouching(obstacleGroup)) {

      gameState = END;

    }
  } else if (gameState == END) {

    // obstacleGroup.destroyEach();
    // FoodGroup.destroyEach();


    ground.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    frameCount = -1;
    monkey.changeAnimation("stoped", monkey_stoped)

  }


  console.log(frameCount)

  stroke("white");
  textSize(20);
  fill("white");


  stroke("black");
  textSize(20);
  fill("black");

  text("Survival Time : " + survivalTime, 100, 50)

  SpawnBananas();
  SpawnObstacles();

  drawSprites();
}



function SpawnBananas() {

  if (frameCount % 80 == 0) {

    var banana = createSprite(600, 250, 10, 10);
    banana.y = Math.round(random(180, 280));
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.velocityX = -5

    banana.lifetime = 600;



    FoodGroup.add(banana);
  }


}

function SpawnObstacles() {

  if (frameCount % 80 == 0) {

    var obstacles = createSprite(600, 250, 10, 10);
    obstacles.y = 370;
    obstacles.x = 600;
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.1
    obstacles.velocityX = -6
    obstacles.lifetime = 600;
    obstacles.setCollider("circle", 0, 0, 40)


    obstacleGroup.add(obstacles);
  }


}