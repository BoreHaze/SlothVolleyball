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

	Ball.COLOR = "grey";
	SlothVolleyball.Utils.inherits(Ball, SlothVolleyball.MovingObject);

	Ball.prototype.collideWithSloth = function(sloth){
		if (this.pos.x > sloth.pos.x){
			var hDist = sloth.pos.x - this.pos.x;
		} else {
			var hDist = this.pos.x - sloth.pos.x;
		}
		var vDist = sloth.pos.y - this.pos.y;
		if (vDist < 0) { return; }
		var angle = Math.atan(vDist/hDist);
		if (this.vel.x === 0 && angle !== -1 * (Math.PI/2)){
			this.vel.x = 10/((Math.PI/2) + angle)
		}
		this.vel.add(SlothVolleyball.Vector.multiply(sloth.vel, 0.2));
		this.vel.multiply(angle * 0.8);

	}

	Ball.prototype.collideWithWall = function(){
		this.vel.x *= -1;
		this.vel.y *= 0.9;
	};
	Ball.prototype.collideWithNet = function(){
		if (this.netCollisionsOff) {return;}

		this.vel.x *= -1;
		this.vel.y *= 1.1;
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
				}, 30)
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

		ctx.strokeStyle = "red";
		var velLine = new Path2D();
		velLine.moveTo(this.pos.x, this.pos.y);
		velLine.lineTo(this.pos.x + this.vel.x, this.pos.y + this.vel.y);
		ctx.stroke(velLine);
	};

  Ball.prototype.atGround = function() {
    return (this.pos.y + this.rad >= this.game.DIM_Y);
  }

	Ball.prototype.atNet = function() {
		 return ((this.pos.x >= (this.game.net.pos_x - this.game.net.width/2) - this.rad  && this.pos.x <= (this.game.net.pos_x + this.game.net.width/2) + this.rad) && (this.pos.y >= this.game.net.pos_y))
	}


})();
