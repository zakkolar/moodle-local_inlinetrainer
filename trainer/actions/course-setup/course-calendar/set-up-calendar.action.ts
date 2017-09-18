import {Action} from '../../../action';

import {Step} from '../../../step/step';
import {RouteStep} from '../../../step/route-step';
import {EventStep} from '../../../step/event-step';
import {ShowHint} from '../../../helpers/show-hint';

import {CheckText} from '../../../helpers/check-text';
import {CheckValue} from '../../../helpers/check-value';
import {WatchForEvent, UnwatchForEvent} from '../../../helpers/watch-for-event';
import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EditingOnFactory} from "../../../shared_steps/editing-on.factory";

const $ = require('jquery');


const steps = {};
steps['course_page'] = CoursePageFactory();

steps['editing_on']= EditingOnFactory();

steps['add_block']= new Step({
  text: 'Scroll to the "Add a Block" block on the left side of the screen and select "Calendar" from the dropdown menu',
  help: function(){
    ShowHint('.block_adminblock');
  },
    identifier:'add_block',
  prerequisites:[steps['editing_on']],
  watchComplete: function(callback){
    WatchForEvent('change', '.block_adminblock select', this.id(), function(){
      if (CheckValue('.block_adminblock select', 'calendar_month')) {
        callback();
      }
    });
  },
  unwatchComplete: function(){
    UnwatchForEvent('change', '.block_adminblock select', this.id());
  },
  checkComplete: function(resolve){
    const $ = require('jquery');
    resolve($('.block_calendar_month').length > 0);
  },
  skipPrerequisitesOnInit: true
});

steps['course_page'].addPostrequisite(steps['editing_on']);
steps['editing_on'].addPostrequisite(steps['add_block']);

export const SetUpCalendarAction: Action = new Action({
  name: 'Set Up Calendar',
  steps:[steps['course_page'], steps['editing_on'], steps['add_block']],
  identifier: 'set-up-calendar'
});
