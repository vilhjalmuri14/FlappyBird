window.Pipe = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 40;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY_SPEED = 25;
	var GRAVITY = false;

	var Pipe = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipe.prototype.reset = function(x_pos, y_pos) {
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

		//this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Pipe;

})();
