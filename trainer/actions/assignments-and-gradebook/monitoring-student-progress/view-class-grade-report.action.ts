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
import {OpenCourseAdministrationFactory} from "../../../shared_steps/open-course-administration.factory";
import {GradebookSetupButtonFactory} from "../../../shared_steps/gradebook-setup-button.factory";
import {GradesButton} from "../../../shared_steps/grades-button.factory";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['open_course_administration'] = OpenCourseAdministrationFactory();

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
    identifier: 'view_class_grade_report'
});
