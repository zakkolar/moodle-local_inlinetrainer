import {ShowHint} from "../../helpers/show-hint";
import {StepFactory} from "../step-factory";
import {FillTextInputStep} from "../../step/fill-text-input-step";
import {EventStep} from "../../step/event-step";
import {CheckEventHappened} from "../../helpers/check-event-happened";

export const AssignmentSaveAndReturnFactory = StepFactory(EventStep, {
    text: 'Click "Save and return"',
    help: function(){
        ShowHint('#id_submitbutton2');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-mod-assign-mod  #mform1', 'submit'));
    },
    completeEvent: 'submit',
    completeTarget: '#page-mod-assign-mod  #mform1',
    identifier: 'save_and_return',
    persistent:true
});