/*****************************
*   Fonctions mathématiques
******************************/
//Fonction carré
function m_sqr(x)
{
    return x*x;
}

//Calcul de la distance entre 2 points A et B, implique que A et B soit des objets ayant des propriété x et y
function m_dist(a, b)
{
    return Math.sqrt(m_sqr(b.x - a.x) + m_sqr(b.y - a.y));
}

//Calcul d'un angle en radian entre 2 points A et B
function m_angleRad(a, b)
{
    return Math.atan2(a.x - b.x, a.y - b.y);
}

//Calcul d'un angle en degrés entre 2 points A et B
function m_angleDeg(a, b)
{
    var _a = Math.atan2(a.x - b.x, a.y - b.y);
    return _a * (180 / Math.PI);
}

//Compare 2 chiffres et retourne le plus grand
function m_compareN(a, b)
{
    if(a>b)
        return a;
    else
        return b;
}

//Retourne la moyenne entre plusieurs chiffres
function m_average(table)   //table -> tableau contenant les chiffres
{
    var _sum = 0;

    for(var i = 0; i < table.length; i=i+1)
    {
        _sum = _sum + table[i];
    }

    return _sum/table.length;
}

//Retourn l'ddition de 2 vecteurs
function m_addVec(vA, vB) //objets x, y (ex: {x: 2, y: 1})
{
    return {"x" : vA.x + vB.x, "y" : vA.y + vB.y};
}

//Retourne le module d'un vecteur
function m_modVec(v)    //objet x, y
{
    return Math.sqrt(v.x*v.x + v.y*v.y);
}

//Retourne la coordonnée {x, y} du milieu entre 2 points
function m_midPts(a, b) //{x, y}
{
    return {x: (a.x + b.x)/2, y: (a.y + b.y)/2};
}