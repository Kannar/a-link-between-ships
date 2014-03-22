define(["world", "player", "app"], function(world, Player, app) {
    return {
        gamepads: [],
        delay : 5000,
        lastTick : new Date().getTime(),
        pucelle : true,

        init: function() {
          var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
        },

        pollGamepads : function() { //isHeavy
            var rawGamepads = navigator.webkitGetGamepads && navigator.webkitGetGamepads();
            for (var i = 0; i < rawGamepads.length; i++)
            {
                if (rawGamepads[i] != null)
                    this.gamepads.push(rawGamepads[i]);
            }
        },

        run : function() {
            this.pollGamepads();
            if (this.pucelle)
            {
                this.checkGamepadConnect();
                this.pucelle = false;
            }

            if (this.lastTick + this.delay < new Date().getTime())
            { 
                this.checkGamepadConnect();
                this.lastTick = new Date().getTime();
            }
            
        },

        checkGamepadConnect : function()
        {
            for (var i = 0; i < this.gamepads.length; i++)
            {
                var playerExist = false;
                var players = world.findGameObjectsWithTag("player");
                for (var j = 0; j < players.length; j++)
                {
                    if (this.gamepads[i].index === players[j].playerID)
                    {
                        playerExist = true;
                    }                    
                }

                if (!playerExist)
                {
                    world.gameObjects.push(new Player({
                        tag : "player",
                        id : world.gameObjects.length,
                        playerID : i,
                        size : { x : 32, y : 32 },
                        gamepad : this.gamepads[i]
                    }));

                    if(i==0)
                    document.getElementById("squelette-player").style.backgroundImage = "url(medias/player_squelette_actif.png)";

                    if(i==1)
                    document.getElementById("robot-player").style.backgroundImage = "url(medias/player_robot_actif.png)";

                    if(i==2)
                    document.getElementById("kawaii-player").style.backgroundImage = "url(medias/player_kawaii_actif.png)";

                    if(i==3)
                    document.getElementById("dragon-player").style.backgroundImage = "url(medias/player_dragon_actif.png)";

                    app.stillAlive++;
                }
            }
        }
    }  
});