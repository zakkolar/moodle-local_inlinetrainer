/**
 * FillTextFieldStep is a Step that is completed by filling in a particular text field.
 */
import {EventStep} from "./event-step";
import {CheckText} from "../helpers/check-text";
import {CheckEventHappened} from "../helpers/check-event-happened";

export class FillTextareaStep extends EventStep {
    constructor(params) {
        const eventParams = {
            completeEvent: 'change keyup',
            completeTarget: params.target,
            checkComplete:function(resolve){
                resolve(CheckEventHappened(params.target, 'change keyup'));
            },
        };
        const allParams = Object.assign(params, eventParams);
        super(allParams);
    }
}