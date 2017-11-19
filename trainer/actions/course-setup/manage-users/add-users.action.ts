import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EventStep} from "../../../step/event-step";
import {ShowHint} from "../../../helpers/show-hint";
import {CheckAttribute} from "../../../helpers/check-attribute";
import {RouteStep} from "../../../step/route-step";
import {CheckEventHappened} from "../../../helpers/check-event-happened";


const steps = {};
steps['course_page'] = CoursePageFactory();

steps['open_course_administration'] = new EventStep({
    text: 'Open the "Course Administration" menu on the left side of the screen',
    help: function(){
        ShowHint('#settingsnav .type_course.contains_branch');
    },
    checkComplete: function(resolve){
        setTimeout(function(){
            resolve(CheckAttribute('#settingsnav>ul>.type_course.contains_branch>p.tree_item', 'aria-expanded','true'))
        },100);
    },
    completeEvent: 'click',
    completeTarget: '#settingsnav>ul>.type_course.contains_branch>p.tree_item',
    uncompleteEvent: 'click',
    uncompleteTarget: '#settingsnav>ul>.type_course.contains_branch>p.tree_item',
    identifier: 'open_course_administration',
});

steps['open_users'] = new EventStep({
    text: 'Open the "Users" submenu under "Course Administration" on the left side of the screen',
    help: function(){
        ShowHint('#settingsnav>ul>.type_course.contains_branch>ul>li.type_unknown.contains_branch>p');
    },
    checkComplete: function(resolve){
        setTimeout(function(){
            resolve(CheckAttribute('#settingsnav>ul>.type_course.contains_branch>ul>li.type_unknown.contains_branch>p', 'aria-expanded','true'))
        },10);
    },
    completeEvent: 'click',
    completeTarget: '#settingsnav>ul>.type_course.contains_branch>ul>li.type_unknown.contains_branch>p',
    uncompleteEvent: 'click',
    uncompleteTarget: '#settingsnav>ul>.type_course.contains_branch>ul>li.type_unknown.contains_branch>p',
    identifier: 'open_users',
    prerequisites:[steps['open_course_administration']],
});

steps['enrolled_users_page'] = new RouteStep({
    text: 'Click "Enrolled Users"',
    help: function(){
        ShowHint('#settingsnav>ul>.type_course.contains_branch>ul>li.type_unknown:nth-of-type(3)>ul>li:first-of-type>p');
    },
    route: '/enrol/users.php',
    identifier: 'enrolled_users_page'
});


steps['enroll_users_popup'] = new EventStep({
    text: 'Click "Enroll users"',
    help: function(){
        ShowHint('.enrol_user_buttons input[type=submit]');
    },
    completeEvent: 'click',
    completeTarget: '.enrol_user_buttons input[type=submit]',
    checkComplete:function(resolve){
        setTimeout(function(){
            const $ = require('jquery');
            const panel = $('.user-enroller-panel');
            const complete = panel.length>0 && panel.css('display').toString() === 'block';
            resolve(complete);
        }, 10)
    },
    uncompleteEvent: 'click',
    uncompleteTarget: '.user-enroller-panel .close, .user-enroller-panel .close-button button',
    identifier: 'enroll_users_popup'
});

steps['role_type'] = new EventStep({
    text: 'Set the role you would like the user to have (e.g. Grading TA, Guest Student, etc.)',
    help: function(){
        ShowHint('#id_enrol_manual_assignable_roles');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#id_enrol_manual_assignable_roles', 'keyup click change'));
    },
    completeEvent: 'change keyup click',
    completeTarget: '#id_enrol_manual_assignable_roles',
    identifier: 'role_type',
    prerequisites:[steps['enroll_users_popup']],
    optional:true

});

steps['search_users'] = new EventStep({
    text: 'Search for the users you wish to add',
    help: function(){
        ShowHint('.uep-search');
    },
    optional:true,
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#searchbtn', 'click'));
    },
    completeEvent: 'click',
    completeTarget: '#searchbtn',
    identifier: 'search_users',
    prerequisites:[steps['enroll_users_popup']]

});

steps['enroll_users_button']= new EventStep({
    text: 'Click "enroll" next to the names of all users you wish to add',
    help: function(){
        ShowHint('input[type=button].enrol');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('input[type=button].enrol', 'click'));
    },
    completeEvent: 'click',
    completeTarget: 'input[type=button].enrol',
    identifier: 'enroll_users_button',
    prerequisites:[steps['enroll_users_popup']]

});

steps['finish_enrolling_users'] =  new EventStep({
    text: 'Click "finish enrolling users"',
    help: function(){
        ShowHint('.close-button input[type=button]');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('.close-button input[type=button]','click'));
    },
    completeEvent: 'click',
    completeTarget: '.close-button input[type=button]',
    identifier: 'finish_enrolling_users',
    prerequisites:[steps['enroll_users_button']],
    persistent:true

});


steps['course_page'].addPostrequisite(steps['open_course_administration']);
steps['open_course_administration'].addPostrequisite(steps['enrolled_users_page']);
steps['open_users'].addPostrequisite(steps['enrolled_users_page']);



export const AddUsersAction: Action = new Action({
    name: 'Add Users To Course',
    steps:[steps['course_page'], steps['open_course_administration'], steps['open_users'], steps['enrolled_users_page'], steps['enroll_users_popup'], steps['role_type'], steps['search_users'], steps['enroll_users_button'], steps['finish_enrolling_users']],
    identifier: 'add_users'
});
