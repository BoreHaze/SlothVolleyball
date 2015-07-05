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

	}

  Sloth.prototype.draw = function(ctx) {
		var path = new Path2D();
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		path.arc(this.pos[0], this.pos[1], this.rad, 0, Math.PI, true);
		ctx.fill(path);
	};
})();
