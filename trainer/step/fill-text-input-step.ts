/**
 * FillTextFieldStep is a Step that is completed by filling in a particular text field.
 */
import {EventStep} from "./event-step";
import {CheckValue} from "../helpers/check-value";
import {ShowHint} from "../helpers/show-hint";

export class FillTextInputStep extends EventStep {
    constructor(params) {
        const eventParams = {
            completeEvent: 'change keyup',
            completeTarget: params.field,
            checkComplete:function(resolve){
                resolve(CheckValue(params.field, '', true));
            }
        };
        const allParams = Object.assign(params, eventParams);
        super(allParams);
    }
}