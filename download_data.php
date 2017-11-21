<?php

require_once('../../config.php');

global $DB;

require_capability('local/inlinetrainer:researchtrainer', context_system::instance());

header('Content-disposition: attachment; filename=trainer-'.date('m-d-y').'.json');
header('Content-Type: application/json');

$activity_db = $DB->get_records_sql('SELECT * FROM {local_inlinetrainer_activity} WHERE id > ?',array(optional_param('last_id',0, PARAM_INT)));

$activities = [];

$max_id = 0;

foreach($activity_db as $activity){
    $current_activity = new stdClass();
    $current_activity->id = intval($activity->id);
    $current_activity->timestamp = intval($activity->timestamp);
    $current_activity->user_id = intval($activity->user_id);
    $current_activity->type = $activity->type;
    $current_activity->data = json_decode($activity->data);
    $activities[] = $current_activity;
    $max_id = max($max_id, intval($activity->id));
}

set_config('local_inlinetrainer_last_id', $max_id);


echo json_encode($activities, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);