import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EventStep} from "../../../step/event-step";
import {ShowHint} from "../../../helpers/show-hint";
import {FillTextInputStep} from "../../../step/fill-text-input-step";
import {CheckEventHappened} from "../../../helpers/check-event-happened";
import {OpenCourseAdministrationFactory} from "../../../shared_steps/open-course-administration.factory";
import {GradebookSetupButtonFactory} from "../../../shared_steps/gradebook-setup-button.factory";
import {RouteStep} from "../../../step/route-step";
import {SetSelectStep} from "../../../step/set-select-step";
import {ItemExists} from "../../../helpers/item-exists";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['open_course_administration'] = OpenCourseAdministrationFactory(steps['course_page']);

steps['gradebook_setup_button'] = GradebookSetupButtonFactory();

steps['set_course_settings'] = new RouteStep({
    text: 'Click "Edit," then "Edit Settings" next to the name of your course.',
    help: function(){
        ShowHint('#page-grade-edit-tree-index .coursecategory.category td:nth-of-type(3)');
    },
    route: '/grade/edit/tree/category.php',
    identifier:'add_category_button'
});

steps['aggregation_natural'] = new SetSelectStep({
    identifier: 'aggregation_natural',
    text:'Set the aggregatoin to "Natural"',
    selectId:'#page-grade-edit-tree-category #id_aggregation',
    selectValue:'13',
    prerequisites:[steps['set_course_settings']]
});


steps['save_settings'] = new EventStep({
    text: 'Click "Save changes"',
    help: function(){
        ShowHint('#page-grade-edit-tree-category  #id_submitbutton');
    },
    checkComplete: function(resolve){
        resolve(ItemExists('.weightoverride'));
    },
    completeEvent: 'submit',
    completeTarget: '#page-grade-edit-tree-category  #mform1',
    identifier: 'save_settings'
});

steps['check_weight_boxes'] = new EventStep({
    text: 'Check the boxes in the "weights" column for all categories/assignments to which you wish to add weights.',
    help: function(){
        ShowHint('#page-grade-edit-tree-index .column-weight input[type=checkbox]');
    },
    completeEvent: 'change',
    completeTarget: '#page-grade-edit-tree-index .column-weight input[type=checkbox]',
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-grade-edit-tree-index .column-weight input[type=checkbox]', 'change'));
    },
    identifier: 'check_weight_boxes',

});

steps['fill_in_weights'] = new FillTextInputStep({
    text: 'Fill in the weight of each category/assignment you checked in the previous step. Make sure the weights add up to 100.',
    help: function(){
        ShowHint('#page-grade-edit-tree-index .column-weight input[type=checkbox]:checked + label + input');
    },
    target: '#page-grade-edit-tree-index .column-weight input[type=text]',
    identifier: 'fill_in_weights',

});




steps['save_changes'] = new EventStep({
    text: 'Click "Save changes"',
    help: function(){
        ShowHint('#gradetreesubmit input[type=submit]');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-grade-edit-tree-index #gradetreeform', 'submit'));
    },
    completeEvent: 'submit',
    completeTarget: '#page-grade-edit-tree-index  #gradetreeform',
    identifier: 'save_changes',
    persistent:true
});

[
    steps['course_page'],
    steps['open_course_administration']
].forEach(function(step){
   step.addPostrequisite(steps['gradebook_setup_button']);
});

[
    steps['course_page'],
    steps['open_course_administration'],
    steps['gradebook_setup_button']
].forEach(function(step){
   step.addPostrequisite(steps['set_course_settings']);
});

[
    steps['set_course_settings'],
    steps['aggregation_natural'],
].forEach(function(step){
   step.addPostrequisite(steps['save_settings']);
});







export const AssignWeightsToCategoriesAction: Action = new Action({
    name: 'Assign weights',
    steps:[
        steps['course_page'],
        steps['open_course_administration'],
        steps['gradebook_setup_button'],
        steps['set_course_settings'],
        steps['aggregation_natural'],
        steps['save_settings'],
        steps['check_weight_boxes'],
        steps['fill_in_weights'],
        steps['save_changes']
    ],
    identifier: 'assign_weights_to_categories',
    description: 'Assign weights to grade categories. The grades within the category will be applied to the overall grade with respect for the weight. For example, assignments in a category of weight 10 would make up 10% of the user\'s total grade.'
});
