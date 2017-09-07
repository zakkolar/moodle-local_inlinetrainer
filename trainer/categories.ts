import {Category} from './category';

import {UploadCourseSyllabusAction} from './actions/course-setup/sharing-course-information/upload-course-syllabus.action';
import {AddEntryToCalendarAction} from "./actions/course-setup/course-calendar/add-entry-to-calendar.action";
import {SetUpCalendarAction} from "./actions/course-setup/course-calendar/set-up-calendar.action";
import {Action} from "./action";
import {AddUsersAction} from "./actions/course-setup/manage-users/add-users.action";

let categories: Category[] = [
    new Category('Course Setup', 'The tasks you need to set up your course and manage its settings, calendar, and students/TAs.')
        .addSubcategories([
            new Category('Sharing Course Information').addActions([
                UploadCourseSyllabusAction
            ]),
            new Category('Course Calendar').addActions([
                SetUpCalendarAction,
                AddEntryToCalendarAction
            ]),
            new Category('Manage Users').addActions([
                AddUsersAction,
            ]),
            new Category('Old Courses'),
        ]),
    new Category('Uploading and Organizing Course Materials', "Upload and organize lectures, documents, media files, and other materials for your course.")
        .addSubcategories([
            new Category('Documents'),
            new Category('Organize course page'),
            new Category('External Links'),
            new Category('Multi Media')
        ]),
    new Category('Student Work and Assessment', 'Create, edit and grade assignments; manage gradebook.')
        .addSubcategories([
            new Category('Group assignments'),
            new Category('Individual assignments'),
            new Category('Assignment feedback'),
            new Category('Self assessment'),
            new Category('Gradebook'),
        ]),
    new Category('Communication and Discussion', 'Manage forums and message students.')
        .addSubcategories([
            new Category('Messaging'),
            new Category('Forums')
        ])
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