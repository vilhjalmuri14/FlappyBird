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
	var rotate = 100;
	var start = false;
	var fly = 0;

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
		rotate = 0;
		start = false;
		fly = 0;
	};

	Player.prototype.onFrame = function(delta) {
		if (GRAVITY) {
			this.pos.y += delta * GRAVITY_SPEED;

			// default picture
			if(fly < 10) {
				fly += 1;
			}
			else {
				fly = 0;
			}
			if(fly < 3) {
				this.el.css('background-image','url("../images/birdup.png")');
			}
			else if (fly < 6) {
				this.el.css('background-image','url("../images/birdmiddle.png")');
			}
			else {
				this.el.css('background-image','url("../images/bird.png")');
			}
		}
		
		if (Controls.keys.space) {
			GRAVITY = true;
			this.pos.y -= delta + 0.20 * SPEED;

			// playing sound
			$('#wingsound').trigger("play");

			if(start == true) {
				Controls.keys.space = false;
			}

			start = true;
			// changing picture

			rotate = -20;
			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate('+ rotate +'deg)');
		}
		else {
			// Update UI
			if(GRAVITY) {
				if(rotate < 90) {
					rotate += 1;
				}
				this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' +rotate+'deg)');
			}
			else {
				this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
			}
		}

		this.checkCollisionWithBounds();
		this.checkCollisionWithPipes();

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
