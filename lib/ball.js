(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball = {};
	};

	var Ball = SlothVolleyball.Ball = function(pos, game) {

		var vel = 0;
		var ballParams = {};
		this.collisionsOff = false;
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
		this.vel.multiply(angle * 0.8);
		// this.vel.add(SlothVolleyball.Vector.multiply(sloth.vel, 0.2));

	}

	Ball.prototype.collideWithWall = function(){
		this.vel.x *= -1;
		this.vel.y *= 0.9;
	};
	Ball.prototype.collideWithNet = function(){
		this.vel.x *= -1;
		this.vel.y *= 0.9;
	};

	Ball.prototype.move = function(){
		this.checkCollisions();
		SlothVolleyball.MovingObject.prototype.move.call(this);
	}

	Ball.prototype.checkCollisions = function(){
		var ball = this;
		if (this.collisionsOff) { return; }
		this.game.sloths.forEach( function(sloth){
			if (ball.isCollidedWith(sloth)){
				ball.collisionsOff = true;
				window.setTimeout( function(){
					ball.collisionsOff = false;
				}, 200)
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
		return ((this.pos.x + this.rad >= this.game.net.x_pos) && (this.pos.x - this.rad <= (this.game.net.x_pos + this.game.net.width))) && (this.pos.y + this.rad > this.game.net.y_pos);
	}


})();
