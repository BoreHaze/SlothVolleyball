(function(){
  if(typeof SlothVolleyball === 'undefined'){
    window.SlothVolleyball = {};
  }
  var Sloth = SlothVolleyball.Sloth = function(isLeft, pos, game) {

		var vel = 0;
		var slothParams = {};
    this.isLeft = isLeft;
		slothParams.pos = pos;
		slothParams.game = game;
		slothParams.vel = [0,0];
		slothParams.rad = 80;
		slothParams.color = Sloth.COLOR;
		SlothVolleyball.MovingObject.call(this, slothParams);
	};

	Sloth.COLOR = "purple";
	SlothVolleyball.Utils.inherits(Sloth, SlothVolleyball.MovingObject);

	Sloth.prototype.collideWith = function (otherObject) {

	};

  Sloth.prototype.draw = function(ctx) {
		var path = new Path2D();
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		path.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI, true);
		ctx.fill(path);
	};

  Sloth.leftVec = new SlothVolleyball.Vector([-10, 0]);
  Sloth.rightVec = new SlothVolleyball.Vector([10, 0]);
  Sloth.jumpVec = new SlothVolleyball.Vector([0, -10]);

  Sloth.prototype.moveLeft = function(){
    if (this.vel.x < -10){
      this.vel.x *= 0.3;
    }
    this.vel.add(Sloth.leftVec);
  };

  Sloth.prototype.moveRight = function(){
    if (this.vel.x > 10){
      this.vel.x *= 0.3;
    }
    this.vel.add(Sloth.rightVec);
  };

  Sloth.prototype.jump = function(){
    if (this.atGround()){
      this.vel.add(Sloth.jumpVec);
    }
  };

  Sloth.prototype.collideWithWall = function(){
    if (this.pos.x <= 0 + this.rad){
      this.pos.x = 0 + this.rad;
    } else if (this.pos.x >= this.game.DIM_X - this.rad){
      this.pos.x = this.game.DIM_X - this.rad;
    }
  };

  Sloth.prototype.collideWithNet = function(){
    this.vel.x = 0;
    if(this.isLeft){
      this.pos.x = this.game.net.pos_x - this.rad;
    } else {
      this.pos.x = this.game.net.pos_x + (this.game.net.width/2) + this.rad;
    }
  }

})();
