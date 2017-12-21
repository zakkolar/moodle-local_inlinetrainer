import {Action} from '../../../action';

import {CoursePageFactory} from "../../../shared_steps/course-page.factory";
import {EditingOnFactory} from "../../../shared_steps/editing-on.factory";
import {EventStep} from "../../../step/event-step";
import {ShowHint} from "../../../helpers/show-hint";
import {FillTextInputStep} from "../../../step/fill-text-input-step";
import {FillTextareaStep} from "../../../step/fill-textarea-step";
import {FillMoodleDateTimeStep} from "../../../step/fill-moodle-date-time-step";
import {CheckEventHappened} from "../../../helpers/check-event-happened";
import {AddActivityFactory} from "../../../shared_steps/add-activity.factory";
import {SelectAssignmentActivityFactory} from "../../../shared_steps/select-assignment-activity.factory";
import {SetSelectStep} from "../../../step/set-select-step";
import {OpenAssignmentGradeSectionFactory} from "../../../shared_steps/create-assignments/open-assignment-grade-section.factory";
import {OpenPageSectionStep} from "../../../step/open-page-section-step";
import {CheckboxStep} from "../../../step/checkbox-step";
import {AddAssignmentPageFactory} from "../../../shared_steps/create-assignments/add-assignment-page.factory";
import {SetAssignmentNameFactory} from "../../../shared_steps/create-assignments/set-assignment-name.factory";
import {SetAssignmentDescriptionFactory} from "../../../shared_steps/create-assignments/set-assignment-description.factory";
import {SetAssignmentAllowSubmissionsFromFactory} from "../../../shared_steps/create-assignments/set-assignment-allow-submissions-from.factory";
import {SetAssignmentDueDateFactory} from "../../../shared_steps/create-assignments/set-assignment-due-date.factory";
import {OpenAssignmentFeedbackTypesFactory} from "../../../shared_steps/create-assignments/open-assignment-feedback-types.factory";
import {SetAssignmentFeedbackCommentsFactory} from "../../../shared_steps/create-assignments/set-assignment-feedback-comments.factory";
import {SetAssignmentGradeCategoryFactory} from "../../../shared_steps/create-assignments/set-assignment-grade-category.factory";
import {AssignmentSaveAndReturnFactory} from "../../../shared_steps/create-assignments/assignment-save-and-return.factory";
import {SetAssignmentFeedbackFilesactory} from "../../../shared_steps/create-assignments/set-assignment-feedback-files.factory";
import {RouteStep} from "../../../step/route-step";
import {ItemExists} from "../../../helpers/item-exists";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['click_activity_name'] = new RouteStep({
    text: 'Click the name of the assignment you wish to grade.',
    help: function(){
        ShowHint('.course-content');
    },
    route: '/mod/assign/view.php',
    identifier:'click_activity_name'
});

steps['click_grade_button'] = new EventStep({
    text: 'Click "Grade"',
    help: function(){
        ShowHint('#page-mod-assign-view .submissionlinks .btn-primary');
    },
    checkComplete: function(resolve){
        resolve(CheckEventHappened('#page-mod-assign-view .submissionlinks .btn-primary','click'));
    },
    completeEvent: 'click',
    completeTarget: '#page-mod-assign-view .submissionlinks .btn-primary',
    identifier: 'click_grade_button',
    noTrainer:true,
    popupContent:[
        'The student whose work you are viewing appears on the top of the page.',
        'You can navigate through all of the students in your class using the dropdown menu in the top right corner of the screen.',
        'If the assignment was submitted as a PDF, it will display in the left pane. You can use the toolbar at the top of the page to annotate the submission.',
        'If the assignment was uploaded as a file, you can download it in the column on the right side.',
        'If the assignment has been set up as a graded assignment, you can set the score in the column on the right side.',
        'You can leave comments for the student to read in the box labeled "Feedback comments."',
        'You can upload files with comments for the student to download in the box labeled "Feedback files."',
        'When you are done leaving feedback for a student, click the "Save changes" button at the bottom of the screen.',
        'When you are done with all of your students, click the course title in the upper right corner to return to your course page.'
    ],
    popupVideo: 'https://www.youtube.com/watch?v=vGG-aokfFQ8',
});



[
    steps['course_page'],
].forEach(function(step){
    step.addPostrequisite(steps['click_activity_name']);
});




export const GiveFeedbackOnAssignmentAction: Action = new Action({
    name: 'Give Feedback on Assignment',
    steps:[
        steps['course_page'],
        steps['click_activity_name'],
        steps['click_grade_button']

    ],
    identifier: 'give_feedback_on_assignment',
    description: 'Create a place for students to submit an assignment through your course page. Assignment will not display in gradebook, but instructors can provide feedback.',
    video: 'https://www.youtube.com/watch?v=vGG-aokfFQ8',
});
