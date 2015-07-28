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
		this.keyBindHandlers();

		// var img = new Image();
		// img.onload = function(){
		// 	gv.ctx.drawImage(img, -150,0);
		// };
    //
		// img.src = './space.jpg';

		setInterval(function(){
			gv.game.step();
      gv.game.draw(gv.ctx);
			// gv.game.draw(gv.ctx, img);
		}, 20);
	};




	GameView.prototype.keyBindHandlers = function () {
	// var gv = this;
	// key('up', function(){
	// 	gv.game.sloths[0].jump();
	// });
  //
	// 	key('down', function(){
	// 		gv.game.ship.power([0,1]);
	// 	});
  //
	// key('left', function(){
	// 	gv.game.sloths[0].moveLeft();
	// });
	//
	// key('right', function(){
	// 	gv.game.sloths[0].moveRight();
	// });
  //
	// 	key('space', function(){
	// 		gv.game.ship.fireBullet();
	// 	})
	};

})();
