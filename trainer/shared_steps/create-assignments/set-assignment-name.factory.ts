import {ShowHint} from "../../helpers/show-hint";
import {StepFactory} from "../step-factory";
import {FillTextInputStep} from "../../step/fill-text-input-step";

export const SetAssignmentNameFactory = StepFactory(FillTextInputStep, {
    text: 'Type your assignment\'s name in "Assignment Name"',
    target:'#page-mod-assign-mod #id_name',

    help:function(){
        ShowHint('#page-mod-assign-mod #id_name');
    },
    identifier: 'assignment_name',
});