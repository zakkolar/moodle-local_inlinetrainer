<?php

function xmldb_local_inlinetrainer_upgrade($oldversion) {
    global $DB;
    $dbman = $DB->get_manager();

    if ($oldversion < 2017112301) {

        // Define field open to be added to local_inlinetrainer_users.
        $table = new xmldb_table('local_inlinetrainer_users');
        $field = new xmldb_field('open', XMLDB_TYPE_INTEGER, '1', null, null, null, '1', 'consent');

        // Conditionally launch add field open.
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        // Inlinetrainer savepoint reached.
        upgrade_plugin_savepoint(true, 2017112301, 'local', 'inlinetrainer');
    }



    return true;
}



