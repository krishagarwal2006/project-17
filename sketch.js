var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword,swordImage;

var fruit1,fruit2,fruit3,fruit4;

var alien1Image,alien2Image;

var gameOverImage;

var score = 0;


function preload(){
  
  swordImage = loadImage("sword.png")
  
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")
  
  alien1Image = loadAnimation("alien1.png")
  alien2Image = loadAnimation("alien2.png")
  
  gameOverImage = loadImage("gameover.png")
  
}

function setup(){
  createCanvas(400,400)
  
  sword = createSprite(200,200,20,20);
  sword.addImage(swordImage)
  sword.scale = 0.5
  
  fruitGroup = new Group();
  enemyGroup = new Group();
   
}

function draw(){
  
  background("cyan");
  
  if(gameState === PLAY){
  
    fruits();
    enemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score + 2;
    }
    
    if(enemyGroup.isTouching(sword)){
      
      gameState = END;
    }
  
  }
  
  if(gameState === END){
    
    var gameOver = createSprite(200,130);
    gameOver.addImage(gameOverImage);
    sword.x = 200;
    sword.y = 200;
    
    fruitGroup.destroyEach();
    
    enemyGroup.destroyEach();
    
    
    
  }  
  
  drawSprites();
  
  textSize(20)
  text("Score : "+ score,275,30);
  
}

function fruits(){
   if(score < 50) { r = 80; fruitproc(); } 
   if(score >=50) { r = 50; fruitproc(); } 
  
}

function fruitproc(){
  if(frameCount % r === 0){
     fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug = true;
    r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1)
    } else if (r == 2){
      fruit.addImage(fruit2)
    } else if (r == 3){
      fruit.addImage(fruit3)
    } else if (r == 4){
      fruit.addImage(fruit4)
    }
    fruit.y = Math.round(random(50,340))
    
    fruit.velocityX = -15;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);

  
  if(score>=50){
     fruit.velocityX = -10; 
  }
    
     }
  
}

function enemy(){
   if(frameCount % 200 === 0){
     alien = createSprite(400,200,20,20);
     
     r = Math.round(random(1,2));
     if(r == 1){
    alien.addAnimation("moving",alien1Image)
     } else if(r == 2){
       alien.addAnimation("moving",alien2Image)
     }
     alien.y = Math.round(random(100,300));
     alien.velocityX = -16;
     alien.setLifetime = 50;
     enemyGroup.add(alien);
   }
}



