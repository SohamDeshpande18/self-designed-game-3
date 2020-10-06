
var background

var car1;
var car1side;


var START = 0;
var PLAY = 1;
var END = 2;

var gameState = START;

var score = 0;
var button1;
var coin;
var car2;
var carsGroup;

var coinsGroup;

text("Score: " + score, 120, 200);
text("Name : Player1", 120, 150);



function preload() {

  trackImg = loadImage("track1.jpg");

  carImg = loadImage("car1.png");
  car1Img = loadImage("car1side.png");

  coinImg = loadImage("coin1.png");

  car2Img = loadImage("car2.png");
  car3Img = loadImage("car3.png");
  car4Img = loadImage("car4.png");
  car5Img = loadImage("car5.png");
  back1Img = loadImage("background1.jpg");
  back2Img = loadImage("background2.jpg");
  bunImg = loadImage("start.jpg");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  track = createSprite(width / 2, height / 2, 100, height)
  track.addImage("track", trackImg);
 
  track.height / 2;

  track.scale = 2;

  car1 = createSprite(width / 2, height/2, 10, 10);
  car1.addImage("car", carImg);
  car1.scale = 0.7;
  car1.debug = true;
  car1.setCollider("rectangle",2,5);

  car1side = createSprite(width/2,height/2,20,20);
  car1side.addImage("car1",car1Img);

  coinsGroup = createGroup();
  carsGroup = createGroup();

  button1 = createButton("START");
  
  back = createButton("BACK");

}



function draw() {
 background(255);

 textSize(35)
 fill("black");
 text("Score: " + score, 120, 300);
 text("Name : Player1", 120, 250);
 text.visible = true;

  if (gameState === START) {
    background(back1Img);


    track.visible = false;
    car1.visible = false;
    coinsGroup.visible= false;
    car1side.visible = true;
    car1side.x = width/2;
    car1side.y = height/2 ;
  

    button1.position(width / 1.1, height / 1.1);
    button1.width = 50;
    button1.height = 70;
   
    button1.mousePressed(changeState);

    button1.show();
    back.hide();
    // console.log("in Start: " + gameState);

  }

  if (gameState === PLAY) {

    car1side.visible = false;

  

    track.visible = true;
    car1.visible = true;
    button1.hide();
    back.hide();

    if(gameState === END){
      car1.x = width/2;
      car1.y = height/2;
    }

    if (keyDown("LEFT_ARROW")) {
      car1.x = car1.x - 5;

    }

    if (keyDown("RIGHT_ARROW")) {
      car1.x = car1.x + 5;

    }

  

    if (keyDown("space")) {
     
      carsGroup.velocityY = -2;

    }else{
     
      carsGroup.velocityY = 4;
    }

    camera.position.y = car1.y;

    spawnCars();
    addCoins();

    //  if (coinsGroup.isTouching(car1)) {

    // coinsGroup.visible = false;

    for (var i = 0; i < coinsGroup.length; i++) {
      var coin = coinsGroup.get(i);

      if (car1.isTouching(coin)) {
        coin.destroy();

        score = score + 50;
      }
    }


    //  }

    if (car1.isTouching(carsGroup)) {
      gameState = END;
    }


  }

  if(gameState === END){
    car1side.visible = false;
    background(back2Img);
    text("GAMEOVER",200,200);
    text.visible = true;
    back.position(width/2,height/2);
    back.mousePressed(changeState2);
    car1.visible = false;
    car1.velocityY = 0;
    track.visible = false;
    car2.visible = false;
    car2.velocityY = 0;
    coinsGroup.velocityY = 0;
    coinsGroup.visible = false;
    back.show();
   
  }

  drawSprites();

 

}



function addCoins() {
  if (frameCount % 60 === 0) {
    coin = createSprite(random(width / 2 - 200, width / 2 + 200), 100)
    coin.addImage(coinImg);
    coin.velocityY = 4;
    coin.scale = 0.1;
    coin.setCollider("circle",10,10,50);

    coinsGroup.add(coin);
  }
}

function spawnCars() {
  if (frameCount % 90 === 0) {
    car2 = createSprite(random(width / 2 - 200, width / 2 + 200), 100);

    car2.velocityY = 4;

    var rand = Math.round(random(2, 5));
    //console.log(rand);

    switch (rand) {

      case 2: car2.addImage(car2Img);
        car2.scale = 0.5;
        car2.debug = true;
        break;
      case 3: car2.addImage(car3Img)
        car2.scale = 0.2;
        car2.debug = true;
        break;
      case 4: car2.addImage(car4Img)
        car2.scale = 0.7;
        car2.debug = true;
        break;
      case 5: car2.addImage(car5Img)
        car2.scale = 0.3;
        car2.debug = true;
        break;
      default: break;

    }

    carsGroup.add(car2)

  }
}

function changeState() {
  gameState = PLAY;

}

function changeState2() {
  gameState = START;
 
}
