function items_overlap(selector_1, selector_2){
	let $ = require('jquery');

	let el_1 = get_all_window_offsets(selector_1);

	let el_2 = get_all_window_offsets(selector_2);

	return  el_1.left < el_2.right && el_1.right > el_2.left &&
			el_1.top < el_2.bottom && el_1.bottom > el_2.top ;

}

function get_all_window_offsets(selector){
	let $ = require('jquery');

	let el = $(selector);

	let el_position = el.offset();

	el_position.top -= $(document).scrollTop();
	el_position.left -= $(document).scrollLeft();

	el_position.bottom = el_position.top + el.height();
	el_position.right = el_position.left + el.width();

	return el_position;
}

export const UNBLOCK_ELEMENT = function(blocker_selector, blockee_selector, complete?){
	let $ = require('jquery');
	
	

	if(items_overlap(blocker_selector, blockee_selector)){
		let padding = 50;

		let blocker = $(blocker_selector);
		let blockee = $(blockee_selector);

		let blocker_offset = get_all_window_offsets(blocker_selector);
		let blockee_offset = get_all_window_offsets(blockee_selector);

		let left_space = blockee_offset.left;
		let right_space = $(document).width() - blockee_offset.right;

		if(right_space>left_space){
			blocker_offset.left = blockee_offset.right+padding;
		}
		else{
			blocker_offset.left = blockee_offset.left - blocker.width() - padding;
		}

		if(blocker_offset.left<0){
			blocker_offset.left=0;
		}
		if(blocker_offset.left + blocker.width() > $(document).width()){
			blocker_offset.left = $(document).width()-blocker.width();
		}

		blocker.animate({left:blocker_offset.left},function(){
			complete();
		})

		
	}
	else{
		complete();
	}


}