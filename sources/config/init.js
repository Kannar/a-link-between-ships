//Fonctions de synchronisation d'affichage
window.requestAnimFrame =     (
    function(){
        return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element){
            window.setTimeout(callback, 1000 / 5);
        };
    }
)();

window.onload = mainInit;
/******************************
*   Main Init
******************************/
function mainInit()
{
    canvasInit();
    setStats();
    var player1=new Player({x:50, y:150, src:"sources/media/GladiatorP1.png"});
    var player2=new Player({x:150, y:150, src:"sources/media/GladiatorP2.png"});
    var link = new Link(player1,player2);
	var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
	var gamepadManager = new GamepadManager();
    gameobjects[0].push(player1,player2,link);
	var explosion1 = new Explosion(500, 400, 0);
	explosionTable.push(explosion1);
	
    mainloop();
}

/*******************************
*   Init canvas
*******************************/
function canvasInit()
{
	gamepadManager = new GamepadManager();
    mainCanvas  = document.getElementById("mainCanvas");
    mainContext = mainCanvas.getContext("2d");
    mainCanvas.width  = 1024;
    mainCanvas.height = 750;
}
/*************************
*   Init du Stats.js
*************************/
function setStats()
{
    stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
}