//changer les strings par leur vraies valeur 
function instantiateMap(){
	var spawns = [{x:75,y:150}, {x:180,y:780}, {x:560,y:560}, {x:670,y:50}, {x:420,y:280}, {x:270,y:22}];
	for (var i = 0; i < 3; i++) {
		var randomSpawn = Math.random()*spawns.length>>0;
		var obstacle = new Obstacle();
		obstacle.x=spawns[randomSpawn].x;
		obstacle.y=spawns[randomSpawn].y;
		gameobjects[4].push(obstacle);
		spawns.splice(randomSpawn,1);
		console.log(spawns)
		console.log(randomSpawn)
	};
}