/**
 * FillTextFieldStep is a Step that is completed by filling in a particular text field.
 */
import {EventStep} from "./event-step";
import {CheckEventHappened} from "../helpers/check-event-happened";

export class FillMoodleDateTimeStep extends EventStep {
    constructor(params) {
        const eventParams = {
            completeEvent: 'change keyup click',
            completeTarget: params.targetBase+'_day, '+params.targetBase+'_month, '+params.targetBase+'_year, '+params.targetBase+'_hour, '+params.targetBase+'_minute',
            checkComplete:function(resolve){
                resolve(CheckEventHappened(params.targetBase+'_day', 'keyup click change'));
            }
        };
        const allParams = Object.assign(params, eventParams);
        super(allParams);
    }
}