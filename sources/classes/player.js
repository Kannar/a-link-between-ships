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
                this.onMoveLeft=false;
            this.onMoveRight=false;
            this.onMoveBot=false;
            this.onMoveTop=false;
    //Mouvement
    this.speedAcc = params.speedAcc || 2;
    this.speedMax = params.speedMax || 7;
    this.speedSlo = params.speedSlo || 0.3;
    this.vx       = 0;
    this.vy       = 0;
    this.img      = new Image();
    this.img.src  = params.src;
    //Shoot
    this.shootSpeed = params.shootSpeed || 0.2;
    this.framesSinceLastShoot = 60;
    this.shootDisable=false;
    this.disableMoove=false;
    //Gamepad
    this.pad;

    this.update = function()
    {
        this.majPos();
        if(this.pad && !this.disableMoove)
        {
            this.moveWithPad();
            this.shootWithPad();
        }

        this.render();
        this.framesSinceLastShoot = this.framesSinceLastShoot + 1;
    }

    this.render = function()
    {
        mainContext.fillStyle = "rgb(25, 255, 25)";
        mainContext.drawImage(this.img,this.x, this.y, this.width, this.height);
    }

    /********************************
    *   Mouvement
    ********************************/
    //Bouger grace au pad
     this.moveWithPad = function()
    {
        var _onMove = false;

        if(this.pad.axes[0] < -0.25)   //Axe horizontal
        {
            onMove = true;
            this.onMoveLeft=true;
            this.onMoveRight=false;
        }
        if(this.pad.axes[0] > 0.25)   //Axe horizontal
        {
            onMove = true;

            this.onMoveLeft=false;
            this.onMoveRight=true;
        }

        if(this.pad.axes[1] > 0.25)
        {
            onMove = true;

            this.onMoveBot=true;
            this.onMoveTop=false;
        }
        if(this.pad.axes[1] < -0.25)
        {

            this.onMoveBot=false;
            this.onMoveTop=true;
        }
   // console.log(  this.onMoveLeft,this.onMoveRight,this.onMoveTop,this.onMoveBot);

        if(this.onMoveLeft)   //Axe horizontal
        {
            this.accelerateX(this.pad.axes[0]);
        }
        if(this.onMoveRight)   //Axe horizontal
        {
            this.accelerateX(this.pad.axes[0]);
        }

        if(this.onMoveBot)
        {
            this.accelerateY(this.pad.axes[1]);
        }
        if(this.onMoveTop)
        {
            this.accelerateY(this.pad.axes[1]);
        }
        if(!_onMove)
            this.slowDown();
    }

    //Màj de la position de l'objet
    this.majPos = function()
    {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    //Acceleration
    this.accelerateX = function(coeffX)  //CoeffX -> valeur entre 0 et 1
    {
        if(Math.abs(this.vx) < this.speedMax)
        {
            this.vx = this.vx + (this.speedAcc*coeffX);
        }
    }
    this.accelerateY = function(coeffY)  //CoeffY -> valeur entre 0 et 1
    {
        if(Math.abs(this.vy) < this.speedMax)
        {
            this.vy = this.vy + (this.speedAcc*coeffY);
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
            this.vx = this.vx + (_coeff.x*this.speedSlo*2);

        }
        else if((this.vx <0.25 && this.vx > 0)||(this.vx >-0.25 && this.vx <0))
        {
            this.vx=0;
            this.onMoveLeft=false;
            this.onMoveRight=false;
           // console.log(this.vx)
        }
        //En Y
        if(this.vy < -0.5 || this.vy > 0.5)
        {
            this.vy = this.vy + (_coeff.y*this.speedSlo*4);

        }
        else if((this.vy<0.25 && this.vy>0)||(this.vy>-0.25 && this.vy<0))
        {
            
            this.vy=0;
             this.onMoveBot=false;
            this.onMoveTop=false;
        console.log("vitesse Y :"+this.vy)
        }
       // console.log("vitesse X : "+this.vx)
    }
    /*******************************/
    /********************************
    *   Shoot
    ********************************/
    this.shoot = function(coeff)
    {   

        if(this.framesSinceLastShoot/60 >= this.shootSpeed && !this.shootDisable)
        {
            console.log("canshoot");
            var _params = bulletPlayers_data;
            _params.x = this.x + this.width/2 - bulletPlayers_data.width/2;
            _params.y = this.y + this.height/2 - bulletPlayers_data.height/2;
            _params.vx = bulletPlayers_data.speed*coeff.x;
            _params.vy = bulletPlayers_data.speed*coeff.y;

            gameobjects[1].push(new Bullet(_params));

            console.log(coeff);

            this.framesSinceLastShoot = 0;
        }
    }

    this.shootWithPad = function()
    {
        var _coeff = {x: 0, y: 0};

        if(this.pad.axes[2] < -0.35)    //Horizontal (gauche)
        {
            _coeff.x = this.pad.axes[2];
        }
        else if(this.pad.axes[2] > 0.35)    //Horizontal (droite)
        {
            _coeff.x = this.pad.axes[2];
        }

        if(this.pad.axes[3] < -0.35)    //Vertical (droite)
        {
            _coeff.y = this.pad.axes[3];
        }
        else if(this.pad.axes[3] > 0.35)    //Vertical (gauche)
        {
            _coeff.y = this.pad.axes[3];
        }

        if((_coeff.x != 0) || (_coeff.y != 0))
        {
            this.shoot(_coeff);
        }
    }
    this.death = function()
    {

        var explosion = new Explosion(this.x+this.width/2,this.y+this.height/2, 0);
        explosionTable.push(explosion);
        var link = gameobjects[0][2];
        link.life--;
         this.vy=0;
         this.vx=0;
        window.setTimeout(this.respawn,1000);
        if(link.player1.id!=this.id){
            this.x=link.player1.x;
            this.y=link.player1.y;
        }
        else{
            this.x=link.player2.x;
            this.y=link.player2.y;
        }
        this.disableMoove=true;
        var _this=this;
        window.setTimeout(function(){
            _this.disableMoove=false;
        },1000);
    }
}