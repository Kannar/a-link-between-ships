var Ennemy = function(params)
{
    this.x = params.x || 555;
    this.y = params.y || 355;

    this.width = params.width || 35;
    this.height = params.height || 35;

    this.focus = params.focus || console.error("Need a target");   //Minimum: {x, y}

    this.speed = params.speed || 1;

    this.angle = 0;

    this.update = function()
    {
        this.majPos();

        this.render();
    }

    this.render = function()
    {
        mainContext.fillStyle = "rgb(255, 25, 25)";
        mainContext.fillRect(this.x, this.y, this.width, this.height);
    }

    this.majPos = function()
    {
        this.angle = m_angleDeg(this, this.focus);

        this.x = this.x + Math.cos(this.angle) * this.speed;
        this.y = this.y - Math.sin(this.angle) * this.speed;
    }
}