import {StepFactory} from "../step-factory";
import {Step} from "../../step/step";
import {EventStep} from "../../step/event-step";
import {CheckEventHappened} from "../../helpers/check-event-happened";
import {ShowHint} from "../../helpers/show-hint";

export const SetAssignmentGradeCategoryFactory = function(open_grade_section_steo:Step){
    let factory = StepFactory(EventStep, {
        optional: true,
        identifier: 'set_grade_category',
        text:'Set the "Grade Category" to place this assignment into a category in the gradebook.',
        help:function(){
            ShowHint('#id_gradecat');
        } ,
        checkComplete:function(resolve){
            resolve(CheckEventHappened('#page-mod-assign-mod #id_gradecat','change'));
        },
        completeEvent:'change',
        completeTarget: '#page-mod-assign-mod #id_gradecat',
        prerequisites:[open_grade_section_steo]
    });

    return factory();
}

