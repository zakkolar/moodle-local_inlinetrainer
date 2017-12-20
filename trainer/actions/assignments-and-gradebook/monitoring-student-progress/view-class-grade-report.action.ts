import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {OpenCourseAdministrationFactory} from "../../../shared_steps/open-course-administration.factory";
import {GradesButton} from "../../../shared_steps/grades-button.factory";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['open_course_administration'] = OpenCourseAdministrationFactory(steps['course_page']);

steps['grades_button'] = GradesButton();


steps['course_page'].addPostrequisite(steps['grades_button']);
steps['open_course_administration'].addPostrequisite(steps['grades_button']);



export const ViewClassGradeReportAction: Action = new Action({
    name: 'View class grade report',
    steps:[
        steps['course_page'],
        steps['open_course_administration'],
        steps['grades_button']
    ],
    identifier: 'view_class_grade_report',
    description: 'View a report that gives an overview of students\' grades within the course.'
});
