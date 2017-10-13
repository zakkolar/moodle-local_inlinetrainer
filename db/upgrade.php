<?php

function xmldb_local_inlinetrainer_upgrade($oldversion) {
    global $DB;
    $dbman = $DB->get_manager();

    if ($oldversion < 2017041823) {

        // Define table local_inlinetrainer_users to be created.
        $table = new xmldb_table('local_inlinetrainer_users');

        // Adding fields to table local_inlinetrainer_users.
        $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
        $table->add_field('user_id', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
        $table->add_field('preferences', XMLDB_TYPE_TEXT, null, null, null, null, null);

        // Adding keys to table local_inlinetrainer_users.
        $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));

        // Conditionally launch create table for local_inlinetrainer_users.
        if (!$dbman->table_exists($table)) {
            $dbman->create_table($table);
        }

        // Inlinetrainer savepoint reached.
        upgrade_plugin_savepoint(true, 2017041823, 'local', 'inlinetrainer');
    }

    return true;
}



