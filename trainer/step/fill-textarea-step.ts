/**
 * FillTextFieldStep is a Step that is completed by filling in a particular text field.
 */
import {EventStep} from "./event-step";
import {CheckText} from "../helpers/check-text";

export class FillTextareaStep extends EventStep {
    constructor(params) {
        const eventParams = {
            completeEvent: 'change keyup',
            completeTarget: params.target,
            checkComplete:function(resolve){
                resolve(CheckText(params.target, '', true));
            },
        };
        const allParams = Object.assign(params, eventParams);
        super(allParams);
    }
}