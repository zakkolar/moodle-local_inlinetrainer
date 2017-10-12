<?php



function local_inlinetrainer_extend_navigation(global_navigation $navigation) {
	global $PAGE, $COURSE, $trainer_menu_node;
	if(has_capability('local/inlinetrainer:usetrainer', context_course::instance($COURSE->id)) && core_useragent::get_user_device_type()=='default') {
        $PAGE->requires->js_call_amd('local_inlinetrainer/load', 'init');
    }


    if(has_capability('local/inlinetrainer:researchtrainer', context_system::instance())){
        $trainer_menu_node = $navigation->add(get_string('research_menu','local_inlinetrainer'));
        $thingnode = $trainer_menu_node->add(get_string('download_link','local_inlinetrainer'), new moodle_url('/local/inlinetrainer/download_data.php'));
//        $thingnode->make_active();
    }


}