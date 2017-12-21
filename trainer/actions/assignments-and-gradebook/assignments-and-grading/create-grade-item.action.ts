import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EventStep} from "../../../step/event-step";
import {ShowHint} from "../../../helpers/show-hint";
import {RouteStep} from "../../../step/route-step";
import {FillTextInputStep} from "../../../step/fill-text-input-step";
import {CheckEventHappened} from "../../../helpers/check-event-happened";
import {OpenCourseAdministrationFactory} from "../../../shared_steps/open-course-administration.factory";
import {GradebookSetupButtonFactory} from "../../../shared_steps/gradebook-setup-button.factory";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['open_course_administration'] = OpenCourseAdministrationFactory(steps['course_page']);

steps['gradebook_setup_button'] = GradebookSetupButtonFactory();

steps['add_grade_item_button'] = new RouteStep({
    text: 'Click "Add grade item"',
    help: function(){
        ShowHint('#page-grade-edit-tree-index form[action="item.php"] input[type=submit]');
    },
    route: '/grade/edit/tree/item.php',
    identifier:'add_grade_item_button'
});

steps['item_name'] = new FillTextInputStep({
   text: 'Type your graded\'s name in "Item name"',
    target:'#page-grade-edit-tree-item #id_itemname',

    help:function(){
       ShowHint('#page-grade-edit-tree-item #id_itemname');
    },
    identifier: 'item_name',
});



steps['save_changes'] = new EventStep({
    text: 'Click "Save changes"',
    help: function(){
        ShowHint('#id_submitbutton');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-grade-edit-tree-item #mform1', 'submit'));
    },
    completeEvent: 'submit',
    completeTarget: '#page-grade-edit-tree-item  #mform1',
    identifier: 'save_changes',
    persistent:true,
    completeMessage: "Repeat this as many times as you need. Click 'Start over' if you would like to be walked through again."
});

steps['course_page'].addPostrequisite(steps['gradebook_setup_button']);
steps['open_course_administration'].addPostrequisite(steps['gradebook_setup_button']);

steps['gradebook_setup_button'].addPostrequisite(steps['add_grade_item_button']);



export const CreateGradeItemAction: Action = new Action({
    name: 'Create grade item',
    steps:[
        steps['course_page'],
        steps['open_course_administration'],
        steps['gradebook_setup_button'],
        steps['add_grade_item_button'],
        steps['item_name'],
        steps['save_changes']
    ],
    identifier: 'create_graded_item',
    description: 'A graded item is an entry in the gradebook that receives a score but is not tied to a specific assignment/submission. A common use for a graded item is participation.',
});
