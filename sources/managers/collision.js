function collisionManager(gameobjects1,gameobjects2){
	for (var i = 0; i < gameobjects1.length; i++) {
		for (var j = 0; j < gameobjects2.length; j++) {
			if(((gameobjects2[j].x< gameobjects1[i].x+gameobjects1[i].width && gameobjects2[j].x> gameobjects1[i].x) && 
				(gameobjects2[j].y<gameobjects1[i].y+gameobjects1[i].height && gameobjects2[j].y>gameobjects1[i].y ))||
				(gameobjects1[i].x< gameobjects2[j].x+gameobjects2[j].width && gameobjects1[i].x> gameobjects2[j].x) && 
				(gameobjects1[i].y<gameobjects2[j].y+gameobjects2[j].height && gameobjects1[i].y>gameobjects2[j].y )){
				if(gameobjects2[j].death)
					gameobjects2[j].death(j);
				if(gameobjects1[i].death)
<<<<<<< HEAD
					gameobjects1[i].death();
=======
					gameobjects1[i].death(i);
>>>>>>> f419223544fe06e6e6355c9affcbb3b9b878d0a6
				console.log("collision")
			}	
		};
			
	};
}	