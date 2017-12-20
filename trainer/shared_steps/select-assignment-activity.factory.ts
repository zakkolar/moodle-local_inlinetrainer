import {StepFactory} from "./step-factory";
import {SelectActivityTypeStep} from "../step/select-activity-type-step";
import {Step} from "../step/step";

export const SelectAssignmentActivityFactory = function(click_add_activity_step: Step) {
    let factory = StepFactory(SelectActivityTypeStep, {
        text: 'Select "assignment" as the type of activity',
        activityType:'item_assign',
        identifier: 'select_assignment',
        prerequisites: [click_add_activity_step]
    });
    return factory();
};
