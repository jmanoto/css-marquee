

var Marquee = function(options) {
	var that = this;

	this.Options = {
		MarqueeText: "",
		AnimationSpeed: 50,
		DotSize: 16,
		DotMargin: 2,
		MarqueeHeight: 7,
		ContainerSelector: '.marquee',
		ContainerWidth: 500,

		//Dots
		DotRowMarkup: '<div class="row">',
		DotMarkup: '<div class="dot">',
		DotsAcross: null,

		AnimationTimer: null,
		LastMatrix: []
	};


	/**
	 * Marquee Container
	 * @type {[type]}
	 */
	this.Container = null;

	/**
	 * Object Initialization
	 */
	this.Init = function() {
		this.Container = jQuery(this.Options.ContainerSelector);
		this.SetWidth(this.Options.ContainerWidth);
		this.SetEvents();
	};

	/**
	 * Setup event handlers
	 */
	this.SetEvents = function() {
		this.Container.on('MarqueeEnded', (function() {
			this.DisplayMatrix(this.Options.LastMatrix);
		}).bind(this));
	};

	/**
	 * Sets the container width
	 * @param {[type]} width [description]
	 */
	this.SetWidth = function(width) {
		this.Container.width(width);
		this.Options.ContainerWidth = width;
		this.DrawDots();
	};

	/**
	 * Draws the dots in the container
	 */
	this.DrawDots = function() {

		this.Options.DotsAcross = this.Options.ContainerWidth / (this.Options.DotSize + (this.Options.DotMargin * 2));

		this.Container.empty();

		for(var y=0; y<this.Options.MarqueeHeight; y++) {
			var row = jQuery(this.Options.DotRowMarkup);
			for (var x=0; x<this.Options.DotsAcross; x++) {
				var dot = jQuery(this.Options.DotMarkup);
				row.append(dot);
			}
			this.Container.append(row);
		}

	};


	/**
	 * Sets the Marquee Text and displays it
	 * @param {[type]} text [description]
	 */
	this.SetText = function(text) {
		this.Stop();
		this.Clear();

		this.Options.MarqueeText = text;

		text = String(text);
		text = text.toUpperCase();

		var characters = text.split('');

		var matrixString = [];

		for(var c=0; c<characters.length; c++) {
			try {
				var character = MarqueeAlphabet[characters[c]].slice();

				if (c === 0) {
					matrixString = character;
				} else {
					for(var y=0; y<matrixString.length; y++) {
						matrixString[y] = matrixString[y].concat([0]);
						matrixString[y] = matrixString[y].concat(character[y]);
					}
				}
			} catch (error) {
				// character not in array
			}

		}

		this.Options.LastMatrix = jQuery.extend(true, [], matrixString);

		this.DisplayMatrix(matrixString);

	};


	/**
	 * Animates
	 * @param {[type]} matrix [description]
	 */
	this.DisplayMatrix = function(matrix) {

		matrix = jQuery.extend(true, [], matrix);
		// matrix = matrix.slice();

		var lastDots = this.Container.find('.row').find('.dot:last');
		var rows = this.Container.find('.row');
		
		this.Options.AnimationTimer = setInterval((function() {

			
			jQuery.each(rows, function(index, row) {
				row = jQuery(row);
				var dots = row.find('.dot');

				jQuery.each(dots, function(index, dot) {
					dot = jQuery(dot);
					var nextDot = dot.next('.dot');
					dot.attr({'class': nextDot.attr('class')});
				});
			});



			for(var y=0; y<matrix.length; y++) {

				var ledValue = matrix[y][0];
				var lastDot = jQuery(lastDots[y]);
				lastDot.removeClass('on');
				if (ledValue) lastDot.addClass('on');

				matrix[y].shift();

			}



			// Check for finish
			if (this.Container.find('.dot.on').length === 0) {
				this.Stop();
				this.Container.trigger('MarqueeEnded');
			}


		}).bind(this), this.Options.AnimationSpeed);

	};

	/**
	 * Animates the marquee board
	 * @param {[type]} operation [description]
	 */
	this.Animate = function(operation) {

		this.Options.AnimationTimer = setInterval(this.AnimationStep, animationSpeed);

	};

	/**
	 * Stops the animation
	 */
	this.Stop = function() {
		clearInterval(this.Options.AnimationTimer);
		this.Options.AnimationTimer = null;
	};

	this.Clear = function() {
		this.Container.find('.dot').removeClass('on');
	};


	/**
	 * Animation Step loop
	 */
	var AnimationStep = function() {

		var rows = this.Container.find('.row');
		jQuery.each(rows, function(index, row) {
			row = jQuery(row);
			var dots = row.find('.dot');

			jQuery.each(dots, function(index, dot) {
				dot = jQuery(dot);
				var nextDot = dot.next('.dot');
				dot.attr({'class': nextDot.attr('class')});
			});
		});
	};

	/***********************
	 * Initialization
	 ***********************/

	this.Options = jQuery.extend({}, this.Options, options);
	this.Init();

};



var MarqueeAlphabet = {

	A: [[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1]],

	B: [[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0]],

	C: [[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,1],
		[0,1,1,1,0]],

	D: [[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0]],

	E: [[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1]],

	F: [[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0]],

	G: [[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0]],

	H: [[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1]],

	I: [[0,1,1,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0]],

	J: [[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0]],

	K: [[1,0,0,0,1],
		[1,0,0,1,0],
		[1,0,1,0,0],
		[1,1,0,0,0],
		[1,0,1,0,0],
		[1,0,0,1,0],
		[1,0,0,0,1]],

	L: [[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1]],

	M: [[1,0,0,0,1],
		[1,1,0,1,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1]],

	N: [[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,0,0,1],
		[1,0,1,0,1],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1]],

	O: [[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0]],

	P: [[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0]],

	Q: [[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,1,0,1],
		[1,0,0,1,1],
		[0,1,1,1,1]],

	R: [[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,1,0,0],
		[1,0,0,1,0],
		[1,0,0,0,1]],

	S: [[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[1,1,1,1,0]],

	T: [[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0]],

	U: [[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0]],

	V: [[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0]],

	W: [[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,1,0,1,1],
		[1,0,0,0,1]],

	X: [[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1]],

	Y: [[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0]],

	Z: [[1,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1]],

	' ':[[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]],

	'!':[[0,1,0],
		[0,1,0],
		[0,1,0],
		[0,1,0],
		[0,1,0],
		[0,0,0],
		[0,1,0]],

	',':[[0,0,0],
		[0,0,0],
		[0,0,0],
		[0,0,0],
		[0,0,0],
		[0,1,0],
		[1,0,0]],

	'.':[[0,0,0],
		[0,0,0],
		[0,0,0],
		[0,0,0],
		[0,0,0],
		[0,0,0],
		[1,0,0]],

	';':[[0,0,0],
		[0,0,0],
		[0,0,0],
		[0,1,0],
		[0,0,0],
		[0,1,0],
		[1,0,0]],

	'#':[[0,0,0,0,0],
		[0,1,0,1,0],
		[1,1,1,1,1],
		[0,1,0,1,0],
		[1,1,1,1,1],
		[0,1,0,1,0],
		[0,0,0,0,0]],

	'@':[[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[0,0,1,0,1],
		[0,1,0,1,1],
		[1,0,1,0,1],
		[1,1,1,1,0]]
}