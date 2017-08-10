import {Step} from './step';

import {WatchForEvent, UnwatchForEvent} from '../helpers/watch-for-event';
/**
 * EventStep is a Step that is completed by a particular event occurring.
 */
export class EventStep extends Step {
    constructor(params) {
        const eventParams = {
            watchComplete: function(callback){
                WatchForEvent(params.completeEvent, params.completeTarget, this.id(), callback);
            },
            unwatchComplete: function(){
                UnwatchForEvent(params.completeEvent, params.completeTarget, this.id());
            },
        };
        if (params.uncompleteEvent && params.uncompleteTarget) {
            eventParams['watchUncomplete'] = function(callback){
                WatchForEvent(params.uncompleteEvent, params.uncompleteTarget, this.id(), callback);
            };
            eventParams['unwatchUncomplete'] = function(){
                UnwatchForEvent(params.uncompleteEvent, params.uncompleteTarget, this.id());
            };
        }
        const allParams = Object.assign(params, eventParams);
        super(allParams);
    }
}
