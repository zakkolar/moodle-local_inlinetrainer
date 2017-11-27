/**
 * FillTextFieldStep is a Step that is completed by filling in a particular text field.
 */
import {EventStep} from "./event-step";
import {CheckValue} from "../helpers/check-value";
import {ShowHint} from "../helpers/show-hint";
import {CheckEventHappened} from "../helpers/check-event-happened";

export class FillTextInputStep extends EventStep {
    constructor(params) {
        const eventParams = {
            completeEvent: 'change keyup',
            completeTarget: params.target,
            checkComplete:function(resolve){
                resolve(CheckEventHappened(params.target, 'change keyup'));
            }
        };
        const allParams = Object.assign(params, eventParams);
        super(allParams);
    }
}