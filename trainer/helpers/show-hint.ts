import {SLIDE} from '../tour/slide';
import {UNBLOCK_ELEMENT} from '../tour/unblock_element';
import {HINT} from '../tour/hint';
export const ShowHint= function (target, trainer?){
	if(!trainer){
		trainer='#zk_inlinetrainer';
	}
	SLIDE(target, function(){
		UNBLOCK_ELEMENT(trainer, target,function(){
			HINT(target);
		});
	});
	
	
};