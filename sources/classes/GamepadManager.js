var GamepadManager = function()
{
	this.maxPlayers = 1;
	this.connectedGamepads = 0;
	this.registeredGamepads = 0;
	
	this.update = function()
	{		
		this.checkGamepads();

		if(this.connectedGamepads == this.maxPlayers)
		{
			this.assignGamepads();
		}
	}
}

GamepadManager.prototype.checkGamepads = function()
{
	var rawGamepads = navigator.webkitGetGamepads && navigator.webkitGetGamepads();

	this.connectedGamepads = 0;

    for (var i = 0; i < rawGamepads.length; i++)
    {
		if(rawGamepads[i] != null)
		{
			this.connectedGamepads += 1;
		}
	}
    for (var i = 0; i < rawGamepads.length; i++)
	{
	   if (rawGamepads[i] != null && this.connectedGamepads != this.registeredGamepads)
		{
			console.log(rawGamepads);
            gamepads.push(rawGamepads[i]);
			this.registeredGamepads += 1;
		}
    }

    if(this.connectedGamepads < this.maxPlayers)
    	console.error(this.maxPlayers - this.connectedGamepads + " pad(s	) is missing.")
}

GamepadManager.prototype.assignGamepads = function()
{
	for(i = 0; i < this.maxPlayers; i++)
	{
		gameobjects[0][i].pad = gamepads[i];
	}
}