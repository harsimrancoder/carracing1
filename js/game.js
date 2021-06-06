class Game {
    constructor(){}
    
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
     
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
     async start(){
       if(gameState === 0){
         player = new Player();
         var playerCountRef = await database.ref('playerCount').once("value");
         if(playerCountRef.exists()){
           playerCount = playerCountRef.val();
           player.getCount();
         }
         form = new Form()
         form.display();
     }
    }
    play(){
      form.hide();

      textSize(30);
      text("GameStart",120,100);
      Player.getPlayerInfo();
      if(allPlayers!==undefined){
        var dp=130
        for(var i in allPlayers){
          //display position 
          if(i==="player"+player.index){
            fill("red")
          }
          else{
         fill("black")
          }
          dp+=20
          textSize(15);
          text(allPlayers[i].name+":"+allPlayers[i].distance,120,dp)
        }
      }
      if(keyIsDown(UP_ARROW)&&player.index!==null){
        player.distance+=50
        player.update()
      }
    }
  }
