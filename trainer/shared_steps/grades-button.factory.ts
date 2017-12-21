import {ShowHint} from "../helpers/show-hint";
import {RouteStep} from "../step/route-step";
import {StepFactory} from "./step-factory";
import {CheckEditingModeOn} from "../helpers/check-editing-mode-on";

export const GradesButton = StepFactory(RouteStep, {
    text: 'Click "Grades"',
    help: function(){
        ShowHint('.block_navigation ul .type_system.contains_branch ul li ul li:nth-of-type(4)');
    },
    route: '/grade/report/grader/index.php',
    identifier:'grades_button'
});