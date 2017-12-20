import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EditingOnFactory} from "../../../shared_steps/editing-on.factory";
import {EventStep} from "../../../step/event-step";
import {ShowHint} from "../../../helpers/show-hint";
import {RouteStep} from "../../../step/route-step";
import {FillTextInputStep} from "../../../step/fill-text-input-step";
import {FillTextareaStep} from "../../../step/fill-textarea-step";
import {FillMoodleDateTimeStep} from "../../../step/fill-moodle-date-time-step";
import {CheckEventHappened} from "../../../helpers/check-event-happened";
import {AddActivityFactory} from "../../../shared_steps/add-activity.factory";
import {SelectAssignmentActivityFactory} from "../../../shared_steps/select-assignment-activity.factory";
import {SetSelectStep} from "../../../step/set-select-step";
import {OpenGradeSectionFactory} from "../../../shared_steps/open-grade-section.factory";
import {OpenPageSectionStep} from "../../../step/open-page-section-step";
import {CheckboxStep} from "../../../step/checkbox-step";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['editing_on']= EditingOnFactory();

steps['click_add_activity'] = AddActivityFactory();

steps['select_assignment'] = SelectAssignmentActivityFactory(steps['click_add_activity']);

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

steps['open_feedback_types'] = new OpenPageSectionStep({
    text:'Open the "Feedback types" settings section',
    sectionId: '#page-mod-assign-mod #id_feedbacktypes',
    identifier: 'open_feedback_types',
});

steps['set_feedback_types'] = new CheckboxStep({
    identifier: 'set_feedback_types',
    text:'Check the "Feedback comments" box to give students written feedback on their submissions',
    checkId:'#page-mod-assign-mod #id_assignfeedback_comments_enabled',
    prerequisites:[steps['open_feedback_types']]
});

steps['open_grade_section'] = OpenGradeSectionFactory();



steps['set_grade_type'] = new SetSelectStep({
    identifier: 'set_grade_type',
    text:'Set the type to "Point"',
    selectId:'#page-mod-assign-mod #id_grade_modgrade_type',
    selectValue:'point',
    prerequisites:[steps['open_grade_section']]
});

steps['set_maxiumum_grade'] = new FillTextInputStep({
    text: 'Set the maximum grade students can receive on this assignment.',
    target:'#page-mod-assign-mod #id_grade_modgrade_point',

    help:function(){
        ShowHint('#page-mod-assign-mod #id_grade_modgrade_point');
    },
    identifier: 'set_maxiumum_grade',
    optional:true,
});

steps['set_grade_category'] = new EventStep({
   optional: true,
   identifier: 'set_grade_category',
    text:'Set the "Grade Category" to place this assignment into a category in the gradebook.',
   help:function(){
    ShowHint('#id_gradecat');
   } ,
    checkComplete:function(resolve){
       resolve(CheckEventHappened('#page-mod-assign-mod #id_gradecat','change'));
    },
    completeEvent:'change',
    completeTarget: '#page-mod-assign-mod #id_gradecat'
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


[
    steps['course_page'],
    steps['editing_on'],
    steps['click_add_activity'],
    steps['select_assignment'],
].forEach(function(step){
    step.addPostrequisite(steps['add_button']);
});

[
    steps['assignment_description'],
    steps['allow_submissions_from'],
    steps['due_date'],
    steps['open_feedback_types'],
    steps['set_feedback_types'],
    steps['open_grade_section'],
    steps['set_grade_type'],
    steps['set_maxiumum_grade'],
    steps['set_grade_category'],
].forEach(function(step){
   step.addPostrequisite(steps['save_and_return']);
});


export const CreateGradedAssignmentAction: Action = new Action({
    name: 'Create graded assignment',
    steps:[
        steps['course_page'],
        steps['editing_on'],
        steps['click_add_activity'],
        steps['select_assignment'],
        steps['add_button'],
        steps['assignment_name'],
        steps['assignment_description'],
        steps['allow_submissions_from'],
        steps['due_date'],
        steps['open_feedback_types'],
        steps['set_feedback_types'],
        steps['open_grade_section'],
        steps['set_grade_type'],
        steps['set_maxiumum_grade'],
        steps['set_grade_category'],
        steps['save_and_return']
    ],
    identifier: 'create_individual_assignment',
    description: 'Create a place for students to submit an assignment through your course page. Assignment will receive a grade and display in the gradebook.'
});
