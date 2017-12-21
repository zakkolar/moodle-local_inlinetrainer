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
import {SetAssignmentFeedbackTypesFactory} from "../../../shared_steps/create-assignments/set-assignment-feedback-types.factory";
import {SetAssignmentGradeCategoryFactory} from "../../../shared_steps/create-assignments/set-assignment-grade-category.factory";
import {AssignmentSaveAndReturnFactory} from "../../../shared_steps/create-assignments/assignment-save-and-return.factory";



const steps = {};
steps['course_page'] = CoursePageFactory();

steps['editing_on']= EditingOnFactory();

steps['click_add_activity'] = AddActivityFactory();

steps['select_assignment'] = SelectAssignmentActivityFactory(steps['click_add_activity']);

steps['add_button'] = AddAssignmentPageFactory();

steps['assignment_name'] = SetAssignmentNameFactory();

steps['assignment_description'] = SetAssignmentDescriptionFactory();

steps['allow_submissions_from'] = SetAssignmentAllowSubmissionsFromFactory();

steps['due_date'] = SetAssignmentDueDateFactory();

steps['open_feedback_types'] = OpenAssignmentFeedbackTypesFactory();

steps['set_feedback_types'] = SetAssignmentFeedbackTypesFactory(steps['open_feedback_types']);

steps['open_grade_section'] = OpenAssignmentGradeSectionFactory();



steps['set_grade_type'] = new SetSelectStep({
    identifier: 'set_grade_type',
    text:'Set the type to "None"',
    selectId:'#page-mod-assign-mod #id_grade_modgrade_type',
    selectValue:'none',
    prerequisites:[steps['open_grade_section']]
});


steps['save_and_return'] = AssignmentSaveAndReturnFactory();


[
    steps['course_page'],
    steps['editing_on'],
    steps['click_add_activity'],
    steps['select_assignment'],
].forEach(function(step){
    step.addPostrequisite(steps['add_button']);
});

[
    steps['assignment_description'],
    steps['allow_submissions_from'],
    steps['due_date'],
    steps['open_feedback_types'],
    steps['set_feedback_types'],
    steps['open_grade_section'],
    steps['set_grade_type'],
].forEach(function(step){
   step.addPostrequisite(steps['save_and_return']);
});


export const CreateUngradedAssignmentAction: Action = new Action({
    name: 'Create ungraded assignment',
    steps:[
        steps['course_page'],
        steps['editing_on'],
        steps['click_add_activity'],
        steps['select_assignment'],
        steps['add_button'],
        steps['assignment_name'],
        steps['assignment_description'],
        steps['allow_submissions_from'],
        steps['due_date'],
        steps['open_feedback_types'],
        steps['set_feedback_types'],
        steps['open_grade_section'],
        steps['set_grade_type'],
        steps['save_and_return']
    ],
    identifier: 'create_ungraded_assignment',
    description: 'Create a place for students to submit an assignment through your course page. Assignment will not display in gradebook, but instructors can provide feedback.'
});
