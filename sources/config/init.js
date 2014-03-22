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

    gameloop();
}

/*******************************
*   Init canvas
*******************************/
function canvasInit()
{
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