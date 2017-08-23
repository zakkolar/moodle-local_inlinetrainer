import {Action} from '../../../action';

import {RouteStep} from '../../../step/route-step';
import {EventStep} from '../../../step/event-step';

import {ShowHint} from '../../../helpers/show-hint';
import {CheckValue} from '../../../helpers/check-value';
import {CheckText} from "../../../helpers/check-text";
import {CheckEventHappened} from "../../../helpers/check-event-happened";
import {CoursePageFactory} from "../../../shared_steps/course-page.factory";


const steps = {};
steps['course_page'] = CoursePageFactory();

steps['click_calendar'] = new RouteStep({
  text: 'Scroll to the "Calendar" block on the left side of the screen and click the name of the current month',
  help: function() {
    ShowHint('.block_calendar_month');
  },
  route: '/calendar/view.php',
    routeExtras: {'parameters':[['view','month']]},
  identifier: 'click_calendar'
});
steps['new_event'] = new RouteStep({
  text: 'Click "New Event"',
  help: function(){
    ShowHint('.maincalendar form:eq(1) input:submit');
  },
  route: '/calendar/event.php',
    routeExtras: {'parameters':[['action','new']]},
  identifier: 'new_event'
});
steps['event_type'] = new EventStep({
  text: 'Change "Type of event" to "Course"',
  help: function(){
    ShowHint('#id_eventtype');
  },
  completeEvent: 'change',
  completeTarget: '#id_eventtype',
  checkComplete: function(){
    return CheckValue('#id_eventtype', 'course');
  },
  identifier: 'event_type',

});
steps['event_title'] = new EventStep({
  text: 'Type your event\'s title in "Event Title"',
  completeEvent: 'change keyup',
  completeTarget: '#id_name',
  help: function(){
    ShowHint('#id_name');
  },
  checkComplete: function(){
    return CheckValue('#id_name', '', true);
  },
  identifier: 'event_title',

});
steps['event_description'] = new EventStep({
  text: 'Type your event\'s description in "Description"',
  help: function(){
    ShowHint('.editor_atto');
  },
  optional: true,
  completeEvent: 'change keyup',
  completeTarget: '#id_descriptioneditable',
  checkComplete: function(){
    const $ = require('jquery');
    return CheckText('#id_descriptioneditable', '', true);
  },
  identifier: 'event_description',
});
steps['event_date'] = new EventStep({
  text: 'Type your event\'s date and time in "Date"',
  help: function(){
    ShowHint('.fdate_time_selector');
  },
  checkComplete: function(){
      return CheckEventHappened('#id_timestart_day', 'keyup click change');
  },
  completeEvent: 'change keyup click',
  completeTarget: '#id_timestart_day, #id_timestart_month, #id_timestart_year, #id_timestart_hour, #id_timestart_minute',
  identifier: 'event_date',
});
steps['save_event'] = new RouteStep({
  text: 'Click "Save Changes"',
  help: function(){
    ShowHint('#id_submitbutton');
  },
  route: '/calendar/view.php',
  identifier: 'save_event',
  // prerequisites: [steps['event_title'], steps['event_date']],
  routeExtras: {'parameters':[['view','day']]},
  persistent: true
});

steps['course_page'].addPostrequisite(steps['click_calendar']);

steps['click_calendar'].addPostrequisite(steps['new_event']);

steps['new_event'].addPostrequisite(steps['save_event']);
steps['event_type'].addPostrequisite(steps['save_event']);
steps['event_title'].addPostrequisite(steps['save_event']);
steps['event_description'].addPostrequisite(steps['save_event']);
steps['event_date'].addPostrequisite(steps['save_event']);




export const AddEntryToCalendarAction: Action = new Action({
  name: 'Add Entry To Calendar',
  steps: [steps['course_page'], steps['click_calendar'], steps['new_event'], steps['event_type'], steps['event_title'],
    steps['event_description'], steps['event_date'], steps['save_event']],
  identifier: 'add_entry_to_calendar'
});
