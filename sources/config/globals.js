var state = "IN_GAME";
var understate = "WAVE_SWITCH";
var gameobjects = [
    [], //Allies
    [], //Allies Bullets
    [], //Ennemies
    [], //Annemies Bullets
    []  //Neutre
];

var gamepadManager;
var	gamepads = [];
var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;