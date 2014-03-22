define(["world", "app"], function(world, app) {
    return function()
    {   
        world.forAll(world.gameObjects, function(object) {
            if (object.position)
            {
                if (object.position.x > app.GAME_WIDTH    || object.position.y > app.GAME_HEIGHT ||
                    object.position.x + object.size.x < 0 || object.position.y + object.size.y < 0) 
                {
                    if (object.die) object.die();
                }
            }
        });

        for (var i = 0; i < world.gameObjects.length; i++)
        {
            if (world.gameObjects[i].dead)
            {
                world.gameObjects.splice(i, 1);
            }
        }
    }
})