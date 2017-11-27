import {ShowHint} from "../helpers/show-hint";
import {RouteStep} from "../step/route-step";
import {StepFactory} from "./step-factory";
import {CheckEditingModeOn} from "../helpers/check-editing-mode-on";

export const GradesButton = StepFactory(RouteStep, {
    text: 'Click "Grades"',
    help: function(){
        const n = CheckEditingModeOn() ? 8 : 7;
        ShowHint('#settingsnav>ul>.type_course.contains_branch>ul>li:nth-of-type('+n+')');
    },
    route: '/grade/report/grader/index.php',
    identifier:'grades_button'
});