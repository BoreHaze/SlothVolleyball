(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball= {};
	};

	var Game = SlothVolleyball.Game = function (dim_x ,dim_y, num_players) {
		this.DIM_X = dim_x;
		this.DIM_Y = dim_y;
		this.NUM_PLAYERS = num_players;

    this.ball = new SlothVolleyball.Ball([400, 300], this)
    this.sloths = [];
    this.sloths.push( new SlothVolleyball.Sloth([200, 600], this))
    this.sloths.push( new SlothVolleyball.Sloth([600, 600], this))
	};

  Game.prototype.allObjects = function() {
    return this.sloths.concat(this.ball);
  }

	Game.prototype.draw = function(ctx, img) {
		ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

		// ctx.drawImage(img, -150, 0);
		this.allObjects().forEach( function(obj){
			obj.draw(ctx);
		});

	};

	Game.prototype.moveObjects = function(){
		this.allObjects().forEach( function(obj){
			obj.move();
		});
	};


	Game.prototype.checkCollisions = function(){
		var objects = this.allObjects();
		for(var i = 0; i < objects.length - 1; i++){
			for(var j = i + 1; j < objects.length; j++){
				if (objects[i].isCollidedWith(objects[j])){
					objects[i].collideWith(objects[j]);
				};
			};
		};
	};

	Game.prototype.step = function(){
		this.moveObjects();
		// this.checkCollisions();
	}


	Game.prototype.outOfBounds = function (pos) {
		if(pos[0] > this.DIM_X ||
			 pos[0] < 0 ||
			 pos[1] > this.DIM_Y ||
			 pos[1] < 0) {
				return true;
			} else {
				return false;
			};
	};

})();
