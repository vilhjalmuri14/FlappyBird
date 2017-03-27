window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 9;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY_SPEED = 25;
	var GRAVITY = false;

	var Player = function(el, game, upperpipe, lowerpipe) {
		this.el = el;
		this.game = game;
		this.upperpipe = upperpipe;
		this.lowerpipe = lowerpipe;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		if (GRAVITY) {
			this.pos.y += delta * GRAVITY_SPEED;

			// default picture
			this.el.css('background-image','url("../images/bird.png")');
		}

		if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}
		if (Controls.keys.space) {
			GRAVITY = true;
			this.pos.y -= delta + 0.06 * SPEED;

			// changing picture
			this.el.css('background-image','url("../images/birdup.png")');
		}

		this.checkCollisionWithBounds();
		this.checkCollisionWithPipes();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	Player.prototype.checkCollisionWithPipes = function() {
		console.log('playery: ' + this.pos.y + ' pipey: ' + this.upperpipe.pos.y)
		if (this.pos.x > this.upperpipe.pos.x - 10 &&
			this.pos.x > this.upperpipe.pos.x + 7) {

			if(this.pos.y < this.upperpipe.pos.y) {
				return this.game.gameover();
			}
			
		}
	};

	return Player;

})();
