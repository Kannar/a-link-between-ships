/*********************************
*   Class Ennemy
*********************************/
var Ennemy = function(params)
{
    this.x = params.x || 555;
    this.y = params.y || 355;

    this.width = params.width || 35;
    this.height = params.height || 35;

    this.focus = params.focus || console.error("Need a target");   //Minimum: {x, y}

    this.speed = params.speed || 1;

    this.angle = 0;

    this.toDestroy = false;

    this.update = function()
    {
        this.comport();

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

    this.comport = function()   //Fonction servant à set un comportement spécial si besoin
    {

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