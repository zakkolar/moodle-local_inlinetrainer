/**
 * FillTextFieldStep is a Step that is completed by filling in a particular text field.
 */
import {EventStep} from "./event-step";
import {CheckValue} from "../helpers/check-value";
import {ShowHint} from "../helpers/show-hint";
import {CheckEventHappened} from "../helpers/check-event-happened";

export class ChangeSelectStep extends EventStep {
    constructor(params) {
        const eventParams = {
            help:function(){
                ShowHint(params.selectId);
            } ,
            checkComplete:function(resolve){
                resolve(CheckEventHappened(params.selectId,'change'));
            },
            completeEvent:'change',
            completeTarget: params.selectId,
        };
        const allParams = Object.assign(params, eventParams);
        super(allParams);
    }
}