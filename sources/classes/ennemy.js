/*********************************
*   Class Ennemy
type : 0 = player 1 rusher
       1 = player 2 rusher
	   2 = link rusher
*********************************/
var Ennemy = function(params)
{
    this.x = params.x;
    this.y = params.y;

    this.width = params.width || 40;
    this.height = params.height || 60;
	this.img = new Image();
	this.spawnTimer = params.spawnTimer;
	this.spawned = false;
	this.type = params.type;
    
	if(this.type == 0){
	   this.focus = gameobjects[0][0];
       this.img.src="sources/media/charge.png";
    }
	if(this.type == 1){
	   this.focus = gameobjects[0][1];
       this.img.src="sources/media/charge.png";
    }
	if(this.type == 2){
	   this.focus = m_midPts(gameobjects[0][0], gameobjects[0][1]);
       this.img.src="sources/media/slayer.png";
    }
	
	this.speed = params.speed || 1;

    this.angle = 0;

    this.toDestroy = false;

    this.update = function()
    {
		if(this.spawned == true)
		{
			this.comport();

			this.majPos();

			this.render();
		}
		if(this.spawned == false)
		{
			this.spawnTimer --;
			if(this.spawnTimer <= 0)
			{
				this.spawned = true;
			}
		}
    }

    this.render = function()
    {
        mainContext.fillStyle = "rgb(255, 25, 25)";
        mainContext.drawImage(this.img,this.x, this.y, this.width, this.height);
    }

    this.majPos = function()
    {
        // this.angle = m_angleDeg(this, this.focus);

        // this.x = this.x + Math.cos(this.angle) * this.speed;
        // this.y = this.y - Math.sin(this.angle) * this.speed;

        //Maj pos x
        if(this.focus.x < (this.x + this.speed))
            this.x -= this.speed;
        else if(this.focus.x > (this.x - this.speed))
            this.x += this.speed;
        //Maj pos y
        if(this.focus.y < (this.y + this.speed))
            this.y -= this.speed;
        else if(this.focus.y > (this.focus.y - this.speed))
            this.y += this.speed;
    }

    this.comport = function()   //Fonction servant à set un comportement spécial si besoin
    {

    } 

    this.death = function(index)
    {
        gameobjects[2].splice(index, 1);

        var explosion = new Explosion(this.x+this.width/2,this.y+this.height/2, 0);
        explosionTable.push(explosion);
    }
}

/********************************
*   Ajout de comportements
********************************/
//Ennemy qui split
function addSplitComport(object)
{
    object.focus = m_midPts(gameobjects[0][0], gameobjects[0][1]);
    object.distMin = 100;

    object.comport = function()
    {
        object.focus = m_midPts(gameobjects[0][0], gameobjects[0][1]);

        if(m_dist(object, object.focus) <= object.distMin)
        {
            gameobjects[2].push(new Ennemy({x: this.x, y: this.y, focus: gameobjects[0][0]}));
            gameobjects[2].push(new Ennemy({x: this.x, y: this.y, focus: gameobjects[0][1]}));

            object.toDestroy = true;
        }
    }
}