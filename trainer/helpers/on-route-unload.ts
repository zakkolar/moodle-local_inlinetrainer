import {GUID} from './guid';

function makeEventString(id){
	return 'popstate.'+id+' pushstate.'+id;
}

export const OnRouteUnload=function(pathname:string, id:string,callback:Function){
	let $ = require('jquery');

	var pushState = history.pushState;
	history.pushState = function () {
	    pushState.apply(history, arguments);
	    $(window).trigger('pushstate', arguments); 
	};

	$(window).on(makeEventString(id),function(){
		if(window.location.pathname!==pathname){
			callback();
		}
	});
};

export const OffRouteUnload=function(id:string){
	let $ = require('jquery');
	$(window).off(makeEventString(id));
}