import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EditingOnFactory} from "../../../shared_steps/editing-on.factory";
import {EventStep} from "../../../step/event-step";
import {ShowHint} from "../../../helpers/show-hint";
import {Checked} from "../../../helpers/checked";
import {RouteStep} from "../../../step/route-step";
import {FillTextInputStep} from "../../../step/fill-text-input-step";
import {FillTextareaStep} from "../../../step/fill-textarea-step";
import {FillMoodleDateTimeStep} from "../../../step/fill-moodle-date-time-step";
import {CheckEventHappened} from "../../../helpers/check-event-happened";
import {AddActivityFactory} from "../../../shared_steps/add-activity.factory";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['editing_on']= EditingOnFactory();

steps['click_add_activity'] = AddActivityFactory();

steps['select_forum'] = new EventStep({
    text: 'Select "forum" as the type of activity',
    help: function(){
        ShowHint('label[for=module_forum]');
    },
    completeEvent: 'change',
    completeTarget: 'input[name=jumplink]',
    checkComplete:function(resolve){
        resolve(Checked('#module_forum'))
    },
    uncompleteEvent: 'change',
    uncompleteTarget: 'input[name=jumplink]',
    identifier: 'select_forum',
    prerequisites: [steps['click_add_activity']]
});

steps['add_button'] = new RouteStep({
    text: 'Click "add"',
    help: function(){
        ShowHint('.chooserdialogue-course-modchooser .submitbutton');
    },
    route: '/course/modedit.php',
    routeExtras: {'parameters':[['add','forum']]},
    identifier:'add_button'
});

steps['forum_name'] = new FillTextInputStep({
   text: 'Type your forum\'s name in "Forum Name"',
    target:'#page-mod-forum-mod #id_name',

    help:function(){
       ShowHint('#page-mod-forum-mod #id_name');
    },
    identifier: 'forum_name',
});

steps['forum_description'] = new FillTextareaStep({
   text: 'Type your forum\'s description in "Description"',
    target:'#page-mod-forum-mod #id_introeditoreditable',
    help:function(){
       ShowHint('#page-mod-forum-mod .editor_atto_wrap');
    },
    identifier: 'forum_description',
    optional:true,
});


steps['save_and_return'] = new EventStep({
    text: 'Click "Save and return"',
    help: function(){
        ShowHint('#id_submitbutton2');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-mod-forum-mod  #mform1', 'submit'));
    },
    completeEvent: 'submit',
    completeTarget: '#page-mod-forum-mod  #mform1',
    identifier: 'save_and_return',
    persistent:true
});

steps['course_page'].addPostrequisite(steps['add_button']);
steps['editing_on'].addPostrequisite(steps['add_button']);
steps['click_add_activity'].addPostrequisite(steps['add_button']);
steps['select_forum'].addPostrequisite(steps['add_button']);



export const CreateForumAction: Action = new Action({
    name: 'Create Forum',
    steps:[steps['course_page'], steps['editing_on'], steps['click_add_activity'], steps['select_forum'], steps['add_button'], steps['forum_name'], steps['forum_description'], steps['save_and_return']],
    identifier: 'create_forum',
    description:'Forums allow students to participate in text-based, threaded discussions.'
});
