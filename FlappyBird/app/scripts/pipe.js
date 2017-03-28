window.Pipe = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 60;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY_SPEED = 15; // 25
	var GRAVITY = false;

	var Pipe = function(el, game, y_pos, x_pos) {
		this.el = el;
		this.game = game;
		this.pos = { x: y_pos, y: x_pos };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipe.prototype.reset = function(x_pos, y_pos) {
		GRAVITY = false;
		this.pos.x = x_pos;
		this.pos.y = y_pos;
	};

	Pipe.prototype.onFrame = function(delta) {
		if (GRAVITY) {
			this.pos.x -= delta * GRAVITY_SPEED;
		}
		if (Controls.keys.space) {
			GRAVITY = true;
		}

		if(this.pos.x < -20) {
			this.pos.x += 120;
		}

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	return Pipe;

})();
