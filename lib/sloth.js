(function(){
  if(typeof SlothVolleyball === 'undefined'){
    window.SlothVolleyball = {};
  }
  var Sloth = SlothVolleyball.Sloth = function(pos, game) {

		var vel = 0;
		var slothParams = {};
		slothParams.pos = pos;
		slothParams.game = game;
		slothParams.vel = [0,0];
		slothParams.rad = 80;
		slothParams.color = Sloth.COLOR;
		SlothVolleyball.MovingObject.call(this, slothParams);
	};

	Sloth.COLOR = "green";
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
    this.vel.add(Sloth.leftVec);
  };

  Sloth.prototype.moveRight = function(){
    this.vel.add(Sloth.rightVec);
  };

  Sloth.prototype.jump = function(){
    if (this.atGround()){
      this.vel.add(Sloth.jumpVec);
    }
  };

})();
