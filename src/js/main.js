/*==================================================================
	MAIN.JS
 =================================================================== */


//Main application object
var ValueTestApp = ValueTestApp || {};

//Closure
(function($, app){

	//Namespace for multiple slider plugin objects
	app.sliders = {};
	
	//Namespace for selectors
	app.selector = {
		slider : {
			container : '.value-slider-container',
			indicator : '.value-slider-indicator',
			active : 'selected'
		}
	};

	/*-----------------------------------------------------------------
	*
	* @name : App Init
	*
	* @description : Main application initializer
	*
	* @param : null
	* @return : null
	*
	*/
	app.init = function(){
		console.log("App initialized");
		app.sliders.init();
	};

	/*-----------------------------------------------------------------
	*
	* @name : Slider Init
	*
	* @description :  Slider initializer that will generate all 
	* sliders on the page
	*
	* @param  : null
	* @return : null
	*
	*/
	app.sliders.init = function(){
		var totalSliders = $(app.selector.slider.container).length
		var currentSlider = "";

		for (var i = 0; i < totalSliders; i++){
			currentSlider 	 = $(app.selector.slider.container).eq(i);
			currentSlider.iosSlider({
				desktopClickDrag: true,
				snapToChildren: true,
				onSlideChange : app.sliders.slideChange
			});
		}
	};

	/*-----------------------------------------------------------------
	*
	* @name : Slider Slide Change
	*
	* @description : Common event trigger function for all sliders. It
	* takes care of updating the "select" status in the indicators
	*
	* @param : null
	* @return : null
	*
	*/
	app.sliders.slideChange = function(args){
		var indicator = args.sliderContainerObject.parent().find(app.selector.slider.indicator);
		$(indicator).removeClass(app.selector.slider.active);
		$(indicator).eq(args.currentSlideNumber - 1).addClass(app.selector.slider.active);
	};

	//Run application
	app.init();

})(jQuery, ValueTestApp);