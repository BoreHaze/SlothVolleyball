(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball = {};
	};

	var Ball = SlothVolleyball.Ball = function(pos, rad, game) {

		var vel = 0;
		var astParams = {};
		astParams.pos = pos;
		astParams.game = game;
		astParams.vel = vel;
		astParams.rad = rad;
		astParams.color = Ball.COLOR;
		SlothVolleyball.MovingObject.call(this, astParams);
	};

	Ball.COLOR = "grey";
	SlothVolleyball.Utils.inherits(Ball, SlothVolleyball.MovingObject);

	Ball.prototype.collideWith = function (otherObject) {

	}
  
  Ball.prototype.draw = function(ctx) {
		var path = new Path2D();
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		path.arc(this.pos[0], this.pos[1], this.rad, 0, Math.PI*2, true);
		ctx.fill(path);
	};

})();
