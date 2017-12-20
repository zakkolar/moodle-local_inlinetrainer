import {WatchForEvent, UnwatchForEvent} from '../helpers/watch-for-event';
import {EventStep} from "./event-step";
import {ShowHint} from "../helpers/show-hint";
import {Checked} from "../helpers/checked";
/**
 * EventStep is a Step that is completed by a particular event occurring.
 */
export class SelectActivityTypeStep extends EventStep {
    constructor(params) {
        const defaultParams = {
            help: function(){
                ShowHint(`label[for=${params.activityType}]`);
            },
            completeEvent: 'change',
            completeTarget: 'input[name=jumplink]',
            checkComplete:function(resolve){
                resolve(Checked(`#${params.activityType}`))
            },
            uncompleteEvent: 'change',
            uncompleteTarget: 'input[name=jumplink]',

        };

        const allParams = Object.assign(params, defaultParams);
        super(allParams);
    }
}
