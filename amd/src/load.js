/* jshint unused:false, devel:true */
define(['jquery'],function($){
	return {
		init:function(){

			var inline_trainer_element = document.createElement("div");
			inline_trainer_element.setAttribute("id","zk_inlinetrainer");
			document.body.appendChild(inline_trainer_element);


			require(['local_inlinetrainer/trainer']);
		}
	};
	
});