import {Category} from './category';

import {UploadCourseSyllabusAction} from './actions/course-setup/sharing-course-information/upload-course-syllabus.action';
import {AddEntryToCalendarAction} from "./actions/course-setup/course-calendar/add-entry-to-calendar.action";
import {SetUpCalendarAction} from "./actions/course-setup/course-calendar/set-up-calendar.action";
import {Action} from "./action";
import {AddUsersAction} from "./actions/course-setup/manage-users/add-users.action";
import {CreateGradedAssignmentAction} from "./actions/assignments-and-gradebook/assignments-and-grading/create-graded-assignment.action";
import {UploadVideoAction} from "./actions/upload-and-organize-course-materials/multi-media/upload-video.action";
import {CreateForumAction} from "./actions/communication-and-discussion/forums/create-forum.action";
import {CreateGradeCategoriesAction} from "./actions/assignments-and-gradebook/gradebook-setup/create-grade-categories.action";
import {AssignWeightsToCategoriesAction} from "./actions/assignments-and-gradebook/gradebook-setup/assign-weights-to-categories.action";
import {ViewClassGradeReportAction} from "./actions/assignments-and-gradebook/monitoring-student-progress/view-class-grade-report.action";
import {CreateUngradedAssignmentAction} from "./actions/assignments-and-gradebook/assignments-and-grading/create-ungraded-assignment.action";
import {CreateGradeItemAction} from "./actions/assignments-and-gradebook/assignments-and-grading/create-grade-item.action";
import {GiveFeedbackOnAssignmentAction} from "./actions/assignments-and-gradebook/assignments-and-grading/give-feedback-on-assignment.action";
import {ViewStudentGradeReportAction} from "./actions/assignments-and-gradebook/monitoring-student-progress/view-student-grade-report.action";
import {ScoreGradeItemAction} from "./actions/assignments-and-gradebook/assignments-and-grading/score-grade-item.action";
import {EditCalendarEntry} from "./actions/course-setup/course-calendar/edit-calendar-entry.action";

let categories: Category[] = [
    new Category('Course Setup', 'The tasks you need to set up your course and manage its settings, calendar, and students/TAs.')
        .addSubcategories([
            // new Category('Sharing Course Information').addActions([
            //     UploadCourseSyllabusAction
            // ]),
            new Category('Course Calendar').addActions([
                SetUpCalendarAction,
                AddEntryToCalendarAction,
                EditCalendarEntry
            ]),
            new Category('Manage Users').addActions([
                AddUsersAction,
            ]),
            // new Category('Old Courses'),
        ]),
    // new Category('Uploading and Organizing Course Materials', "Upload and organize lectures, documents, media files, and other materials for your course.")
    //     .addSubcategories([
    //         new Category('Documents'),
    //         new Category('Organize course page'),
    //         new Category('External Links'),
    //         new Category('Multi Media').addActions([
    //           UploadVideoAction
    //         ])
    //     ]),
    new Category('Assignments and Gradebook', 'Create, edit and grade assignments; manage gradebook.')
        .addSubcategories([
            new Category('Gradebook setup').addActions([
                CreateGradeCategoriesAction,
                AssignWeightsToCategoriesAction
            ]),
            new Category('Assignments and grading').addActions([
                CreateGradedAssignmentAction,
                CreateUngradedAssignmentAction,
                CreateGradeItemAction,
                ScoreGradeItemAction,
                GiveFeedbackOnAssignmentAction,
            ]),
            new Category('Monitoring student progress').addActions([
                ViewClassGradeReportAction,
                ViewStudentGradeReportAction,
            ])
        ]),
    // new Category('Communication and Discussion', 'Manage forums and message students.')
    //     .addSubcategories([
    //         new Category('Messaging'),
    //         new Category('Forums').addActions([
    //             CreateForumAction
    //         ])
    //     ])
];

export const CATEGORIES: Category[] = categories;

let actions = {};

for(let category of categories){
    for(let subcategory of category.subCategories){
        for(let action of subcategory.actions){
            actions[action.identifier] = action;
        }
    }
}

export const ACTIONS = actions;