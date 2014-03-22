define(["world", "app", "map", "case"], function(world, app, map, Case) {
    function fillFilter(filter, tileNum, filterColorNum)
    {
        if (tileNum === filterColorNum || tileNum === filterColorNum+4)
        {
            filter.push(tileNum);
        }
        else
        {
            filter.push(0);
        }
    }

    function fillBuffer(filter, bufferNum)
    {
        for (var i = 0; i < filter.length; i++)
        {
            if (filter[i] > 0)
            {
                var newCase = new Case({
                    tag : "case",
                    size : { x : app.CASE_SIZE, y : app.CASE_SIZE },
                    position : { x : i%16 * app.CASE_SIZE, y : Math.floor(i/16) * app.CASE_SIZE},
                    tileNum : filter[i]
                });
                newCase.render(bufferNum);
                world.gameObjects.push(newCase);
            }
        }
    }

    return function()
    {
        for (var i = 0; i < map.full.length; i++)
        {
            fillFilter(map.purpleFilter, map.full[i], 1);
            fillFilter(map.yellowFilter, map.full[i], 2);
            fillFilter(map.pinkFilter,   map.full[i], 3);
            fillFilter(map.greenFilter,  map.full[i], 4);
            fillFilter(map.background,   map.full[i], 9);
        }

        fillBuffer(map.purpleFilter, 0);
        fillBuffer(map.yellowFilter, 1);
        fillBuffer(map.pinkFilter, 2);
        fillBuffer(map.greenFilter, 3);
        fillBuffer(map.background, 4);
    }
});