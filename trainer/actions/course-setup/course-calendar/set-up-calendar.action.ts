import {Action} from '../../../action';
import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EditingOnFactory} from "../../../shared_steps/editing-on.factory";
import {AddMoodleBlockStep} from "../../../step/add-moodle-block-step";


const steps = {};
steps['course_page'] = CoursePageFactory();

steps['editing_on']= EditingOnFactory();

steps['add_block']= new AddMoodleBlockStep({
  text: 'Scroll to the "Add a Block" block on the left side of the screen and select "Calendar" from the dropdown menu',
    identifier:'add_block',
  prerequisites:[steps['editing_on']],
  blockType: 'calendar_month',
  checkComplete: function(resolve){
    const $ = require('jquery');
    resolve($('.block_calendar_month').length > 0);
  }
});

steps['course_page'].addPostrequisite(steps['editing_on']);
steps['editing_on'].addPostrequisite(steps['add_block']);

export const SetUpCalendarAction: Action = new Action({
  name: 'Set Up Calendar',
  steps:[steps['course_page'], steps['editing_on'], steps['add_block']],
  identifier: 'set-up-calendar',
    description: 'Add a calendar block to your course page that displays assignment due dates and custom events.'
});
