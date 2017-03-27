
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.pipeset1 = new window.Pipe(this.el.find('.PipeSet1'), this, 50, -15);
		this.pipeset2 = new window.Pipe(this.el.find('.PipeSet2'), this, 80, 5);
		this.pipeset3 = new window.Pipe(this.el.find('.PipeSet3'), this, 110, -20);
		this.pipeset4 = new window.Pipe(this.el.find('.PipeSet4'), this, 140, -5);
		
		this.player = new window.Player(this.el.find('.Player'), this, this.pipeset1, this.pipeset2, this.pipeset3, this.pipeset4);
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);

		this.pipeset1.onFrame(delta);
		this.pipeset2.onFrame(delta);
		this.pipeset3.onFrame(delta);
		this.pipeset4.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		console.log("now resetting");
		this.player.reset();

		// resetting the pipes
		this.pipeset1.reset(50, -15);
		this.pipeset2.reset(80, 5);
		this.pipeset3.reset(110, -20);
		this.pipeset4.reset(140, -5);
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// playing sound
		$('#diesound').trigger("play");

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


