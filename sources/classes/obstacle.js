var Obstacle = function(){
	this.x;
	this.y;
	this.color="rgb("+(Math.random()*255>>0)+","+(Math.random()*255>>0)+","+(Math.random()*255>>0)+")";
}

Obstacle.prototype.draw=function(){
	mainContext.fillStyle=this.color;
	mainContext.fillRect(this.x,this.y,40,40);
}
Obstacle.prototype.update=function(){
	this.draw();
}