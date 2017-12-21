import {FillTextInputStep} from "../../step/fill-text-input-step";
import {OpenPageSectionStep} from "../../step/open-page-section-step";
import {StepFactory} from "../step-factory";

export const OpenAssignmentFeedbackTypesFactory = StepFactory(OpenPageSectionStep, {
    text:'Open the "Feedback types" settings section',
    sectionId: '#page-mod-assign-mod #id_feedbacktypes',
    identifier: 'open_feedback_types',
});