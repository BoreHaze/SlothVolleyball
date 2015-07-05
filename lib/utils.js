(function(){
	if (window.SlothVolleyball === undefined) {
		window.SlothVolleyball = {};
	};

	SlothVolleyball.Utils = {};

	SlothVolleyball.Utils.inherits = function(child, parent) {
		function Surrogate () {};
  	Surrogate.prototype = parent.prototype;
  	child.prototype = new Surrogate();
	};

})();
