(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball = {};
	};

	var Ball = SlothVolleyball.Ball = function(pos, game) {

		var vel = 0;
		var ballParams = {};
		this.slothCollisionsOff = false;
		this.wallCollisionsOff = false;
		this.netCollisionsOff = false;
		ballParams.pos = pos;
		ballParams.game = game;
		ballParams.vel = this.setStartingVelocity();
		ballParams.rad = 20;
		ballParams.color = Ball.COLOR;
		SlothVolleyball.MovingObject.call(this, ballParams);
	};

	Ball.COLOR = "yellow";
	SlothVolleyball.Utils.inherits(Ball, SlothVolleyball.MovingObject);

	Ball.prototype.collideWithSloth = function(sloth){

		var hDist = sloth.pos.x - this.pos.x;
		var vDist = sloth.pos.y - this.pos.y;

		// var hDist = (this.pos.x + this.rad) - (sloth.pos.x + sloth.rad);
		// var vDist = (this.pos.y + this.rad) - (sloth.pos.y + sloth.rad);
		if (vDist <= 0) { return; }

		// var angle = Math.atan((-1 * hDist)/vDist);
		// this.vel.x = (Math.sin(angle) * (8.5)) + (0.05 * sloth.vel.x);
		// this.vel.y = (-1 * Math.cos(angle) * (8.5)) + (0.05 * sloth.vel.y);

		var refSlope = -1 * (hDist/vDist);
		var velSlope = (this.vel.y/this.vel.x);

		var refAngle = Math.atan(refSlope);
		var velAngle = Math.atan(velSlope);


		this.vel.multiply(-1*Math.abs(velAngle - refAngle));
		// var angle = Math.atan((refAngle - velAngle)/(1 + velAngle*refAngle))
		// this.vel.multiply(angle);
		this.vel.add(sloth.vel);

		// var angle = Math.atan2(vDist, hDist);
		// if (this.vel.x === 0 && angle !== -1 * (Math.PI/2)){
		// 	this.vel.x = 10/((Math.PI/2) + angle)
		// }
		// this.vel.multiply(angle);
		// this.vel.x *= angle;
		// this.vel.x += sloth.vel.x;
		//
		// this.vel.y *= angle;
		// this.vel.y += sloth.vel.y
		// this.vel.y = -1 * Math.abs(this.vel.y)
	}

	Ball.prototype.collideWithWall = function(){
		this.vel.x *= -1;
		this.vel.y *= 0.5;
	};
	Ball.prototype.collideWithNet = function(){
		if (this.netCollisionsOff) {return;}

		this.vel.x *= -1;
		this.vel.y *= 0.5;
		this.netCollisionsOff = true;
		window.setTimeout( function(){
			this.netCollisionsOff = false;
		}.bind(this), 30)
	};

	Ball.prototype.move = function(){
		this.checkCollisions();
		SlothVolleyball.MovingObject.prototype.move.call(this);
	}

	Ball.prototype.checkCollisions = function(){
		var ball = this;
		if (this.slothCollisionsOff) { return; }
		this.game.sloths.forEach( function(sloth){
			if (ball.isCollidedWith(sloth)){
				ball.slothCollisionsOff = true;
				window.setTimeout( function(){
					ball.slothCollisionsOff = false;
				}, 90)
				ball.collideWithSloth(sloth);
			}
		});
	}

  Ball.prototype.setStartingVelocity = function(){
    // var x = (Math.random() * 10) - 5
		// return [x, 0];
		return [-10, 0];
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
		 return ((this.pos.x >= (this.game.net.pos_x - this.game.net.width/2) - this.rad  && this.pos.x <= (this.game.net.pos_x + this.game.net.width/2) + this.rad) && (this.pos.y >= this.game.net.pos_y))
	}


})();
//
