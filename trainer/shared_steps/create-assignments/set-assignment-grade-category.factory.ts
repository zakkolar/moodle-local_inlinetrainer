import {StepFactory} from "../step-factory";
import {Step} from "../../step/step";
import {EventStep} from "../../step/event-step";
import {CheckEventHappened} from "../../helpers/check-event-happened";
import {ShowHint} from "../../helpers/show-hint";
import {ChangeSelectStep} from "../../step/change-select-step";

export const SetAssignmentGradeCategoryFactory = function(open_grade_section_step:Step){
    let factory = StepFactory(ChangeSelectStep, {
        optional: true,
        identifier: 'set_grade_category',
        text:'Set the "Grade Category" to place this assignment into a category in the gradebook.',
        prerequisites:[open_grade_section_step],
        selectId: '#page-mod-assign-mod #id_gradecat',

    });

    return factory();
}

