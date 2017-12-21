import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {OpenCourseAdministrationFactory} from "../../../shared_steps/open-course-administration.factory";
import {GradesButton} from "../../../shared_steps/grades-button.factory";
import {ShowHint} from "../../../helpers/show-hint";
import {RouteStep} from "../../../step/route-step";
import {SetSelectStep} from "../../../step/set-select-step";
import {ChangeSelectStep} from "../../../step/change-select-step";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['open_course_administration'] = OpenCourseAdministrationFactory(steps['course_page']);

steps['grades_button'] = GradesButton();

steps['user_report_button'] = new RouteStep({
    text: 'Click "User report"',
    help: function(){
        ShowHint('.grade-navigation ul.nav.nav-tabs:nth-of-type(2) li:nth-of-type(6)');
    },
    route: '/grade/report/user/index.php',
    identifier:'user_report_button'
});

steps['select_user'] = new ChangeSelectStep({
    identifier: 'select_user',
    text:'Select the user whose report you wish to see',
    selectId:'#page-grade-report-user-index #choosegradeuser select',
    persistent:true
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
    step.addPostrequisite(steps['user_report_button']);
});



export const ViewStudentGradeReportAction: Action = new Action({
    name: 'View student grade report',
    steps:[
        steps['course_page'],
        steps['open_course_administration'],
        steps['grades_button'],
        steps['user_report_button'],
        steps['select_user'],
    ],
    identifier: 'view_student_grade_report',
    description: 'View a report that shows a specific student\'s grades in your class',
});
