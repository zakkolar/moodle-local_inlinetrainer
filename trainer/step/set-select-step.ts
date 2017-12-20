import {EventStep} from "./event-step";
import {ShowHint} from "../helpers/show-hint";
import {CheckHasClass} from "../helpers/check-has-class";
import {CheckValue} from "../helpers/check-value";
export class SetSelectStep extends EventStep {
    constructor(params) {
        const defaultParams = {
            help:function(){
                ShowHint(params.selectId);
            } ,
            checkComplete: function(resolve){
                resolve(CheckValue(params.selectId, params.selectValue));
            },
            completeEvent:'change',
            completeTarget: params.selectId
        };

        const allParams = Object.assign(params, defaultParams);
        super(allParams);
    }
}
