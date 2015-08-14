(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball = {};
	};


	var MovingObject = SlothVolleyball.MovingObject = function(objParams) {
		this.pos = new SlothVolleyball.Vector(objParams.pos);
		this.vel = new SlothVolleyball.Vector(objParams.vel);
		this.rad = objParams.rad;
		this.color = objParams.color;
		this.game = objParams.game;
	};

  MovingObject.prototype.draw = function(ctx) {
  }

	MovingObject.prototype.move = function(){

		this.pos.add(this.vel);

    if (!this.atGround()){
      this.vel.y += (9.8 / 25);
			if (this instanceof SlothVolleyball.Sloth){
				this.vel.x *= 0.9;
			}
			if (this instanceof SlothVolleyball.Ball){
				if (this.vel.x > 15){
					this.vel.x = 15;
				}
				if (this.vel.x < -15){
					this.vel.x = -15;
				}
				if (this.vel.y < -20){
					this.vel.y = -20;
				}
			}
    }

    if (this.atGround()){
			this.pos.y = this.game.DIM_Y
      this.vel.y = 0;
			this.vel.x *= 0.9;
    }

		if (this.atNet()){
			this.collideWithNet();
		}

		if (this.atSideBoundry()){
			this.collideWithWall();
		}

	}


	MovingObject.prototype.isCollidedWith = function(otherObject) {
		var radSum = (this.rad + otherObject.rad);
		var xDist = Math.abs(this.pos.x - otherObject.pos.x);
		var yDist = Math.abs(this.pos.y - otherObject.pos.y);
		var centerDist = Math.sqrt((xDist*xDist) + (yDist*yDist));
		if (centerDist < radSum){
			return true;
		} else {
			return false;
		}
	}

	MovingObject.prototype.collideWith = function(otherObject) {
	};

	MovingObject.prototype.collideWithWall = function(){};
	MovingObject.prototype.collideWithNet = function(){};

  MovingObject.prototype.atSideBoundry = function() {
    return (this.pos.x - this.rad <= 0) || (this.pos.x + this.rad >= this.game.DIM_X);
  };

  MovingObject.prototype.atGround = function() {
    return (this.pos.y >= this.game.DIM_Y);
  };

	MovingObject.prototype.atNet = function() {
		return (this.pos.x >= (this.game.net.pos_x - this.game.net.width/2) - this.rad  && this.pos.x <= (this.game.net.pos_x + this.game.net.width/2) + this.rad);
	};



})();
