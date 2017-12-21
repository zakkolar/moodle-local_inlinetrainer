import {ShowHint} from "../../helpers/show-hint";
import {StepFactory} from "../step-factory";
import {FillTextareaStep} from "../../step/fill-textarea-step";

export const SetAssignmentDescriptionFactory = StepFactory(FillTextareaStep, {
    text: 'Type your assignment\'s description in "Description"',
    target:'#page-mod-assign-mod #id_introeditoreditable',
    help:function(){
        ShowHint('#page-mod-assign-mod .editor_atto_wrap');
    },
    identifier: 'assignment_description',
    optional:true,
});