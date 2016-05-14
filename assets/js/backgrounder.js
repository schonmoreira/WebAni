/**
 * Backgrounder Script
 * Windows 10-like background image slideshow. Transition css-controlled
 * By Arthur Annibal - WebAniversario
 * Version 0.0.0
 */
 
if (typeof wNiver == "undefined") {throw "WebAniversario 'wNiver' Object was not found"}

wNiver.backgrounder = {
	/** Configuration for the slideshow */
	config : {
		/** Array of strings containing only the filenames and extension. jpg recommended. */
		slides : ["bg-festa-(1).jpg", "bg-festa-(2).jpg", "bg-festa-(3).jpg", "bg-festa-(4).jpg"],
		
		/** FilePath to the images. "path + slide[i]" so include backslashes. */
		path : "assets/img/backgrounds/",
		
		/** Time in millisseconds to display each slide */
		slideTime : 2800,
		
		/** Time to fade this to the next slide. Both appear during this time */
		slideTransitionTime: 1200,
		
		/** True for random - shuffle the slides array every cycle, false for continuous. Will cicle throught slides array anyway. */
		random: true,
		
		/** HTML Object to put the backgrounds */
		backgroundContainer : wNiver.structure.backgroundInner
	},
	
	/** shuffled [optional] version of this.config.slides */
	slideSequence : [],
	/** integer representing an item of slideSequence */
	currentSlideIndex : 0,
	
	/** Selects a new background, takes care of the sequence and changes the background */
	changeBackgrounds : function() {
		var me = wNiver.backgrounder;
		
		verbose ("Changing backgrounds: current: "+me.config.path+me.slideSequence[me.currentSlideIndex]);
		me.currentSlideIndex++;
		if (me.currentSlideIndex >= me.slideSequence.length) {
			verbose("Full sequence achieved, reseting")
			me.currentSlideIndex = 0;
			if (me.config.random) {
				verbose("Randomizing")
				me.slideSequence = shuffleArray(me.config.slides);
				// twice because i dont trust
				me.slideSequence = shuffleArray(me.slideSequence);
			}
		}
		var newBackgroundCss = "url('"+me.config.path + me.slideSequence[me.currentSlideIndex]+"')";
		verbose("css: background-image:"+newBackgroundCss)
		me.config.backgroundContainer.css("background-image",newBackgroundCss);
	},
	
	/** place to keep the "setInterval" function return value. */
	changeBackgroundsID : 0,
	
	initialize : function() {
		verbose("Initializing backgrounder slideshow")
		if (this.config.random) {
			this.slideSequence = shuffleArray(this.config.slides);
			// twice because i dont trust
			this.slideSequence = shuffleArray(this.slideSequence);
		} else {
			this.slideSequence = this.config.slides;
		}
		verbose("Sequence of slides: ",this.slideSequence);
		
		if (wNiver.attributes.width > 768) {
			this.changeBackgroundsID = setInterval(this.changeBackgrounds, this.config.slideTime + this.config.slideTransitionTime);
		} else {
			verbose("Assuming mobile device, stopping background slide.")
		}
		
		var transitionConfigCss = "background-image "+this.config.slideTransitionTime+"ms ease";
		verbose("css: transition:"+transitionConfigCss);
		this.config.backgroundContainer.css("transition",transitionConfigCss);
		this.changeBackgrounds();
	}
}