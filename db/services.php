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
    )
);
// We define the services to install as pre-build services. A pre-build service is not editable by administrator.
$services = array(
    'Inline Trainer' => array(
        'functions' => array ('local_inlinetrainer_add_favorite', 'local_inlinetrainer_remove_favorite', 'local_inlinetrainer_get_favorites'),
        'restrictedusers' => 0,
        'enabled'=>1,
    )
);