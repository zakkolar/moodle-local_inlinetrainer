import {ShowHint} from "../helpers/show-hint";
import {RouteStep} from "../step/route-step";
import {StepFactory} from "./step-factory";
import {CheckEditingModeOn} from "../helpers/check-editing-mode-on";
import {Step} from "../step/step";
import {BodyClassStep} from "../step/body-class-step";

export const GradesButton = StepFactory(BodyClassStep, {
    text: 'Click "Grades"',
    help: function(){
        ShowHint('.block_navigation ul .type_system.contains_branch ul li ul li:nth-of-type(4)');
    },
    className:'path-grade-report',
    identifier:'grades_button'
});