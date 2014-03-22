/***************************************************************************************************
***  DESCRIPTION => debug tools
***  INPUT       => none
***  OUTPUT      => none
***************************************************************************************************/
define(["world"], function(world) {
    return function()
    {
        if (world.debugMode)
        {
            window.world = world;
        }
    }
});