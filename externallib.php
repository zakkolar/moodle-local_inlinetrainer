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
        self::validate_capability();

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
        self::validate_capability();

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
        self::validate_capability();

        $favorites = $DB->get_records_menu('local_inlinetrainer_favorite', array(
            'user_id'=>$USER->id
        ), 'created ASC', 'id, action');

        if($favorites != null){
            return $favorites;
        }
        else{
            return [];
        }

    }

    static function get_favorites_returns() {
        return new external_multiple_structure(
            new external_value(PARAM_TEXT, 'identifier of action')
        );
    }

    static function favorite_exists($action){
        global $DB, $USER;
        self::validate_capability();
        return $DB->record_exists('local_inlinetrainer_favorite', array(
            'action'=>$action,
            'user_id'=>$USER->id,

        ));
    }

    public static function set_recent_actions_parameters() {
        return new external_function_parameters(array(
            'actions' => new external_multiple_structure(
                new external_value(PARAM_TEXT, 'identifier of action')
            )));
    }

    public static function set_recent_actions($actions) {
        global $USER, $DB;
        self::validate_capability();
        $params = self::validate_parameters(self::set_recent_actions_parameters(),
            array('actions' => $actions));
        $context = get_context_instance(CONTEXT_USER, $USER->id);
        self::validate_context($context);

        $recent = $DB->get_record('local_inlinetrainer_recent', array(
            'user_id'=>$USER->id,
        ), 'id');


        if($recent==null){
            $recents = new stdClass();

            $recents->actions = implode($params['actions'],",");
            $recents->user_id = $USER->id;

            $lastinsertid = $DB->insert_record('local_inlinetrainer_recent', $recents);

            return $lastinsertid>0;
        }
        else{
            return $DB->set_field('local_inlinetrainer_recent',
                'actions',
                implode($params['actions'],","),
                array(
                    'id'=>$recent->id
                ));
        }

        return false;

    }

    static function set_recent_actions_returns() {
        return new external_value(PARAM_BOOL, 'Whether the recent actions were set');
    }

    public static function get_recent_actions_parameters() {
        return new external_function_parameters([]);
    }

    public static function get_recent_actions() {
        global $USER, $DB;
        self::validate_capability();
        $context = get_context_instance(CONTEXT_USER, $USER->id);
        self::validate_context($context);

        $recent = $DB->get_record('local_inlinetrainer_recent', array(
            'user_id'=>$USER->id,
        ), 'actions');

        if($recent!=null){
            return explode(",",$recent->actions);
        }
        else{
            return [];
        }

    }

    static function get_recent_actions_returns() {
        return new external_multiple_structure(
            new external_value(PARAM_TEXT, 'identifier of action')
        );
    }

    static function validate_capability(){
        global $COURSE;
        require_capability('local/inlinetrainer:usetrainer', context_course::instance($COURSE->id));
    }
}