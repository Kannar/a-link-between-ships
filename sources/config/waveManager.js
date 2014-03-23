var registeredEnemyNumber = 5;


function generateWave(waveNumber){

var enemyTypeTable = [0,0,1,1,2,2];
var enemyTypeCount = 3;
var enemyNumber = registeredEnemyNumber + waveNumber;

var waveTable = [];

	for(i=0; i < enemyNumber; i++)
	{
		var wichEnemy = Math.floor(Math.random()*enemyTypeCount);
		waveTable.push(wichEnemy);
	}

registeredEnemyNumber = enemyNumber;

enemyWavePush(waveTable);
}


function enemyWavePush(waveTable){


for(i = 0; i < waveTable.length; i++)
{
	var xSpawn;
	var ySpawn;
	var spawnTime;
	var sideSpawn = Math.floor(Math.random()*4);
	
	if(sideSpawn == 0) //gauche
	{
		xSpawn = 0;
		ySpawn = Math.floor(Math.random()*mainCanvas.height);
		
	}
	if(sideSpawn == 1) // droite
	{
		xSpawn = mainCanvas.width;
		ySpawn = Math.floor(Math.random()*mainCanvas.height);
	}
	if(sideSpawn == 2) // haut
	{
		xSpawn = Math.floor(Math.random()*mainCanvas.width);
		ySpawn = 0;
	}
	if(sideSpawn == 3) // bas
	{
		xSpawn = Math.floor(Math.random()*mainCanvas.width);
		ySpawn = mainCanvas.height;
	}
	
	spawnTime = i*30 + Math.floor(Math.random()*100);
	
	var newEnemy = new Ennemy({
            x          : xSpawn
        ,   y          : ySpawn
        ,   spawnTimer : spawnTime
        ,   type       : waveTable[i]
    });
	gameobjects[2].push(newEnemy);
}

}


