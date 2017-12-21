import {ShowHint} from "../../helpers/show-hint";
import {StepFactory} from "../step-factory";
import {CheckboxStep} from "../../step/checkbox-step";
import {Step} from "../../step/step";

export const SetAssignmentFeedbackTypesFactory = function(open_feedback_types_step:Step){
    let factory = StepFactory(CheckboxStep, {
        identifier: 'set_feedback_types',
        text:'Check the "Feedback comments" box to give students written feedback on their submissions',
        checkId:'#page-mod-assign-mod #id_assignfeedback_comments_enabled',
        prerequisites:[open_feedback_types_step]
    });

    return factory();
}

