/*************************************
*   Class Player
*************************************/
var Player = function(params)
{
    this.x        = params.x;
    this.y        = params.y;
    
    this.width    = params.width;
    this.height   = params.height;
    
    this.id       = params.id;    //Player 1 ou 2
    
    this.speedAcc = params.speedAcc || 2;
    this.speedMax = params.speedMax || 10;
    this.speedSlo = params.speedSlo || 1;
    this.vx       = 0;
    this.vy       = 0;

    this.update = function()
    {
        this.majPos();

        this.render();
    }

    this.render = function()
    {
        mainContext.fillStyle = "rgb(255, 255, 255)";
        mainContext.fillRect(this.x, this.y, this.width, this.height);
    }

    /********************************
    *   Mouvement
    ********************************/
    //Màj de la position de l'objet
    this.majPos = function()
    {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    //Acceleration
    this.accelerate = function(coeff)  //Coeff -> {x,y} valeure entre 0 et 1
    {
        if(m_average([this.vx, this.vy]) < this.speedMax)
        {
            this.vx = this.vx + (this.speedAcc*coeff.x);
            this.vy = this.vy + (this.speedAcc*coeff.y);
        }
    }

    //Deceleration
    this.slowDown = function()
    {
        var _coeff = {x: 0, y: 0};

        //On set les coeffs selon la vitesse actuelle
        if(this.vx > 0)
            _coeff.x = -1;
        else
            _coeff.x = 1;

        if(this.vy > 0)
            _coeff.y = -1;
        else
            _coeff.y = 1;

        //On applique la décélération
        //En X
        if(this.vx < -0.5 || this.vx > 0.5)
        {
            this.vx = this.vx + (_coeff.x*this.speedSlo);

            if(this.vx > -0.5 && this.vx < 0.5)
                this.vx = 0;
        }

        //En Y
        if(this.vy < -0.5 || this.vy > 0.5)
        {
            this.vy = this.vy + (_coeff.y*this.speedSlo);

            if(this.vy > -0.5 && this.vy < 0.5)
                this.vy = 0;
        }
    }
}