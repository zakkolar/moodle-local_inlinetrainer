import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {OpenCourseAdministrationFactory} from "../../../shared_steps/open-course-administration.factory";
import {GradesButton} from "../../../shared_steps/grades-button.factory";
import {ShowHint} from "../../../helpers/show-hint";
import {RouteStep} from "../../../step/route-step";
import {SetSelectStep} from "../../../step/set-select-step";
import {ChangeSelectStep} from "../../../step/change-select-step";
import {EventStep} from "../../../step/event-step";
import {Checked} from "../../../helpers/checked";
import {FillTextInputStep} from "../../../step/fill-text-input-step";
import {CheckEventHappened} from "../../../helpers/check-event-happened";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['open_course_administration'] = OpenCourseAdministrationFactory(steps['course_page']);

steps['grades_button'] = GradesButton();

steps['single_view_button'] = new RouteStep({
    text: 'Click "User report"',
    help: function(){
        ShowHint('.grade-navigation ul.nav.nav-tabs:nth-of-type(2) li:nth-of-type(5)');
    },
    route: '/grade/report/singleview/index.php',
    identifier:'single_view_button'
});

steps['select_grade_item'] = new RouteStep({
    help: function(){
        ShowHint('#page-grade-report-singleview-index select[name=itemid]');
    },
    route: '/grade/report/singleview/index.php',
    routeExtras: {'parameters':[['item','grade']]},
    identifier: 'select_grade_item',
    text:'Select the grade item you wish to set',
});

steps['set_grades'] = new FillTextInputStep({
    text:"Set the grade you wish each student to receive in this category",
    target:'#page-grade-report-singleview-index .generaltable tr td:nth-of-type(3) input[type=text]',

    help:function(){
        ShowHint('#page-grade-report-singleview-index .generaltable tr td:nth-of-type(3) input[type=text]');
    },
});

steps['save_button'] = new EventStep({
    help: function(){
        ShowHint('#page-grade-report-singleview-index div.singleview_buttons.submit input[type=submit]');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-grade-report-singleview-index .reporttable form', 'submit'));
    },
    completeEvent: 'submit',
    completeTarget: '#page-grade-report-singleview-index .reporttable form',
    persistent:true,
    text:'Click "Save" at the top of the page'
});

[
    steps['course_page'],
    steps['open_course_administration'],
].forEach(function(step){
   step.addPostrequisite(steps['grades_button']);
});

[
    steps['grades_button'],
].forEach(function(step){
    step.addPostrequisite(steps['single_view_button']);
});



export const ScoreGradeItemAction: Action = new Action({
    name: 'Score Grade Item',
    steps:[
        steps['course_page'],
        steps['open_course_administration'],
        steps['grades_button'],
        steps['single_view_button'],
        steps['select_grade_item'],
        steps['set_grades'],
        steps['save_button']
    ],
    identifier: 'score_grade_item',
    description: 'Set students\' scores for a grade item not tied to a specific assignment. Grade items are useful for particpation grades.',
});
