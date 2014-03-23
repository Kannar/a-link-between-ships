var explosionTable = [];


var Explosion = function(x,y,type)
{
this.x = x;
this.y = y;
this.type = type;

this.particlesTable = [];

for(i=0; i < particleData[this.type].nbParticles; i++)
{
	var dir = Math.PI * 2 * Math.random();
	var speed = Math.random() * particleData[this.type].particleSpeed + 1;
	var alpha = Math.floor(Math.random() * 10) / 10;
	
	var particle = new Particle(this,dir,speed,alpha);
	this.particlesTable.push(particle);

}

this.update = function()
{
	for(i = 0; i < this.particlesTable.length; i++)
	{
		this.particlesTable[i].update();
		if(this.particlesTable[i].lifetime <= 0)
		{
			this.particlesTable.splice(i,1);
		}
	}
	
}


}

var Particle = function(parent,direction,speed,alpha)
{
	this.mother = parent;
	this.x = this.mother.x;
	this.y = this.mother.y;
	this.type = this.mother.type;
	this.dir = direction;
	this.speed = speed;
	this.R = particleData[this.type].color.R;
	this.G = particleData[this.type].color.G;
	this.B = particleData[this.type].color.B;
	this.size = particleData[this.type].size;
	this.alpha = alpha;
	this.lifetime = particleData[this.type].lifetime;
	this.alphaLoose = particleData[this.type].alphaLoose;
	
	this.draw = function()
	{
		mainContext.fillStyle = this.color;
		/*mainContext.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		mainContext.closePath();
		mainContext.fill();*/
		mainContext.fillRect(this.x, this.y, 10, 10);
	}
	this.update = function()
	{	
		
		if(this.lifetime > 0)
		{
			this.x += Math.cos(this.dir) * this.speed;
			this.y += Math.sin(this.dir) * this.speed;

			this.color ="rgba("+ this.R + ","+ this.G + "," + this.B + "," + this.alpha + ")";
			this.draw();
			
			
			this.alpha -= this.alphaLoose;
			this.lifetime--;
		}
		
	}
	
	
}