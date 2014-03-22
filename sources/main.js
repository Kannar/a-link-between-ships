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
/******************************/
    stats.end();
}

/****************************
*   Pause
****************************/
function pauseloop()
{

}

/****************************
*   Loading
****************************/
function loading()
{

}