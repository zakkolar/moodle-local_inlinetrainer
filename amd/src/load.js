/* jshint unused:false, devel:true */
define(['jquery', 'core/ajax', 'local_inlinetrainer/trainer'],function($, ajax, trainer){
	return {
		init:function(user_prefs){

			var inline_trainer_element = document.createElement("div");
			inline_trainer_element.setAttribute("id","zk_inlinetrainer");
			document.body.appendChild(inline_trainer_element);


			console.log(user_prefs);

			trainer.init(ajax, user_prefs);
		}
	};
	
});