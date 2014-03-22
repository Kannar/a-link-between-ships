var Bullet = function(params)
{
    this.x      = params.x;
    this.y      = params.y;
    this.width  = params.width;
    this.height = params.height;
    
    this.vx     = params.vx;
    this.vy     = params.vy;

    this.toDestroy = false;

    this.update = function()
    {
        this.majPos();
        this.render();
    }

    this.render = function()
    {
        mainContext.fillStyle = "rgb(25, 155, 25)";
        mainContext.fillRect(this.x, this.y, this.width, this.height);
    }

    this.majPos = function()
    {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }
}