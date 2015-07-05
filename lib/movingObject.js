(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball = {};
	};


	var MovingObject = SlothVolleyball.MovingObject = function(objParams) {
		this.pos = objParams.pos;
		this.vel = objParams.vel;
		this.rad = objParams.rad;
		this.color = objParams.color;
		this.game = objParams.game;
	};

	// MovingObject.prototype.draw = function(ctx) {
	// 	var path = new Path2D();
	// 	ctx.strokeStyle = this.color;
	// 	ctx.fillStyle = this.color;
	// 	path.arc(this.pos[0], this.pos[1], this.rad, 0, Math.PI*2, true);
	// 	ctx.fill(path);
	// };

  MovingObject.prototype.draw = function(ctx) {
  }

	MovingObject.prototype.move = function(){
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];

    if (!this.atGround()){
      this.vel[1] += (9.8 / 25);
    }

    if (this.atGround()){
      this.vel[1] = 0;
    }
	}

	MovingObject.prototype.isCollidedWith = function(otherObject) {
		var radSum = (this.rad + otherObject.rad);
		var xDist = Math.abs(this.pos[0] - otherObject.pos[0]);
		var yDist = Math.abs(this.pos[1] - otherObject.pos[1]);
		var centerDist = Math.sqrt((xDist*xDist) + (yDist*yDist));
		if (centerDist < radSum){
			return true;
		} else {
			return false;
		}
	}

	MovingObject.prototype.collideWith = function(otherObject) {
	}

  MovingObject.prototype.atSideBoundry = function() {
    return (this.pos[0] <= 0) || (this.pos[0] >= this.game.DIM_X);
  }

  MovingObject.prototype.atGround = function() {
    return (this.pos[1] >= this.game.DIM_Y);
  }


})();
