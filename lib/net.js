(function(){
  if(typeof SlothVolleyball === 'undefined'){
    window.SlothVolleyball = {};
  }

  var Net = SlothVolleyball.Net = function(width, game){
    this.game = game;
    this.width = width;
    this.height = game.DIM_Y/6;
    this.pos_x = (this.game.DIM_X - this.width)/2;
    this.pos_y = (this.game.DIM_Y - this.height);
    this.color = Net.COLOR;
  }

  Net.COLOR = "black";

  Net.prototype.draw = function(ctx){
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos_x, this.pos_y, this.width, this.height);
  }

})();
