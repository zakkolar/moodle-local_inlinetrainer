import {Action} from '../../../action';

import {Step} from '../../../step/step';
import {RouteStep} from '../../../step/route-step';
import {EventStep} from '../../../step/event-step';
import {ShowHint} from '../../../helpers/show-hint';

import {CheckText} from '../../../helpers/check-text';
import {CheckValue} from '../../../helpers/check-value';
import {WatchForEvent, UnwatchForEvent} from '../../../helpers/watch-for-event';
import {CoursePageStep} from "../../../shared_steps/course-page.step";

const $ = require('jquery');


const steps = {};
steps['course_page'] = CoursePageStep;

steps['editing_on']= new EventStep({
  text: 'Click "Turn editing on"',
  help: function(){
    ShowHint('#page-header form input:submit');
  },
  completeEvent: 'click',
  completeTarget: '#page-header form input:submit',
  uncompleteEvent: 'click',
  uncompleteTarget: '#page-header form input:submit',

  checkComplete: function(){
    return CheckValue('#page-header form input[name="edit"]', 'off');
  },
  identifier: 'editing_on'

});
steps['add_block']= new Step({
  text: 'Scroll to the "Add a Block" block on the left side of the screen and select "Calendar" from the dropdown menu',
  help: function(){
    ShowHint('.block_adminblock');
  },
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
  checkComplete: function(){
    const $ = require('jquery');
    return $('.block_calendar_month').length > 0;
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
