<?php

function local_inlinetrainer_extend_navigation(global_navigation $navigation) {
	global $PAGE, $COURSE;
	if(has_capability('local/inlinetrainer:usetrainer', context_course::instance($COURSE->id)) && core_useragent::get_user_device_type()=='default') {
        $PAGE->requires->js_call_amd('local_inlinetrainer/load', 'init');
    }

}