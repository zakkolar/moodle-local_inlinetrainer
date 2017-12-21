import {ShowHint} from "../../helpers/show-hint";
import {StepFactory} from "../step-factory";
import {FillMoodleDateTimeStep} from "../../step/fill-moodle-date-time-step";

export const SetAssignmentDueDateFactory = StepFactory(FillMoodleDateTimeStep, {
    text: 'Set the due date for the assignment',
    targetBase:'#page-mod-assign-mod #id_duedate',
    help:function(){
        ShowHint('#page-mod-assign-mod .fdate_time_selector:eq(1)');
    },
    identifier: 'due_date',
    optional:true,
});