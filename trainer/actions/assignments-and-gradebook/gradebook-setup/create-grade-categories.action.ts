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



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['open_course_administration'] = OpenCourseAdministrationFactory();

steps['gradebook_setup_button'] = GradebookSetupButtonFactory();

steps['add_category_button'] = new RouteStep({
    text: 'Click "Add category"',
    help: function(){
        ShowHint('#page-grade-edit-tree-index div.buttons.mdl-align input[type=submit]');
    },
    route: '/grade/edit/tree/category.php',
    identifier:'add_category_button'
});

steps['category_name'] = new FillTextInputStep({
   text: 'Type your category\'s name in "Category Name"',
    target:'#page-grade-edit-tree-category #id_fullname',

    help:function(){
       ShowHint('#page-grade-edit-tree-category #id_fullname');
    },
    identifier: 'category_name',
});



steps['save_changes'] = new EventStep({
    text: 'Click "Save changes"',
    help: function(){
        ShowHint('#id_submitbutton');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-grade-edit-tree-category #mform1', 'submit'));
    },
    completeEvent: 'submit',
    completeTarget: '#page-grade-edit-tree-category  #mform1',
    identifier: 'save_changes',
    persistent:true,
    completeMessage: "Repeat this as many times as you need. Click 'Start over' if you would like to be walked through again."
});

steps['course_page'].addPostrequisite(steps['gradebook_setup_button']);
steps['open_course_administration'].addPostrequisite(steps['gradebook_setup_button']);

steps['gradebook_setup_button'].addPostrequisite(steps['add_category_button']);



export const CreateGradeCategoriesAction: Action = new Action({
    name: 'Create grade categories',
    steps:[steps['course_page'], steps['open_course_administration'], steps['gradebook_setup_button'], steps['add_category_button'], steps['category_name'], steps['save_changes']],
    identifier: 'create_grade_categories'
});
