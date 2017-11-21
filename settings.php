<?php

if ( $hassiteconfig ){

    // Create the new settings page
    // - in a local plugin this is not defined as standard, so normal $settings->methods will throw an error as
    // $settings will be NULL
    $settings = new admin_settingpage( 'local_inlinetrainer', 'Inline Trainer Settings' );

    // Create
    $ADMIN->add( 'localplugins', $settings );

    // Add a setting field to the settings for this page
    $settings->add( new admin_setting_confightmleditor(

    // This is the reference you will use to your configuration
        'local_inlinetrainer_consent_message',

        // This is the friendly title for the config, which will be displayed
        'Consent message',

        // This is helper text for this config field
        'This is the text users agree to the first time they use the trainer',

        // This is the default value
        '',

        // This is the type of Parameter this config is
        PARAM_RAW

    ) );

    // Add a setting field to the settings for this page
    $settings->add( new admin_setting_confightmleditor(

    // This is the reference you will use to your configuration
        'local_inlinetrainer_help_text',

        // This is the friendly title for the config, which will be displayed
        'Help text',

        // This is helper text for this config field
        'The text shown at the bottom of the inline trainer',

        // This is the default value
        '',

        // This is the type of Parameter this config is
        PARAM_RAW

    ) );

}