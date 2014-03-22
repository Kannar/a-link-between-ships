var state = "IN_GAME";

var gameobjects = [
    [], //Allies
    [], //Allies Bullets
    [], //Ennemies
    [], //Annemies Bullets
    []  //Neutre
	

];

var	gamepads = [];
var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;