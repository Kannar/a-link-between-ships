/*************************************
*   Class Player
*************************************/
var Player = function(params)
{
    //Basique
    this.x        = params.x ||0;
    this.y        = params.y || 0;
    this.width    = params.width || 40;
    this.height   = params.height || 68;
    this.id       = params.id || "player"+(Math.random()*255>>0);
    
    //Mouvement
    this.speedAcc = params.speedAcc || 2;
    this.speedMax = params.speedMax || 10;
    this.speedSlo = params.speedSlo || 1;
    this.vx       = 0;
    this.vy       = 0;
    this.img      = new Image();
    this.img.src  = params.src;
    //Shoot
    this.shootSpeed = params.shootSpeed;
    this.framesSinceLastShoot = 0;

    //Gamepad
    this.pad;

    this.update = function()
    {
        this.majPos();

      //  this.pad.update();

        this.render();
    }

    this.render = function()
    {
        mainContext.fillStyle = "rgb(25, 255, 25)";
        mainContext.drawImage(this.img,this.x, this.y, this.width, this.height);
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
    /*******************************/
    /********************************
    *   Shoot
    ********************************/
    this.shoot = function(coeff)
    {   
        if(this.framesSinceLastShoot/60 == this.shootSpeed)
        {
            var _params = bulletPlayers_data;
            _params.x = this.x;
            _params.y = this.y;
            _params.vx = bulletPlayers_data.speed*coeff.x;
            _params.vy = bulletPlayers_data.speed*coeff.y;

            gameobjects[1].push(new Bullet(_params));

            this.framesSinceLastShoot = 0;
        }
        else
            this.framesSinceLastShoot = this.framesSinceLastShoot + 1;
    }
}