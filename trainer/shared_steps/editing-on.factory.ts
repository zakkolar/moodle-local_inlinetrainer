import {ShowHint} from "../helpers/show-hint";
import {StepFactory} from "./step-factory";
import {EventStep} from "../step/event-step";
import {CheckEditingModeOn} from "../helpers/check-editing-mode-on";

export const EditingOnFactory = StepFactory(EventStep, {
    text: 'Click "Turn editing on"',
    help: function(){
        ShowHint('#page-header form input:submit');
    },
    completeEvent: 'click',
    completeTarget: '#page-header form input:submit',
    uncompleteEvent: 'click',
    uncompleteTarget: '#page-header form input:submit',

    checkComplete: function(resolve){
        resolve(CheckEditingModeOn());
    },
    identifier: 'editing_on'

});
