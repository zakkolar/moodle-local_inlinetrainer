<?php
require_once($CFG->libdir . "/externallib.php");
class local_inlinetrainer_external extends external_api {

    public static function add_favorite_parameters() {
        return new external_function_parameters(
            array('action' => new external_value(PARAM_TEXT, 'The identifier of the action to add to favorites'))
        );
    }

    public static function add_favorite($action) {
        global $USER, $DB;

        $params = self::validate_parameters(self::add_favorite_parameters(),
            array('action' => $action));


        $context = get_context_instance(CONTEXT_USER, $USER->id);
        self::validate_context($context);





        if(!self::favorite_exists($params['action'])){
            $favorite = new stdClass();

            $favorite->created = time();
            $favorite->action = $params['action'];
            $favorite->user_id = $USER->id;

            $lastinsertid = $DB->insert_record('local_inlinetrainer_favorite', $favorite);

            return $lastinsertid>0;
        }

        return false;

    }

     static function add_favorite_returns() {
        return new external_value(PARAM_BOOL, 'Whether the favorite was added');
    }



    public static function remove_favorite_parameters() {
        return new external_function_parameters(
            array('action' => new external_value(PARAM_TEXT, 'The identifier of the action to remove from favorites'))
        );
    }

    public static function remove_favorite($action) {
        global $USER, $DB;

        $params = self::validate_parameters(self::remove_favorite_parameters(),
            array('action' => $action));

        $context = get_context_instance(CONTEXT_USER, $USER->id);
        self::validate_context($context);

        if(self::favorite_exists($params['action'])) {

            $deleted = $DB->delete_records('local_inlinetrainer_favorite', array(
                'action' => $params['action'],
                'user_id' => $USER->id,

            ));

            return $deleted;
        }
        return false;
    }

    static function remove_favorite_returns() {
        return new external_value(PARAM_BOOL, 'Whether the favorite was removed');
    }


    public static function get_favorites_parameters() {
        return new external_function_parameters([]);
    }

    public static function get_favorites() {
        global $USER, $DB;


        $context = get_context_instance(CONTEXT_USER, $USER->id);
        self::validate_context($context);

        $favorites = $DB->get_records_menu('local_inlinetrainer_favorite', array(
            'user_id'=>$USER->id
        ), 'created ASC', 'id, action');

        return $favorites;
    }

    static function get_favorites_returns() {
        return new external_multiple_structure(
            new external_value(PARAM_TEXT, 'identifier of action')
        );
    }

    static function favorite_exists($action){
        global $DB, $USER;
        return $DB->record_exists('local_inlinetrainer_favorite', array(
            'action'=>$action,
            'user_id'=>$USER->id,

        ));
    }
}