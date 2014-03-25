/*****************************
*   Main loop
*****************************/
function mainloop()
{
    if(state == "LOADING")
    {
        loading();
    }
    if(state == "IN_GAME")
    {
        gameloop();
    }
    if(state == "PAUSE")
    {
        pauseloop();
    }

    requestAnimFrame(mainloop);
}

/*****************************
*   Gameloop
*****************************/
function gameloop()
{
    stats.begin();
/******************************/

    mainContext.clearRect(0, 0, 1024, 750);
	
	gamepadManager.update();

    for(var i=0; i<gameobjects.length; i=i+1)
    {
        for(var j=0; j< gameobjects[i].length; j=j+1)
        {
            if(gameobjects[i][j].update)
                gameobjects[i][j].update();
            if (gameobjects[i][j].draw) {
                //gameobjects[i][j].draw();
            };
        }
    }
    collisionManager(gameobjects[0],gameobjects[4])
    collisionManager(gameobjects[0],gameobjects[2])
    collisionManager(gameobjects[1],gameobjects[2])
	
	for(i=0; i < explosionTable.length; i++)
	{
		explosionTable[i].update();
		if(explosionTable[i].particlesTable.length == 0)
		{
			explosionTable.splice(i,1);
		}
	}
	if(understate == "IN_WAVE")
	{
		if(gameobjects[2].length == 0)
		{
			understate = "WAVE_SWITCH";
			wave+=1;
			waveCountdown = 200;
		
		}
	}
	if(understate == "WAVE_SWITCH")
	{
		//waveCountdown -=1;
		
	mainContext.fillStyle = "rgba(255,255,255,0.8)";
	mainContext.font = "Bold 80px Akachi";
	var text = "WAVE  "+wave;
	var dim = mainContext.measureText(text);
	mainContext.fillText(text, mainCanvas.width / 3, mainCanvas.height / 2 - 150);		
		
		if(waveCountdown <= 0)
		{
			generateWave(wave);
			understate = "IN_WAVE";
		}
	}

    for(var i = 0; i < gameobjects[1].length; i++)
    {
        if(gameobjects[1][i].toDestroy == true)
        {
            gameobjects[1].splice(i, 1);
            i--;
        }
    }

/******************************/
    stats.end();
}

/****************************
*   Pause
****************************/
function pauseloop()
{
    mainContext.fillStyle = "rgba(255,255,255,0.8)";
    mainContext.font = "Bold 80px Akachi";
    mainContext.fillText("PAUSE", mainCanvas.width / 3, mainCanvas.height / 2 - 150);
}

/****************************
*   Loading
****************************/
function loading()
{

}