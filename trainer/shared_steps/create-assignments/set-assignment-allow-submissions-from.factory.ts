import {ShowHint} from "../../helpers/show-hint";
import {StepFactory} from "../step-factory";
import {FillMoodleDateTimeStep} from "../../step/fill-moodle-date-time-step";

export const SetAssignmentAllowSubmissionsFromFactory = StepFactory(FillMoodleDateTimeStep, {
    text: 'Set the date to start allowing submissions',
    targetBase:'#page-mod-assign-mod #id_allowsubmissionsfromdate',
    help:function(){
        ShowHint('#page-mod-assign-mod .fdate_time_selector:eq(0)');
    },
    identifier: 'allow_submissions_from',
    optional:true,
});