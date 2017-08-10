<?php
// function local_inlinetrainer_navigationlinks(moodle_page $page, context $context) {
//     $page->requires->js_call_amd('local_inlinetrainer/test', 'demo');
// }

function local_inlinetrainer_extend_navigation(global_navigation $navigation) {
	global $PAGE;
	$PAGE->requires->js_call_amd('local_inlinetrainer/load', 'init');
}