<?php


function local_inlinetrainer_get_user_prefs(){

    global $DB, $USER;

    $user_prefs = null;

    if($DB->count_records('local_inlinetrainer_users',array('user_id'=>$USER->id))>0){
        $user_prefs = new stdClass();

        $user_prefs->researchConsent = $DB->get_field('local_inlinetrainer_users', 'consent', array(
                'user_id'=>$USER->id
            ))==1;

        $user_prefs->open = $DB->get_field('local_inlinetrainer_users', 'open', array(
                'user_id'=>$USER->id
            ))==1;
    }

    return $user_prefs;
}

function local_inlinetrainer_add_trainer_to_page(){
    global $PAGE, $COURSE;

    $user_prefs = local_inlinetrainer_get_user_prefs();

    //check if we've already loaded the trainer - may be the case for some instances of custom script
    $load = !defined('zk-inline-trainer-added');

    if(has_capability('local/inlinetrainer:usetrainer', context_course::instance($COURSE->id), null, false) && core_useragent::get_user_device_type()=='default' && $load) {
        $PAGE->requires->js_call_amd('local_inlinetrainer/load', 'init', [$COURSE->id, $user_prefs]);
        define('zk-inline-trainer-added', true);
    }
}

function local_inline_trainer_add_data_links($navigation){
    global $trainer_menu_node,$CFG;

    if(has_capability('local/inlinetrainer:researchtrainer', context_system::instance(), null, false)){
        $trainer_menu_node = $navigation->add(get_string('research_menu','local_inlinetrainer'));

        $download_new_url = new moodle_url('/local/inlinetrainer/download_data.php');

        $last_id = 0;
        if(property_exists($CFG, 'local_inlinetrainer_last_id')){
            $last_id = $CFG->local_inlinetrainer_last_id;
        }

        $download_new_url->param('last_id', $last_id);

        $download_all_url = new moodle_url('/local/inlinetrainer/download_data.php');

        $download_new_node = $trainer_menu_node->add(get_string('download_new','local_inlinetrainer'), $download_new_url);
        $download_all_node = $trainer_menu_node->add(get_string('download_all','local_inlinetrainer'), $download_all_url);

    }
}


function local_inlinetrainer_extend_navigation(global_navigation $navigation) {
    local_inlinetrainer_add_trainer_to_page();
    local_inline_trainer_add_data_links($navigation);
}