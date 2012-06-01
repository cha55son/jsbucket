(function($) {
	var widgets = {
		// Adds a clear button to every input with the data-clear attribute.
		inputClear: {
			options: { 
				imageSrc: [
					'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA',
					'71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB',
					'3RJTUUH3AYBBAQ7TLpgzQAAAUxJREFUKM990zFLm1EYBeDHJAYKalMHK6GD7WR',
					'L6NrBok4du7s20t9QIfY/dNGpv0BwaHHsotIKxd1MYkEsalOUGJrBxOW9cPmsvn',
					'Dh495z7nvPec834nZVMYsZTOIfjtHGqTuqgkWs4RA99IP8B9/QRK1ILGMJ+xhgeM',
					'c6xyfUc/JiEBNoULjkOvvuYTXkqcZTc/BOdlkHWzjJztuYh5ehMXXcxQvMYRMrmM',
					'JHdAPXR6uCp3icSXiAR/iOI5xhIvZGs4k04F3clBuziScBLOE9LguYL6UwYJh1/ouf',
					'0bEUUtrYK0xoWIoAXMXGAD/wOZ66jIUw8Gt0T7hf5QjB69A+gvEAvMEHPMNDvMXzO',
					'OtgPT2hGQFIeroFHy4KGdjAdCLXIjm9e9KViNtpxnnV0cLBf9y/jnxvBLEsNBb/qFd',
					'hUgNj0e0oTNvG7wS+ATtze+pRuZFtAAAAAElFTkSuQmCC'
				].join('')
			}, 
			inputs: [],
			init: function() {
				var me = this;
				$(document).ready(function() {
					this.inputs = $('input[data-clear]');
					this.inputs.each(function() {me.create($(this));});
					// Events
					this.inputs.focus(function() {me.enable($(this));});
					this.inputs.keydown(function() {
						var that = $(this);
						setTimeout(function() {
							if (that.val() === '') 
								me.disable(that);
							else me.enable(that);
						}, 0);
					});
					this.inputs.blur(function() {me.disable($(this));});
				});
			},
			get: function(key) {

			},
			set: function(key, val) {

			},
			create: function(el) { // Initialize the close button
				var me = this;
				// Add padding for the close button
				var rightPadding = parseInt(el.css('padding-right').replace('px', ''));
				el.css('padding-right', (22 + rightPadding) + 'px');
				var pos = el.position();
				var closeButton = $('<img src="' + me.options.imageSrc + '" alt="Clear text" />');
				closeButton.data('jsb.inputClear.input', el);
				closeButton.click(function(e) {
					el.val(''); me.disable(el); el.focus();
				});
				closeButton.css({'display': 'none', 'position': 'absolute', 'cursor': 'pointer'});
				el.data('jsb.inputClear.close', closeButton);
				el.parent().append(closeButton);
				closeButton.load(function() {
					var marginTop = parseInt(el.css('margin-top').replace('px', ''));
					closeButton.css({
						'top': (pos.top + marginTop + el.outerHeight()/2 - closeButton.height()/2) + 'px',
						'left': (pos.left + el.innerWidth() - closeButton.width() - rightPadding) + 'px'
					});
				});
			},
			enable: function(el) {
				if (el.val() !== '' && !el.data('jsb.inputClear.enabled')) {
					el.data('jsb.inputClear.enabled', true);
					el.data('jsb.inputClear.close').fadeIn();
				}
			},
			disable: function(el) {
				if (el.data('jsb.inputClear.enabled')) {
					el.data('jsb.inputClear.enabled', false);
					el.data('jsb.inputClear.close').fadeOut();
				}
			}
		},
		// When scrolled below the initial window viewport a scroll-to-top button will appear.
		scrollTop: {
			options: {
				imageSrc: [
					'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAA',
					'AGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAnNJREFUeNq0WD1vIjEQH',
					'XxGQhAJQQEFEqLgFJBokn7pkmIpqAjdXpWIIqeccrnskY4u6UJ+EhX/isQrLTJmxjuzG0a',
					'K1rHN89s3H7ZXNxqNEL6sVColf2nbfrptX5+x3W7n7Uvb9jNta4wMRYRDygD7+txxd0xTZL',
					'gqcVXDFMNIag4ZKamshd2nPaZ9ZCSuk6iAkSNdRhGUkqLI+BQzptwFOAS5sSTBTE27b/2dcS',
					'SJnxRX+eIlK67sPt8Y5wWPXEap4AOw+8bjMTkmUVthb0UBYQDm/8lkAu/vaxgOh4WxlCTFMZ',
					'Wq1So8Pv6FcrkMy+WyEBbLZVljDw9/oNVqJe2Li0uYTqe5sY4ISWUeDAYwn88Pfv/09A/q9Xo',
					'ulxn7UavVfrqZwskMpRSs1x/QbrcPACuVCpyd1WCz2XhLBNWvpHtTarPZDEajETp2czNP3Ce1',
					'g6DO2r3tOc1mE+7vf3vBX16WiYoUBrWOyqPO83O8jxPKzs8HEEW/xNhiQsYVYRiy5i4Wi30Gno',
					'SQqTWr1Yo939SoOI7lhLAzMHb+jaIIer2eaIGrq2sIggC46yjfJNs6nQ7c3t7lysg4/p+oyzkd',
					'oHUI26lfX9+g3+/nImQSQGsN2+3WezNBYwi7rgTBeL+b5zWTcd1uF8U/SP+vLAh9yhQ5wlJt7D',
					'6WtpU7kAWGAbtEimAdBbXvhonJnIJhBPNgKcl1FyNBKSTBsk27h2zfgdydx60t3BdMCFGnfx8Z',
					'bu2SfGQ4chkV+b7MyCIiwdy7jFLFVSOPStzUt/u0z1V2zTmVy8gYOkX8SOMoUaiIS6gPVkWqNuo',
					'yrqso4kU+6X0KMADWKXBxleDtmAAAAABJRU5ErkJggg=='
				].join(''),
				location: "right" // left | right
			},
			$icon: null,
			init: function() {
				// Caching
				var me = this;
				var $window = $(window);
				var windowHeight = $window.height();
				// Add Elements
				this.$icon = $('<img src="' + this.options.imageSrc + '" alt="scroll top" class="jsb-scrolltop-icon" />');
				//Append the icon when the document loads
				$(document).ready(function() {$('body').append(me.$icon);});
				me.$icon.css({
					'display': 	'none',
					'position': 'fixed',
					'top': 		'10px',
					'right': 	'10px',
					'cursor': 	'pointer'
				});
				// Events
				$window.scroll(function(event) {
					var scroll = $window.scrollTop();
					if (scroll <= windowHeight) me.$icon.fadeOut();
					else me.$icon.fadeIn();
				});
				me.$icon.click(function() {
					$('html, body').animate({scrollTop: 0}, 'medium', function() {
						me.$icon.fadeOut();
					});
				});
			},
			get: function(key) { return this.options[args[0]]; },
			set: function(key, val) {
				if (args[0].toLowerCase() === 'imagesrc')
						this.$icon.attr('src', args[1]);
				if (args[0].toLowerCase() === 'location' && args[1].toLowerCase() === 'left')
					this.$icon.css({ 'right': 'auto', 'left': '10px'	});
				else if (args[0].toLowerCase() === 'location' && args[1].toLowerCase() === 'left') 
					this.$icon.css({ 'right': '10px', 'left': 'auto'	});
			}
		}
	};

	$.fn.jsbucket = function(hello, is, cool) {
		if (arguments.length === 0) {
			for (var widgetName in widgets) 
				widgets[widgetName].init();
			return this;
		} else {
			var widget = [].splice.call(arguments, 0, 1);
			if (arguments.length === 1) /// Getter
				return widgets[widget].get(arguments[0]);
			else if (arguments.length === 2)
				widgets[widget].set(arguments[0], arguments[1]);
			return this;
		}
	};
})(jQuery);
$.fn.jsbucket();