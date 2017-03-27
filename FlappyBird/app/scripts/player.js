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
	var GRAVITY_SPEED = 15; // 25
	var GRAVITY = false;

	var Player = function(el, game, pipeset1, pipeset2, pipeset3, pipeset4) {
		this.el = el;
		this.game = game;
		this.pipeset1 = pipeset1;
		this.pipeset2 = pipeset2;
		this.pipeset3 = pipeset3;
		this.pipeset4 = pipeset4;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		GRAVITY = false;
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
		
		// checking pipeset1
		if (this.pos.x < this.pipeset1.pos.x + 18 &&
			 this.pos.x > this.pipeset1.pos.x + 3) {

			if(this.pos.y < this.pipeset1.pos.y + 25 ||
				this.pos.y > this.pipeset1.pos.y + 39) {
				// when the player hits the pipe
				return this.game.gameover();
			}
		} 
		// checking pipeset2 
		else if(this.pos.x < this.pipeset2.pos.x + 18 &&
			 this.pos.x > this.pipeset2.pos.x + 3) {

			if(this.pos.y < this.pipeset2.pos.y + 25 ||
				this.pos.y > this.pipeset2.pos.y + 39) {
				// when the player hits the pipe
				return this.game.gameover();
			}

		}
		// checking pipeset3
		else if(this.pos.x < this.pipeset3.pos.x + 18 &&
			 this.pos.x > this.pipeset3.pos.x + 3) {

			if(this.pos.y < this.pipeset3.pos.y + 25 ||
				this.pos.y > this.pipeset3.pos.y + 39) {
				// when the player hits the pipe
				return this.game.gameover();
			}
		}
		// checking pipeset4
		else if(this.pos.x < this.pipeset4.pos.x + 18 &&
			 this.pos.x > this.pipeset4.pos.x + 3) {

			if(this.pos.y < this.pipeset4.pos.y + 25 ||
				this.pos.y > this.pipeset4.pos.y + 39) {
				// when the player hits the pipe
				return this.game.gameover();
			}
		}
	};

	return Player;

})();
