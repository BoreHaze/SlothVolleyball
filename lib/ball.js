(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball = {};
	};

	var Ball = SlothVolleyball.Ball = function(pos, game) {

		var vel = 0;
		var ballParams = {};
		ballParams.pos = pos;
		ballParams.game = game;
		ballParams.vel = this.setStartingVelocity();
		ballParams.rad = 20;
		ballParams.color = Ball.COLOR;
		SlothVolleyball.MovingObject.call(this, ballParams);
	};

	Ball.COLOR = "grey";
	SlothVolleyball.Utils.inherits(Ball, SlothVolleyball.MovingObject);

	Ball.prototype.collideWith = function (otherObject) {

	}

  Ball.prototype.setStartingVelocity = function(){
    return [0,0];
  }

  Ball.prototype.draw = function(ctx) {
		var path = new Path2D();
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		path.arc(this.pos[0], this.pos[1], this.rad, 0, Math.PI*2, true);
		ctx.fill(path);
	};

})();
