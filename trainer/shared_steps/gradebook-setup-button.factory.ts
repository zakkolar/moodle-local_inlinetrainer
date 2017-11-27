import {ShowHint} from "../helpers/show-hint";
import {RouteStep} from "../step/route-step";
import {StepFactory} from "./step-factory";

export const GradebookSetupButtonFactory = StepFactory(RouteStep, {
    text: 'Click "Gradebook setup"',
    help: function(){
        ShowHint('#settingsnav>ul>.type_course.contains_branch>ul>li:nth-of-type(9)');
    },
    route: '/grade/edit/tree/index.php',
    identifier:'gradebook_setup_button'
});