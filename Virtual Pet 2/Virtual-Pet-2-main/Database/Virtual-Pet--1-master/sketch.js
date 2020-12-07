//Create variables here
var dog, dogI, hdog,hdogI, database, fs, foods, hundogI;
var feedB, addB;
var storing;
var foodObj;
var readState;
var changeState;
var w1, b1, g1;
var r1, l1;
var database;
function preload()
{
  //load images here
  //dogI = loadImage("images/dogImg.png");
  hdogI = loadImage("images/dogImg1.png")
  hundogI = loadImage("images/dogImg.png")
  g1 = loadImage("images/Garden.png")
  w1 = loadImage("images/Wash Room.png")
  b1 =loadImage("images/Bed Room.png")    
  r1 = loadImage("image/running.png")
  l1 = loadImage("image/Lazy.png")
}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);


  foodObj = new Food();
  
  foodstock=database.ref('Food');
  foodstock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  
  dog = createSprite(200,400,150,50);
  /*dog.addAnimaton("hungry",hundogI)
  dog.addAnimaton("sleeping",l1)
  dog.addAnimaton("running",r1)*/
  dog.addImage("hungry",hundogI)
  dog.scale = 0.15;

  
  addB = createButton("Add Bottle");
  addB.position(800,95);
  addB.mousePressed(addFoods);

  feedB = createButton("Feed The Dog")
  feedB.position(700,95);
  feedB.mousePressed(feedDog);

  }

  


function draw() {  
background(49,139,87);

currentTime = hour();
if(currentTime === (lastFed +1)){
  gameState = "playing";
  updateGameState();
  foodObj.garden();
}else if(currentTime === lastFed +2){
  gameState = "sleeping";
  updateGameState();
  foodObj.bedroom();
}else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  gameState = "bathing";
  updateGameState();
  foodObj.washroom();
}else
gameState = "hungry"
updateGameState();
foodObj.display();

if(gameState!="hungry"){
  feed.hide();
  addFood.hide()
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage("hungry", hundogI)
}

drawSprites();
  //add styles here
 /* textSize(32)
  fill("red")
  textSize(20);
  text("Last Fed:"+lastFed+"00",300,95);
  text("Time since last fed:" +(currentTime-lastFed),300,125); */   

}



/*foodObj.getFoodStock();
getGameState();
fedTime=database.ref('FeedTime');
fedTim.on("value", function(data){
  lastFed=data.val();
});*/




  
       

  



function feedDog(){
  dog.addImage(hdogI);

  foodObj.updateFoodStock(foodObj);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodObj.addFood();
    foodObj.updateFoodStock();
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  
}



function update(state){
  database.ref('/').update({
    gameState:state
  });
    }
  
    function readStock(data){ 
      foods=data.val(); 
      fooodObj.updateFoodStock(foodS)
    } 
    
    /*function writeStock(x){ 
      
      database.ref('/').update({ 
        Food:x 
      }) 
    }*/
  


