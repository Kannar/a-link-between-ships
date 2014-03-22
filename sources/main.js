/*****************************
*   Main loop
*****************************/
function mainloop()
{
    if(state == "LOADING")
    {
        loading();
        return;
    }
    if(state == "IN_GAME")
    {
        gameloop();
        return;
    }
    if(state == "PAUSE")
    {
        pauseloop();
        return;
    }

    requestAnimFrame(mainloop);
}

/*****************************
*   Gameloop
*****************************/
function gameloop()
{
    mainContext.clearRect(0, 0, 1024, 750);
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