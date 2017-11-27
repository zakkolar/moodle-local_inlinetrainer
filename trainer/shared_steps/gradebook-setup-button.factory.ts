import {ShowHint} from "../helpers/show-hint";
import {RouteStep} from "../step/route-step";
import {StepFactory} from "./step-factory";
import {CheckEditingModeOn} from "../helpers/check-editing-mode-on";

export const GradebookSetupButtonFactory = StepFactory(RouteStep, {
    text: 'Click "Gradebook setup"',
    help: function(){
        const n = CheckEditingModeOn() ? 9 : 8;
        ShowHint('#settingsnav>ul>.type_course.contains_branch>ul>li:nth-of-type('+n+')');
    },
    route: '/grade/edit/tree/index.php',
    identifier:'gradebook_setup_button'
});