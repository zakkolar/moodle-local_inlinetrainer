import {Step} from './step';

import {WatchForEvent, UnwatchForEvent} from '../helpers/watch-for-event';
import {CheckValue} from "../helpers/check-value";
import {ShowHint} from "../helpers/show-hint";
/**
 * AddMoodleBlockStep is a Step that is completed by adding a block to the Moodle page.
 */
export class AddMoodleBlockStep extends Step {
    constructor(params) {
        const blockParams = {
            watchComplete: function(callback){
                WatchForEvent('change', '.block_adminblock select', this.id(), function(){
                    if (CheckValue('.block_adminblock select', params.blockType)) {
                        callback();
                    }
                });
            },
            unwatchComplete: function(){
                UnwatchForEvent('change', '.block_adminblock select', this.id());
            },
            skipPrerequisitesOnInit: true,
            help: function(){
                ShowHint('.block_adminblock');
            },
        };
        const allParams = Object.assign(params, blockParams);
        super(allParams);
    }
}
