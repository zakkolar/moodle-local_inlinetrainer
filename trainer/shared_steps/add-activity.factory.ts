import {ShowHint} from "../helpers/show-hint";
import {StepFactory} from "./step-factory";
import {EventStep} from "../step/event-step";

export const AddActivityFactory = StepFactory(EventStep, {
    text: 'Click "Add an activity or resource" in the section to which you wish to add the activity',
    help: function(){
        ShowHint('.section-modchooser-text');
    },
    completeEvent: 'click',
    completeTarget: '.section-modchooser-text',
    checkComplete:function(resolve){
        setTimeout(function(){
            const $ = require('jquery');
            const complete = $('.chooserdialogue-course-modchooser').length>0 && !$('.chooserdialogue-course-modchooser').hasClass('moodle-dialogue-hidden');
            resolve(complete);
        }, 10)
    },
    uncompleteEvent: 'click',
    uncompleteTarget: '.closebutton, .addcancel',
    identifier: 'click_add_activity'
});