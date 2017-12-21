import {StepFactory} from "../step-factory";
import {OpenPageSectionStep} from "../../step/open-page-section-step";

export const OpenAssignmentGradeSectionFactory =  StepFactory(OpenPageSectionStep, {
    text:'Open the "Grade" settings section',
    sectionId: '#page-mod-assign-mod #id_modstandardgrade',
    identifier: 'open_grade_section',
    });
