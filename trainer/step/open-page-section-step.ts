import {EventStep} from "./event-step";
import {ShowHint} from "../helpers/show-hint";
import {CheckHasClass} from "../helpers/check-has-class";
export class OpenPageSectionStep extends EventStep {
    constructor(params) {
        const defaultParams = {
            help:function(){
                ShowHint(`${params.sectionId} .ftoggler`);
            },
            checkComplete: function(resolve){
                setTimeout(function(){
                    resolve(CheckHasClass(params.sectionId, `collapsed`, true))
                },100);
            },
            completeEvent: `click`,
            completeTarget: `${params.sectionId} .ftoggler`,
            uncompleteEvent: `click`,
            uncompleteTarget: `${params.sectionId} .ftoggler`,

        };

        const allParams = Object.assign(params, defaultParams);
        super(allParams);
    }
}
