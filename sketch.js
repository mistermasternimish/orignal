
var player, pname,animals
var lifeShow, bg,bullets,bgm
var gameState = 2
var tm = -10
var cofl = 10000
var lifeCount = 200
var iv = 255
var bm = 530
var inp,play,flag,birds
function preload(){
 
  weapon = loadImage("img/weapon.png")
  ibg = loadImage("img/ibg.png")
  pb = loadImage("img/play.png")
  ib = loadImage("img/iboard.png")
  licon = loadImage("img/life.png")
  playerimg = loadImage("img/hunter.png")
  bgm = loadSound("bgm/bird-waterfall-bgm.mp3")
  deer = loadImage("img/deer.png")
  birdimg = loadImage("img/bird.png")
  tempimg = loadImage("img/templebg.png")
  bimg = loadImage("img/bullet.png")
  deers = loadSound("bgm/deer.mp3")
  walk = loadSound("bgm/walking-on-grass.mp3")
  gun = loadSound("bgm/shoot.mp3")
  birdd = loadSound("bgm/bird.mp3")
  bull = loadImage("img/bull.png")
}
function setup(){
 can = createCanvas(1165,530)

    bgm.loop()

    inp = createInput('').attribute("placeholder", "Enter Your Name");
   // inp.position(width/2-50,height/2+100);
    inp.size(100);
animals = new Group();
bullets = new Group()
birds = new Group()
weaponShow = createSprite(55,55)
weaponShow.addImage(weapon)
weaponShow.scale=0.1
weaponShow.visible=false

temple = createSprite(width-100,height/2-70);
temple.addImage(tempimg)
temple.scale=0.6
temple.debug=false
temple.visible=false;


player = createSprite(width/2-400,height/2+50);
player.addImage(playerimg)
player.scale=0.3
player.debug=false;
player.visible=false;





/*play =createSprite(width/2,height/2)
play.addImage(pb)
play.scale = 0.2*/

button= createButton("Start ")

}

function draw(){
 if(bg)
  background(bg)
//camera.position.x = player.x
//camera.position.y = player.y
  if(gameState===0){


tint(255,iv)
image(ibg,0,0,width,height)
iv = iv-2
if(iv<=0){
  if(tm<=150){
    tm +=5
  }
  if(bm>=height/2-50){
    bm -=5
  }
}

bg = loadImage("img/bg.png")
  
    pname= inp.value();
  
   
      textFont('Bold')
      textSize(50)
      fill("yellow")
      stroke("red")
      //text("Man vs Wild",width/2-150,height/2)

      text("Man vs Wild",width/2-150,tm)
      inp.position(width/2-50,bm);
      button.position(width/2-50,bm+100);
     
 
/*if(mousePressedOver(play)||keyDown(ENTER)){
  gameState=1
  }*/
button.mousePressed(()=>{
  gameState=1
})
     }
  
 if(gameState===1){
  bg = loadImage("img/bg.png")
 cursor("img/pointer.png")
  player.visible=true;
  if(player.x<=0){
   player.x =  50
  }else if(player.x>=temple.x-100){
player.x = temple.x-100
  }
 
text(lifeCount,width/2,height/2)
can.mousePressed(bulletCome)
temple.visible=true;
 inp.hide()
 button.hide()
  textFont('italic')
  textSize(20)
  fill("yellow")
  stroke("red")
  text(pname,120,25)
  animalcome()
weaponShow.visible=true;

if(keyDown(LEFT_ARROW)){
player.x = player.x-6

}
if(keyDown(RIGHT_ARROW)){
  player.x = player.x+6
}
  
for (var i = 0; i < animals.length; i++) {
  if (player.isTouching(animals.get(i))) {
    animals.get(i).bounceOff(player);
  }
   if (bullets.isTouching(animals.get(i))) {
        animals.get(i).destroy()
      
      

  }

  
}


if(cofl===0)
{gameState=4}
else if(player.x>=temple.x-100){
gameState=2
}
}
if(gameState===2){
bg = loadImage("img/bg2.png")
bgm = loadImage("bgm/bird-bgm.mp3")
cursor("img/pointer.png")
animals.destroyEach()

player.visible = false
temple.visible = false

weaponShow.visible = false
can.mousePressed(level2)
birdcome()
}
if(gameState===4){
animals.destroyEach()
weaponShow.visible = false
player.visible = false
weapon.visible=false
textFont('italic')
textSize(100)
fill("yellow")
stroke("red")
text("THE END",width/2,height/2)
}

    drawSprites();
  
   
}

function animalcome() {
  if(frameCount % random([50,100]) === 0) {
    var animal = createSprite(width+50,random([height/2+60]),20,30);
    animal.debug=true
    animal.setCollider('circle',0,0,300)
    // obstacle.debug = true
  animal.shapeColor="white"
   animal.velocityX = -6
 animal.addImage(deer);
    animal.scale=0.2
    deers.play()           
   
    animal.lifetime = 300;
   animal.depth = player.depth;
    
    //add each obstacle to the group
   animals.add(animal);
    
  }
}

function bulletCome(){

var  bullet = createSprite(player.x+20,mouseY);
gun.play()
    bullet.debug=false
    bullet.setCollider('circle',0,0,45)
    bullet.shapeColor="white"
    bullet.velocityX = 15
    bullet.addImage(bimg);
    bullet.scale=0.05   

   
    bullet.lifetime = 300;
    bullet.depth = player.depth;
    //bullet.add(bimg);
    bullets
    
}

function birdcome() {
  if(frameCount % random([50,100]) === 0) {
    var bird = createSprite(width+50,random(50,height/2+50),20,30);
    bird.debug=false
    bird.setCollider('circle',0,0,300)
    // obstacle.debug = true
  bird.shapeColor="white"
   bird.velocityX = -6
 bird.addImage(birdimg);
 bird.scale=0.3
    birdd.play()           
   
    bird.lifetime = 300;
   bird.depth = player.depth;
    //add each obstacle to the group
   birds.add(bird);
    
  }
}

function level2(){


  var  bullet = createSprite(mouseX,height);
  gun.play()
      bullet.debug=false
      bullet.setCollider('circle',0,0,45)
      bullet.shapeColor="white"
      bullet.velocityY = -15
      bullet.addImage(bull);
      bullet.scale=0.05   
  
     
      bullet.lifetime = 300;
      bullet.depth = player.depth;
      //bullet.add(bimg);
      bullets
      
}