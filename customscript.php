<?php

// Include this file from your customscript files for pages that do not have navigation on them:
// require($CFG->dirroot . '/local/inlinetrainer/customscript.php');
// For information about custom scripts, see https://docs.moodle.org/dev/customscripts

defined('MOODLE_INTERNAL') || die();

require($CFG->dirroot . '/local/inlinetrainer/lib.php');

local_inlinetrainer_add_trainer_to_page();
