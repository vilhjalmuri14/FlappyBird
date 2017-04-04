
window.Game = (function() {
	'use strict';

	var score;

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
		this.score = 0;

		this.isvolumemuted = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);

		// Play song while game is on
		$('#song').prop("volume", 0.1);
		$('#song').trigger("play");


		// muting and unmuting
		$(function() {
	 		$('#volumeimg').click(function(){
				if(this.isvolumemuted === false) {
					$("#volumeimg").attr('src',"../images/volume-off.png");
					this.isvolumemuted = true;

					//muting all elements
					document.getElementById('diesound').muted = true;
					document.getElementById('hitsound').muted = true;
					document.getElementById('pointsound').muted = true;
					document.getElementById('swooshingsound').muted = true;
					document.getElementById('wingsound').muted = true;	
					document.getElementById('song').muted = true;
				}
				else {
					$("#volumeimg").attr('src',"../images/volume-high.png");
					this.isvolumemuted = false;
					document.getElementById('diesound').muted = false;
					document.getElementById('hitsound').muted = false;
					document.getElementById('pointsound').muted = false;
					document.getElementById('swooshingsound').muted = false;
					document.getElementById('wingsound').muted = false;	
					document.getElementById('song').muted = false;
				}
   				return false;
 		});
});
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

		// check i the pipes were passed
		if(this.player.pos.x > this.pipeset1.pos.x + 15) {
			if(!this.pipeset1.PASSED){
				this.score = this.score + 1;
				
				// Setting score into scoreboard
				$(".CurrentScoreNumber").text(this.score);
				$('#pointsound').trigger("play");
			}

			this.pipeset1.PASSED = true;
		}

		if(this.player.pos.x > this.pipeset2.pos.x + 15) {
			if(!this.pipeset2.PASSED){
				this.score = this.score + 1;
				
				// Setting score into scoreboard
				$(".CurrentScoreNumber").text(this.score);
				$('#pointsound').trigger("play");
			}

			this.pipeset2.PASSED = true;
		}

		if(this.player.pos.x > this.pipeset3.pos.x + 15) {
			if(!this.pipeset3.PASSED){
				this.score = this.score + 1;

				// Setting score into scoreboard
				$(".CurrentScoreNumber").text(this.score);
				$('#pointsound').trigger("play");
			}

			this.pipeset3.PASSED = true;
		}

		if(this.player.pos.x > this.pipeset4.pos.x + 15) {
			if(!this.pipeset4.PASSED){
				this.score = this.score + 1;

				// Setting score into scoreboard
				$(".CurrentScoreNumber").text(this.score);
				$('#pointsound').trigger("play");
			}

			this.pipeset4.PASSED = true;
		}

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// setting the score
		$(".CurrentScoreNumber").text(this.score);

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.score = 0;
		this.player.reset();

		// setting the score
		$(".CurrentScoreNumber").text(this.score);

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

