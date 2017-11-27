import {ShowHint} from "../helpers/show-hint";
import {StepFactory} from "./step-factory";
import {EventStep} from "../step/event-step";
import {CheckAttribute} from "../helpers/check-attribute";

export const OpenCourseAdministrationFactory = StepFactory(EventStep, {
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