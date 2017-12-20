import {EventStep} from "./event-step";
import {ShowHint} from "../helpers/show-hint";
import {Checked} from "../helpers/checked";

export class CheckboxStep extends EventStep {
    constructor(params) {
        const defaultParams = {
            help:function(){
                ShowHint(params.checkId);
            } ,
            checkComplete: function(resolve){
                resolve(Checked(params.checkId));
            },
            completeEvent:'change',
            completeTarget: params.checkId,
            uncompleteEvent:'change',
            uncompleteTarget: params.checkId
        };

        const allParams = Object.assign(params, defaultParams);
        super(allParams);
    }
}
