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
import {OpenCourseAdministrationFactory} from "../../../shared_steps/open-course-administration.factory";
import {GradebookSetupButtonFactory} from "../../../shared_steps/gradebook-setup-button.factory";
import {CheckValue} from "../../../helpers/check-value";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['open_course_administration'] = OpenCourseAdministrationFactory();

steps['gradebook_setup_button'] = GradebookSetupButtonFactory();

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

steps['course_page'].addPostrequisite(steps['gradebook_setup_button']);
steps['open_course_administration'].addPostrequisite(steps['gradebook_setup_button']);




export const AssignWeightsToCategoriesAction: Action = new Action({
    name: 'Assign weights',
    steps:[steps['course_page'], steps['open_course_administration'], steps['gradebook_setup_button'], steps['check_weight_boxes'], steps['fill_in_weights'], steps['save_changes']],
    identifier: 'assign_weights_to_categories',
    description: 'Assign weights to grade categories. The grades within the category will be applied to the overall grade with respect for the weight. For example, assignments in a category of weight 10 would make up 10% of the user\'s total grade.'
});
