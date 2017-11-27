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
import {AddActivityFactory} from "../../../shared_steps/add-activity.factory";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['editing_on']= EditingOnFactory();

steps['click_add_activity'] = AddActivityFactory();

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
    identifier: 'select_assignment',
    prerequisites: [steps['click_add_activity']]
});

steps['add_button'] = new RouteStep({
    text: 'Click "add"',
    help: function(){
        ShowHint('.chooserdialogue-course-modchooser .submitbutton');
    },
    route: '/course/modedit.php',
    routeExtras: {'parameters':[['add','assign']]},
    identifier:'add_button'
});

steps['assignment_name'] = new FillTextInputStep({
   text: 'Type your assignment\'s name in "Assignment Name"',
    target:'#page-mod-assign-mod #id_name',

    help:function(){
       ShowHint('#page-mod-assign-mod #id_name');
    },
    identifier: 'assignment_name',
});

steps['assignment_description'] = new FillTextareaStep({
   text: 'Type your assignment\'s description in "Description"',
    target:'#page-mod-assign-mod #id_introeditoreditable',
    help:function(){
       ShowHint('#page-mod-assign-mod .editor_atto_wrap');
    },
    identifier: 'assignment_description',
    optional:true,
});

steps['allow_submissions_from'] = new FillMoodleDateTimeStep({
   text: 'Set the date to start allowing submissions',
    targetBase:'#page-mod-assign-mod #id_allowsubmissionsfromdate',
    help:function(){
       ShowHint('#page-mod-assign-mod .fdate_time_selector:eq(0)');
    },
    identifier: 'allow_submissions_from',
    optional:true,
});
steps['due_date'] = new FillMoodleDateTimeStep({
   text: 'Set the due date for the assignment',
    targetBase:'#page-mod-assign-mod #id_duedate',
    help:function(){
       ShowHint('#page-mod-assign-mod .fdate_time_selector:eq(1)');
    },
    identifier: 'due_date',
    optional:true,
});

steps['save_and_return'] = new EventStep({
    text: 'Click "Save and return"',
    help: function(){
        ShowHint('#id_submitbutton2');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-mod-assign-mod  #mform1', 'submit'));
    },
    completeEvent: 'submit',
    completeTarget: '#page-mod-assign-mod  #mform1',
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
