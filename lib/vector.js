(function(){
  if(typeof SlothVolleyball === 'undefined'){
    window.SlothVolleyball = {};
  }

  var Vector = SlothVolleyball.Vector = function(arr){
    this.x = arr[0];
    this.y = arr[1];
  }

  Vector.prototype.add = function(otherVec) {
    this.x += otherVec.x;
    this.y += otherVec.y;
  }

  Vector.prototype.subtract = function(otherVec) {
    this.x -= otherVec.x;
    this.y -= otherVec.y;
  }

  Vector.prototype.multiply = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  Vector.prototype.divide = function(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }

  Vector.prototype.magnitude = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  Vector.prototype.nomralize = function() {
    var mag = this.magnitude();
    if (mag !== 0){
      this.divide(mag);
    }
  }

})();
