/* jshint unused:false, devel:true, ignore:start */
/* eslint-disable */
define(['jquery', 'core/ajax', 'local_inlinetrainer/trainer'],function($, ajax, trainer){
	return {
		init:function(course_id,user_prefs){

			var inline_trainer_element = document.createElement("div");
			inline_trainer_element.setAttribute("id","zk_inlinetrainer");
			document.body.appendChild(inline_trainer_element);

			trainer.init(ajax, course_id, user_prefs);
		}
	};
	
});