var Link = function(player1,player2){
	this.startPos = {x:player1.x,y:player1.y};
	this.endPos   =	{x:player2.x,y:player2.y};
	this.player1=player1;
	this.player2=player2;
	this.color="rgb(0,0,255)";
	this.life=3;
	this.ammo=1000;
	this.distanceMin=50;
	this.timeD;
}
Link.prototype.render = function(){
	mainContext.strokeStyle=this.color;
	mainContext.beginPath();
	mainContext.lineWidth=4;
	mainContext.moveTo(this.startPos.x,this.startPos.y);
	mainContext.lineTo(this.endPos.x,this.endPos.y);
	mainContext.stroke();
	mainContext.closePath();
}
Link.prototype.update = function(){
	this.checkDistance()
	this.render();
	this.death();
}
Link.prototype.checkDistance = function()
{
	this.startPos = {x:this.player1.x+this.player1.width/2,y:this.player1.y+this.player1.height/2};
	this.endPos   =	{x:this.player2.x+this.player2.width/2,y:this.player2.y+this.player2.height/2};
	var distance=m_dist(this.startPos,this.endPos);
	if(distance>=this.distanceMin && distance<=this.distanceMin+150 ){
		this.color="rgb(255,0,0)";
		this.player1.shootDisable=true;
		this.player2.shootDisable=true;
	}
	else if(distance>=this.distanceMin+150 && distance<=this.distanceMin+300 ){
		this.color="rgb(0,255,0)";

		this.player1.shootDisable=false;
		this.player2.shootDisable=false;
	}

	else if(distance>=this.distanceMin+300 && distance<=this.distanceMin+450 ){
		this.color="rgb(255,163,25)";

		this.player1.shootDisable=false;
		this.player2.shootDisable=false;
		window.clearTimeout(this.timed);
	}
	else if(distance>=this.distanceMin+450 && distance<=this.distanceMin+600 ){
		this.color="rgb(255,0,0)";
		this.player1.shootDisable=false;
		this.player2.shootDisable=false;
		this.warning();
	}
	////console.log(distance);
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
Link.prototype.warning = function(){
	//console.log("startCountdown");
	var _this=this;
	this.timeD=window.setTimeout(function(){
		_this.player1.x=_this.player2.x;
		_this.player1.y=_this.player2.y;
	},2000);
}

var once = true;

Link.prototype.death = function(){
	if(this.life==0){
		if(once)
		{
			alert("GAME OVER");
			once = false;
		}
		window.location.href="GameOver.html";
	}
}