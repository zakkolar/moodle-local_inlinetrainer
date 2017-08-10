import {GUID} from './guid';

function makeEventString(id){
	return 'popstate.'+id+' pushstate.'+id;
}

export const OnRouteLoad=function(pathname,id,callback){

	let $ = require('jquery');
	var pushState = history.pushState;
	history.pushState = function () {
	    pushState.apply(history, arguments);
	    $(window).trigger('pushstate', arguments);  // Some event-handling function
	};
	$(window).on(makeEventString(id),function(){
		if(window.location.pathname===pathname){
			callback();
		}
	});
};
export const OffRouteLoad=function(id){
	let $ = require('jquery');
	$(window).off(makeEventString(id));
}