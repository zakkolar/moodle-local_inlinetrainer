/**
 * FillTextFieldStep is a Step that is completed by filling in a particular text field.
 */
import {EventStep} from "./event-step";
import {CheckEventHappened} from "../helpers/check-event-happened";

export class FillMoodleDateTimeStep extends EventStep {
    constructor(params) {
        const eventParams = {
            completeEvent: 'change keyup click',
            completeTarget: params.fieldBase+'_day, '+params.fieldBase+'_month, '+params.fieldBase+'_year, '+params.fieldBase+'_hour, '+params.fieldBase+'_minute',
            checkComplete:function(resolve){
                resolve(CheckEventHappened(params.fieldBase+'_day', 'keyup click change'));
            }
        };
        const allParams = Object.assign(params, eventParams);
        super(allParams);
    }
}