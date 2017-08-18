/* jshint unused:false, devel:true */
define(['jquery', 'core/ajax', 'local_inlinetrainer/trainer'],function($, ajax, trainer){
	return {
		init:function(){

			var inline_trainer_element = document.createElement("div");
			inline_trainer_element.setAttribute("id","zk_inlinetrainer");
			document.body.appendChild(inline_trainer_element);

			// var promises = ajax.call([{
			// 	methodname: 'local_inlinetrainer_log_activity',
			// 	args:{
			// 		timestamp:23049,
			// 		type:'test_activity',
			// 		data:JSON.stringify({
			// 			action:'test'
			// 		})
			// 	}
			// }]);
			// promises[0].done(function(a){
			// 	console.log(a);
			// }).fail(function(a, b){
			// 	console.log(a);
			// });


			trainer.init(ajax);
		}
	};
	
});