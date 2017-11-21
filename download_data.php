<?php

require_once('../../config.php');

global $DB;

require_capability('local/inlinetrainer:researchtrainer', context_system::instance());

header('Content-disposition: attachment; filename=trainer-'.date('m-d-y').'.json');
header('Content-Type: application/json');

$activity_db = $DB->get_records('local_inlinetrainer_activity');

$activities = [];

foreach($activity_db as $activity){
    $current_activity = new stdClass();
    $current_activity->id = intval($activity->id);
    $current_activity->timestamp = intval($activity->timestamp);
    $current_activity->user_id = intval($activity->user_id);
    $current_activity->type = $activity->type;
    $current_activity->data = json_decode($activity->data);
    $activities[] = $current_activity;
}


echo json_encode($activities, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);