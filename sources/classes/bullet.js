var Bullet = function(params)
{
    this.x      = params.x;
    this.y      = params.y;
    this.width  = params.width;
    this.height = params.height;
    this.id     = gameobjects[1].length;
    this.vx     = params.vx;
    this.vy     = params.vy;
    
    this.angle  = params.angle;
    
    this.speed  = params.speed || bulletPlayers_data.speed;

    this.toDestroy = false;

    this.update = function()
    {
        this.majPos();
        this.render();
        this.checkDead();
    }

    this.render = function()
    {
        mainContext.fillStyle = "rgb(25, 155, 25)";
        mainContext.fillRect(this.x, this.y, this.width, this.height);
    }

    this.majPos = function()
    {
        // this.x = this.x + this.vx;
        // this.y = this.y + this.vy;

        this.x = this.x + Math.cos(this.angle) * this.speed;
        this.y = this.y - Math.sin(this.angle) * this.speed;
    }

    this.checkDead = function()
    {
        if(this.x < -10 || this.y < -10 || this.x > 1034 || this.y > 760)
        {
            this.toDestroy = true;
        }
    }

}