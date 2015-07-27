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

	Ball.prototype.collideWithSloth = function (sloth) {
    //get angle on sloth
    //x-vel = -former-x-vel *
	}


  Ball.prototype.setStartingVelocity = function(){
    var x = (Math.random() * 10) - 5
		return [x, 0];
  }

  Ball.prototype.draw = function(ctx) {
		var path = new Path2D();
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		path.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2, true);
		ctx.fill(path);
	};

  Ball.prototype.atGround = function() {
    return (this.pos.y + this.rad >= this.game.DIM_Y);
  }

	Ball.prototype.atNet = function() {
		return ((this.pos.x + this.rad >= this.game.net.x_pos) && (this.pos.x - this.rad <= (this.game.net.x_pos + this.game.net.width))) && (this.pos.y + this.rad > this.game.net.y_pos);
	}


})();
