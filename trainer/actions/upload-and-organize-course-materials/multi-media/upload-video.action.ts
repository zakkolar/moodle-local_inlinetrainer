import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EditingOnFactory} from "../../../shared_steps/editing-on.factory";
import {EventStep} from "../../../step/event-step";
import {AddMoodleBlockStep} from "../../../step/add-moodle-block-step";
import {ShowHint} from "../../../helpers/show-hint";
import {CheckEventHappened} from "../../../helpers/check-event-happened";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['editing_on']= EditingOnFactory();

steps['add_block']= new AddMoodleBlockStep({
    text: 'Scroll to the "Add a Block" block on the left side of the screen and select "LATTE Videos block" from the dropdown menu',
    identifier:'add_block',
    prerequisites:[steps['editing_on']],
    blockType: 'calendar_month',
    checkComplete: function(resolve){
        const $ = require('jquery');
        resolve($('.block_moodle_media').length > 0);
    }
});

steps['add_video'] = new EventStep({
    text: 'Scroll down to the "Latte Videos Block" and click "Add a video" to open a form in a new window. The trainer will not be present, but will remain in this window while you complete the form.',
    help: function(){
        ShowHint('.block_moodle_media .column.c1 a:first-of-type');
    },
    checkComplete: function(resolve){
        setTimeout(function(){
            resolve(CheckEventHappened('.block_moodle_media .column.c1 a:first-of-type','click'))
        },10);
    },
    completeEvent: 'click',
    completeTarget: '.block_moodle_media .column.c1 a:first-of-type',
    identifier: 'add_video',
    completeMessage:'You will receive an email from LTS when your video is ready. It will then appear in the "Latte Videos Block."',
    manualComplete:true,
    prerequisites:[steps['add_block']],
});

steps['editing_on'].addPostrequisite(steps['add_block']);


export const UploadVideoAction: Action = new Action({
    name: 'Add Video',
    steps:[steps['course_page'], steps['editing_on'], steps['add_block'], steps['add_video']],
    identifier: 'upload_video'
});