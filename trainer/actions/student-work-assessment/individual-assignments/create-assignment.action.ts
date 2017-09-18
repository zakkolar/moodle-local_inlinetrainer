import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EditingOnFactory} from "../../../shared_steps/editing-on.factory";
import {EventStep} from "../../../step/event-step";
import {ShowHint} from "../../../helpers/show-hint";
import {Checked} from "../../../helpers/checked";
import {RouteStep} from "../../../step/route-step";
import {FillTextInputStep} from "../../../step/fill-text-input-step";
import {FillTextareaStep} from "../../../step/fill-textarea-step";
import {FillMoodleDateTimeStep} from "../../../step/fill-moodle-date-time-step";
import {CheckEventHappened} from "../../../helpers/check-event-happened";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['editing_on']= EditingOnFactory();

steps['click_add_activity'] = new EventStep({
    text: 'Click "Add an activity or resource" in the section to which you wish to add the activity',
    help: function(){
        ShowHint('.section-modchooser-text');
    },
    completeEvent: 'click',
    completeTarget: '.section-modchooser-text',
    checkComplete:function(resolve){
        setTimeout(function(){
            const $ = require('jquery');
            const complete = $('.chooserdialogue-course-modchooser').length>0 && !$('.chooserdialogue-course-modchooser').hasClass('moodle-dialogue-hidden');
            resolve(complete);
        }, 10)
    },
    uncompleteEvent: 'click',
    uncompleteTarget: '.closebutton, .addcancel',
    identifier: 'click_add_activity'
});

steps['select_assignment'] = new EventStep({
    text: 'Select "assignment" as the type of activity',
    help: function(){
        ShowHint('label[for=module_assign]');
    },
    completeEvent: 'change',
    completeTarget: 'input[name=jumplink]',
    checkComplete:function(resolve){
        resolve(Checked('#module_assign'))
    },
    uncompleteEvent: 'change',
    uncompleteTarget: 'input[name=jumplink]',
    identifier: 'enroll_users_popup',
    prerequisites: [steps['click_add_activity']]
});

steps['add_button'] = new RouteStep({
    text: 'Click "add"',
    help: function(){
        ShowHint('.chooserdialogue-course-modchooser .submitbutton');
    },
    checkComplete:function(resolve){
        resolve(false)
    },
    route: '/course/modedit.php',
    routeExtras: {'parameters':[['add','assign']]},
    identifier:'add_button'
});

steps['assignment_name'] = new FillTextInputStep({
   text: 'Type your assignment\'s name in "Assignment Name"',
    field:'#id_name',

    help:function(){
       ShowHint('#id_name');
    },
    identifier: 'assignment_name',
});

steps['assignment_description'] = new FillTextareaStep({
   text: 'Type your assignment\'s description in "Description"',
    field:'#id_introeditoreditable',
    help:function(){
       ShowHint('.editor_atto_wrap');
    },
    identifier: 'assignment_description',
    optional:true,
});

steps['allow_submissions_from'] = new FillMoodleDateTimeStep({
   text: 'Set the date to start allowing submissions',
    fieldBase:'#id_allowsubmissionsfromdate',
    help:function(){
       ShowHint('.fdate_time_selector:eq(0)');
    },
    identifier: 'allow_submissions_from',
    optional:true,
});
steps['due_date'] = new FillMoodleDateTimeStep({
   text: 'Set the due date for the assignment',
    fieldBase:'#id_duedate',
    help:function(){
       ShowHint('.fdate_time_selector:eq(1)');
    },
    identifier: 'due_date',
    optional:true,
});

steps['select_assignment'] = new EventStep({
    text: 'Select "assignment" as the type of activity',
    help: function(){
        ShowHint('label[for=module_assign]');
    },
    completeEvent: 'change',
    completeTarget: 'input[name=jumplink]',
    checkComplete:function(resolve){
        resolve(Checked('#module_assign'))
    },
    uncompleteEvent: 'change',
    uncompleteTarget: 'input[name=jumplink]',
    identifier: 'enroll_users_popup',
    prerequisites: [steps['click_add_activity']]
});

steps['save_and_return'] = new EventStep({
    text: 'Click "Save and return"',
    help: function(){
        ShowHint('#id_submitbutton2');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#mform1', 'submit'));
    },
    completeEvent: 'submit',
    completeTarget: '#mform1',
    identifier: 'save_and_return',
    persistent:true
});

steps['course_page'].addPostrequisite(steps['add_button']);
steps['editing_on'].addPostrequisite(steps['add_button']);
steps['click_add_activity'].addPostrequisite(steps['add_button']);
steps['select_assignment'].addPostrequisite(steps['add_button']);



export const CreateAssignmentAction: Action = new Action({
    name: 'Create Individual Assignment',
    steps:[steps['course_page'], steps['editing_on'], steps['click_add_activity'], steps['select_assignment'], steps['add_button'], steps['assignment_name'], steps['assignment_description'], steps['allow_submissions_from'], steps['due_date'], steps['save_and_return']],
    identifier: 'create_individual_assignment'
});
