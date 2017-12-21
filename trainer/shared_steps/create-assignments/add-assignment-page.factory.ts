import {ShowHint} from "../../helpers/show-hint";
import {RouteStep} from "../../step/route-step";
import {StepFactory} from "../step-factory";

export const AddAssignmentPageFactory = StepFactory(RouteStep, {
    text: 'Click "add"',
    help: function(){
        ShowHint('.chooserdialogue-course-modchooser .submitbutton');
    },
    route: '/course/modedit.php',
    routeExtras: {'parameters':[['add','assign']]},
    identifier:'add_button'
});