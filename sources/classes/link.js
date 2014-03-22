var Link = function(player1,player2){
	this.startPos;
	this.endPos;
	this.color="rgb(255,0,0)";
	this.life=5;
	this.ammo=1000;
}
Link.prototype.draw = function(){
	mainContext.strokeStyle=this.color;
	mainContext.beginPath(this.startPos.x,this.startPos.y)
	mainContext.lineTo(this.endPos.x,this.endPos.y);
	mainContext.stroke();
}
Link.prototype.checkDistance = function()
{
	this.startPos = {x:player1.x,y:player1.y};
	this.endPos   =	{x:player1.x,y:player1.y};
	var distance=m_dist(this.startPos,this.endPos);
	if(distancethis.distanceMin){

	}
}
Link.prototype.manager = function (carac,coef){
	var caracLower = carac.toLowerCase();
	switch (caracLower){
		case "life":
			this.life += 1*coef;
			break;
		case "ammo":
			this.ammo += 1*coef;
			break;
	}
}
