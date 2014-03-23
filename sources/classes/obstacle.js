var Obstacle = function(){
	this.x;
	this.y;
	this.width=40;
	this.height=40;
	this.color="rgb("+(Math.random()*255>>0)+","+(Math.random()*255>>0)+","+(Math.random()*255>>0)+")";
}

Obstacle.prototype.draw=function(){
	mainContext.fillStyle=this.color;
	mainContext.fillRect(this.x,this.y,this.width,this.height);
}
Obstacle.prototype.update=function(){
	this.draw();
}