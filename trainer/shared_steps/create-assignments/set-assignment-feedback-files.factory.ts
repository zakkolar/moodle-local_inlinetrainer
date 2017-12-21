import {ShowHint} from "../../helpers/show-hint";
import {StepFactory} from "../step-factory";
import {CheckboxStep} from "../../step/checkbox-step";
import {Step} from "../../step/step";

export const SetAssignmentFeedbackFilesactory = function(open_feedback_types_step:Step){
    let factory = StepFactory(CheckboxStep, {
        identifier: 'set_feedback_files',
        text:'Check the "Feedback files" box to upload files with feedback for students.',
        checkId:'#page-mod-assign-mod #id_assignfeedback_file_enabled',
        prerequisites:[open_feedback_types_step]
    });

    return factory();
}

