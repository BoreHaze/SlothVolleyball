(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball = {};
	};

	var GameView = SlothVolleyball.GameView = function(dim_x ,dim_y, num_players){
		this.game = new SlothVolleyball.Game(dim_x ,dim_y, num_players);
		this.ctx = window.document.getElementById('canvas').getContext('2d');
	};

	GameView.prototype.start = function(){
		var gv = this;
		gv.game.draw(gv.ctx);

		setInterval(function(){
			gv.game.step();
      gv.game.draw(gv.ctx);
		}, 20);
	};


})();
