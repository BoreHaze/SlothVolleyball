(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball = {};
	};

	var GameView = SlothVolleyball.GameView = function(dim_x, dim_y){
		this.game = new SlothVolleyball.Game(dim_x, dim_y);
	};

	GameView.prototype.start = function(ctx){
		this.ctx = ctx;
		var gv = this;

		gv.game.draw(gv.ctx);

		setInterval(function(){
			gv.game.step();
      gv.game.draw(gv.ctx);
		}, 20);
	};


})();
