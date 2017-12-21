export const SLIDE = function(selector, complete?){
	if(!complete){
		complete = function(){};
	}

	var $ = require('jquery');
	
	var el = $(selector);

	var elTop = el.offset().top;
	var elBottom = elTop + el.height();

	var windowTop = $(document).scrollTop();

	var windowBottom = windowTop + $(window).height();

	var targetScroll = windowTop;


	if(elTop<windowTop || elTop>windowBottom){


		var padding = ($(window).height()-el.height())/2;

		targetScroll = elTop - padding;

	}



	$('html, body').animate({scrollTop:targetScroll}, function(){
		if(this.nodeName == "BODY"){
            complete();
		}

	});

}

