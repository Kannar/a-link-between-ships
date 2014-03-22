define(["app", "utils", "world", "bullet"], function(app, utils, world, Bullet) {
    var Player = function Player(params) 
    {
        this.id          = params.id;
        this.tag         = params.tag;
        this.playerID    = params.playerID;
        this.size        = params.size;
        this.speed       = app.playerSpeed;
        this.gamepad     = params.gamepad;
        this.shotTime    = new Date().getTime();
        this.delay       = 400;
        this.sightRadius = 85;
        this.img         = new Image();
        this.viewActive  = true;
        this.alive       = true;
        this.life        = params.life || 5;
        this.frag        = 0;
        this.buttonDown  = false;
        this.wanted      = false;

        this.activeFiltersPatterns = [];
        this.unlockedColors = [];
/*        this.addFilterPattern(0);
        this.addFilterPattern(1);
        this.addFilterPattern(2);
        this.addFilterPattern(3);*/

        switch(this.playerID)
        {
            case 0:
                this.position = {
                    x : app.topLeftAnchor.x + 10,
                    y : app.topLeftAnchor.y + 10,
                }
                this.color   = "red";
                this.idColor = 0;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
            case 1:
                this.position = {
                    x : app.topRightAnchor.x - this.size.x - 10,
                    y : app.topRightAnchor.y + 10,
                }
                this.color   = "red";
                this.idColor = 1;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
            case 2:
                this.position = {
                    x : app.bottomLeftAnchor.x + 10,
                    y : app.bottomLeftAnchor.y - this.size.y - 10,
                }
                this.color   = "red";
                this.idColor = 2;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
            case 3:
                this.position = {
                    x : app.bottomRightAnchor.x - this.size.x - 10,
                    y : app.bottomRightAnchor.y - this.size.y - 10,
                }
                this.color   = "red";
                this.idColor = 3;
                this.img.src = app.images["player" + (this.playerID+1)][this.idColor];
            break;
        }

        this.update = function()
        {
            if (this.alive)
            {
                this.move();
                this.collisions();
                this.render();
                this.controls();

                if (this.shotTime + this.delay < new Date().getTime())
                {                
                   this.shoot();
                }
            }
        }
    }

    Player.prototype.controls = function()
    {
        if (this.gamepad.buttons[10] > 0 && !this.buttonDown)
        {
            this.viewActive = !this.viewActive;
            this.buttonDown = true;
        }
        
        if (this.gamepad.buttons[10] === 0 && this.buttonDown)
        {
            this.buttonDown = false;
        }
    }

    Player.prototype.addFilterPattern = function(filterColor)
    {
        if (this.unlockedColors.indexOf(filterColor) < 0)
        {
            this.unlockedColors.push(filterColor);
            this.activeFiltersPatterns.push(app.ctx.createPattern(app.buffers[filterColor].canvas,"no-repeat"));            
        }
    }

    Player.prototype.renderFilter = function(patNum)
    {
        app.ctx.fillStyle = this.activeFiltersPatterns[patNum];
        app.ctx.beginPath();
        app.ctx.arc(this.position.x+this.size.x/2, this.position.y+this.size.y/2, this.sightRadius, 0, Math.PI*2);
        app.ctx.fill();
    }

    Player.prototype.render = function()
    {
        
        if (this.viewActive)
        {
            for (var i = 0; i < this.activeFiltersPatterns.length; i++)
            {
                this.renderFilter(i);
            }

            app.ctx.beginPath();
            app.ctx.lineWidth   = 1;
            app.ctx.strokeStyle = "rgba(0,0,0,0.5)";
            app.ctx.arc(this.position.x+this.size.x/2, this.position.y+this.size.y/2, this.sightRadius, 0, Math.PI*2);
            app.ctx.stroke();

        }

        if (this.getCurrentCaseColor() != this.idColor && this.getCurrentCaseColor() != this.idColor+4 || this.viewActive ||
           ((this.gamepad.axes[2] > 0.4 || this.gamepad.axes[2] < -0.4) || (this.gamepad.axes[3] > 0.4 || this.gamepad.axes[3] < -0.4)) ||
           ((this.gamepad.axes[0] > 0.2 || this.gamepad.axes[0] < -0.2) || (this.gamepad.axes[1] > 0.2 || this.gamepad.axes[1] < -0.2))) 
        {
            app.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
        }

        if(this.wanted)
        {
            app.ctx.beginPath();
            app.ctx.lineWidth   = 3;
            app.ctx.strokeStyle = "rgb(255,0,0)";
            app.ctx.strokeRect(this.position.x - 3, this.position.y, this.size.x + 6, this.size.y);
        }
    }

    Player.prototype.move = function()
    {
        this.lastPos = { x : this.position.x, y : this.position.y };

        if (this.gamepad.axes[0] > 0.2 || this.gamepad.axes[0] < -0.2)
            this.position.x += this.gamepad.axes[0] * this.speed;
        if (this.gamepad.axes[1] > 0.2 || this.gamepad.axes[1] < -0.2) 
            this.position.y += this.gamepad.axes[1] * this.speed;
    }

    Player.prototype.getCurrentCaseColor = function()
    {
        var cases = world.findGameObjectsWithTag("case");
        for (var i = 0; i < cases.length; i++)
        {
            if ((this.position.x + this.size.x > cases[i].position.x && this.position.x < cases[i].position.x + cases[i].size.x) &&
                (this.position.y + this.size.y > cases[i].position.y && this.position.y < cases[i].position.y + cases[i].size.y))
            {
                return cases[i].tileNum-1;
            }
        }
    }

    Player.prototype.shoot = function()
    {
        var speedVector = null;
        if (this.gamepad.axes[2] > 0.4 || this.gamepad.axes[2] < -0.4)
        {
            speedVector = { x : this.gamepad.axes[2], y : this.gamepad.axes[3] };
        }
        if (this.gamepad.axes[3] > 0.4 || this.gamepad.axes[3] < -0.4)
        {
            speedVector = { x : this.gamepad.axes[2], y : this.gamepad.axes[3] };  
        }

        if (speedVector != null)
        {
            world.gameObjects.push(new Bullet({
                tag : "bullet",
                position : { x : this.position.x + this.size.x/2, y : this.position.y + this.size.y/2 },
                speedVector : speedVector,
                color : this.color,
                ownerID : this.id
            }));
            this.shotTime = new Date().getTime();
        }
    }

    Player.prototype.die = function()
    {
        this.position = 
        {
            x : Math.floor(Math.random() * (app.GAME_WIDTH - this.size.x)),
            y : Math.floor(Math.random() * (app.GAME_HEIGHT - this.size.y))
        }
        
        this.previousColor = this.img.src;

        while(this.img.src == this.previousColor)
        {
            var newColorIndex = Math.floor((Math.random()*4));
            this.idColor = newColorIndex;
            this.img.src = app.images["player" + (this.playerID+1)][newColorIndex];
        }

        if (app.gameMode === "limited_life")
        {
            if (this.life > 1)
            {
                this.life--;
            }
            else
            {
                this.alive = false;
                app.stillAlive--;
            }
        }
    }

    Player.prototype.collisions = function()
    {
        //limits
        if (this.position.x + this.size.x > app.GAME_WIDTH || this.position.y + this.size.y > app.GAME_HEIGHT ||
            this.position.x < 0   || this.position.y < 0) 
        {
            this.position.x = this.lastPos.x;
            this.position.y = this.lastPos.y;
        }

/*        var cases = world.findGameObjectsWithTag("case");
        for (var i = 0; i < cases.length; i++)
        {
            if (cases[i].tileNum > 3 && cases[i].tileNum < 8)
            {
                if (this.position.x + this.size.x >= cases[i].position.x && this.position.x <= cases[i].position.x + cases[i].size.x &&
                    this.position.y + this.size.y >= cases[i].position.y && this.position.y <= cases[i].position.y + cases[i].size.y)
                {
                    this.position.x = this.lastPos.x;
                    this.position.y = this.lastPos.y;                
                }                
            }
        }*/
    }

    Player.prototype.addFrag = function(x)
    {
        this.frag += x;
    }

    Player.prototype.addLife = function()
    {
        this.life++;
    }

    return Player;
});
