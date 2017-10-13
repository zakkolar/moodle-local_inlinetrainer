<?php



function local_inlinetrainer_extend_navigation(global_navigation $navigation) {
	global $PAGE, $COURSE, $trainer_menu_node, $DB, $USER;

    $user_prefs = $DB->get_field('local_inlinetrainer_users', 'preferences', array(
        'user_id'=>$USER->id
    ));

	if(has_capability('local/inlinetrainer:usetrainer', context_course::instance($COURSE->id)) && core_useragent::get_user_device_type()=='default') {
        $PAGE->requires->js_call_amd('local_inlinetrainer/load', 'init', [json_decode($user_prefs)]);
    }


    if(has_capability('local/inlinetrainer:researchtrainer', context_system::instance())){
        $trainer_menu_node = $navigation->add(get_string('research_menu','local_inlinetrainer'));
        $thingnode = $trainer_menu_node->add(get_string('download_link','local_inlinetrainer'), new moodle_url('/local/inlinetrainer/download_data.php'));
//        $thingnode->make_active();
    }


}