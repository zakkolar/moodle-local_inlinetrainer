import {Action} from '../../../action';

import {RouteStep} from '../../../step/route-step';
import {EventStep} from '../../../step/event-step';

import {ShowHint} from '../../../helpers/show-hint';
import {CheckValue} from '../../../helpers/check-value';
import {CheckText} from "../../../helpers/check-text";
import {CheckEventHappened} from "../../../helpers/check-event-happened";
import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {FillTextInputStep} from "../../../step/fill-text-input-step";
import {FillTextareaStep} from "../../../step/fill-textarea-step";
import {FillMoodleDateTimeStep} from "../../../step/fill-moodle-date-time-step";
import {CalendarBlockFactory} from "../../../shared_steps/calendar-block.factory";
import {OpenPageSectionStep} from "../../../step/open-page-section-step";
import {CheckboxStep} from "../../../step/checkbox-step";


const steps = {};
steps['course_page'] = CoursePageFactory();

steps['click_calendar'] = CalendarBlockFactory();

steps['click_event_title'] = new RouteStep({
  text: 'Click the title of an existing event',
  help: function(){
    ShowHint('.maincalendar .calendarmonth');
  },
    route: '/calendar/view.php',
    identifier: 'click_event_title',
    routeExtras: {'parameters':[['view','day']]},
});

steps['event_edit'] = new RouteStep({
  text: 'Click the gear icon to edit the event',
  help: function(){
    ShowHint('.event .commands a:first-of-type');
  },
    route: '/calendar/event.php',
    routeExtras: {'parameters':[['action','edit']]},
  identifier: 'event_edit',

});


steps['event_title'] = new FillTextInputStep({
  text: 'Edit the title of the event',
  target: '#page-calendar-event #id_name',
  help: function(){
    ShowHint('#page-calendar-event #id_name');
  },
  identifier: 'event_title',
    optional:true

});



steps['event_description'] = new FillTextareaStep({
  text: 'Edit the description of the event',
  help: function(){
    ShowHint('#page-calendar-event .editor_atto');
  },
  optional: true,
  target: '#page-calendar-event #id_descriptioneditable',
  identifier: 'event_description',
});
steps['event_date'] = new FillMoodleDateTimeStep({
  text: 'Edit the date of the event',
  help: function(){
    ShowHint('#page-calendar-event .fdate_time_selector');
  },
  targetBase: '#page-calendar-event #id_timestart',
  identifier: 'event_date',
    optional:true
});

// steps['open_duration'] = new OpenPageSectionStep({
//     text:'Open the "Duration" settings section',
//     sectionId: '#page-calendar-event #id_durationdetails',
//     optional:true,
//     identifier:'open_duration',
// });

steps['select_duration_minutes'] = new CheckboxStep({
    identifier: 'select_duration_minutes',
    text:'Select "Duration in minutes" for the duration of the event',
    checkId:'#page-calendar-event #id_duration_2',
    optional:true
});

steps['set_duration'] = new FillTextInputStep({
    text: 'Set the duration of the event',
    help: function(){
        ShowHint('#page-calendar-event .id_timedurationminutes');
    },
    optional: true,
    target: '#page-calendar-event #id_timedurationminutes',
    identifier: 'set_duration',
});



steps['save_event'] = new EventStep({
  text: 'Click "Save Changes"',
  help: function(){
    ShowHint('#id_submitbutton');
  },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-calendar-event #mform1', 'submit'));
    },
    completeEvent: 'submit',
    completeTarget: '#page-calendar-event #mform1',
    persistent:true,
});

steps['course_page'].addPostrequisite(steps['click_calendar']);

steps['click_calendar'].addPostrequisite(steps['click_event_title']);

steps['click_event_title'].addPostrequisite(steps['event_edit']);

steps['click_event_title'].addPostrequisite(steps['save_event']);
steps['event_title'].addPostrequisite(steps['save_event']);
steps['event_description'].addPostrequisite(steps['save_event']);
steps['event_date'].addPostrequisite(steps['save_event']);
steps['select_duration_minutes'].addPostrequisite(steps['save_event']);
steps['set_duration'].addPostrequisite(steps['save_event']);
// steps['open_duration'].addPostrequisite(steps['save_event']);




export const EditCalendarEntry: Action = new Action({
  name: 'Edit Calendar Entry',
  steps: [
      steps['course_page'],
      steps['click_calendar'],
      steps['click_event_title'],
      steps['event_edit'],
      steps['event_title'],
      steps['event_description'],
      steps['event_date'],
      steps['select_duration_minutes'],
      steps['set_duration'],
      steps['save_event']
  ],
  identifier: 'select_duration_minutes',
    description: 'Edit an existing entry in the course calendar.'
});
