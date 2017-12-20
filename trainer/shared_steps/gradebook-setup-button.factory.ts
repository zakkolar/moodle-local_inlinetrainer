import {ShowHint} from "../helpers/show-hint";
import {RouteStep} from "../step/route-step";
import {StepFactory} from "./step-factory";
import {CheckEditingModeOn} from "../helpers/check-editing-mode-on";
import {Step} from "../step/step";

export const GradebookSetupButtonFactory = function(course_page_step:Step){
    let factory = StepFactory(RouteStep, {
        text: 'Click "Gradebook setup"',
        help: function(){
            const n = CheckEditingModeOn() ? 8 : 7;
            ShowHint('#settingsnav>ul>.type_course.contains_branch>ul>li:nth-of-type(6)');
        },
        route: '/grade/edit/tree/index.php',
        identifier:'gradebook_setup_button',
        prerequisites:[course_page_step]
    });

    return factory();
}