(function(){
  if(typeof SlothVolleyball === 'undefined'){
    window.SlothVolleyball = {};
  }

  var Net = SlothVolleyball.Net = function(width, game){
    this.game = game;
    this.width = width;
    this.height = game.DIM_Y/6;
    this.x_pos = (this.game.DIM_X - this.width)/2;
    this.y_pos = (this.game.DIM_Y - this.height);
    this.color = Net.COLOR;
  }

  Net.COLOR = "black";

  Net.prototype.draw = function(ctx){
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x_pos, this.y_pos, this.width, this.height);
  }

})();
