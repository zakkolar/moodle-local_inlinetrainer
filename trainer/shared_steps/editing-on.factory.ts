import {ShowHint} from "../helpers/show-hint";
import {StepFactory} from "./step-factory";
import {EventStep} from "../step/event-step";
import {CheckValue} from "../helpers/check-value";

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
        resolve(CheckValue('#page-header form input[name="edit"]', 'off'));
    },
    identifier: 'editing_on'

});
