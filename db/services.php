<?php

$functions = array(
    'local_inlinetrainer_add_favorite' => array(
        'classname'   => 'local_inlinetrainer_external',
        'methodname'  => 'add_favorite',
        'classpath'   => 'local/inlinetrainer/externallib.php',
        'description' => 'Adds an action to the current user\s list of favorites',
        'type'        => 'write',
        'ajax'        => true
    ),
    'local_inlinetrainer_remove_favorite' => array(
        'classname'   => 'local_inlinetrainer_external',
        'methodname'  => 'remove_favorite',
        'classpath'   => 'local/inlinetrainer/externallib.php',
        'description' => 'Removes an action from the current user\s list of favorites',
        'type'        => 'write',
        'ajax'        => true
    ),
    'local_inlinetrainer_get_favorites' => array(
        'classname'   => 'local_inlinetrainer_external',
        'methodname'  => 'get_favorites',
        'classpath'   => 'local/inlinetrainer/externallib.php',
        'description' => 'Gets a list of favorites for the current user',
        'type'        => 'read',
        'ajax'        => true
    ),
    'local_inlinetrainer_set_recent_actions' => array(
        'classname'   => 'local_inlinetrainer_external',
        'methodname'  => 'set_recent_actions',
        'classpath'   => 'local/inlinetrainer/externallib.php',
        'description' => 'Set the recent actions for the current user',
        'type'        => 'write',
        'ajax'        => true
    ),
    'local_inlinetrainer_get_recent_actions' => array(
        'classname'   => 'local_inlinetrainer_external',
        'methodname'  => 'get_recent_actions',
        'classpath'   => 'local/inlinetrainer/externallib.php',
        'description' => 'Get the recent actions for the current user',
        'type'        => 'read',
        'ajax'        => true
    ),
    'local_inlinetrainer_log_activity' => array(
        'classname'   => 'local_inlinetrainer_external',
        'methodname'  => 'log_activity',
        'classpath'   => 'local/inlinetrainer/externallib.php',
        'description' => 'Logs an activity performed by a user',
        'type'        => 'write',
        'ajax'        => true
    ),
    'local_inlinetrainer_set_consent' => array(
        'classname'   => 'local_inlinetrainer_external',
        'methodname'  => 'set_consent',
        'classpath'   => 'local/inlinetrainer/externallib.php',
        'description' => 'Stores whether the user consents to be part of the study',
        'type'        => 'write',
        'ajax'        => true
    )
);
// We define the services to install as pre-build services. A pre-build service is not editable by administrator.
$services = array(
    'Inline Trainer' => array(
        'functions' => array (
            'local_inlinetrainer_add_favorite',
            'local_inlinetrainer_remove_favorite',
            'local_inlinetrainer_get_favorites',
            'local_inlinetrainer_set_recent_actions',
            'local_inlinetrainer_get_recent_actions',
            'local_inlinetrainer_log_activity',
            'local_inlinetrainer_set_consent'
        ),
        'restrictedusers' => 0,
        'enabled'=>1,
    )
);