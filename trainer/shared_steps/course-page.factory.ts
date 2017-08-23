import {ShowHint} from "../helpers/show-hint";
import {RouteStep} from "../step/route-step";
import {StepFactory} from "./step-factory";

export const CoursePageFactory = StepFactory(RouteStep, {
    text: 'Navigate to course page',
    route: '/course/view.php',
    identifier: 'course_page',
    help: function () {
        ShowHint('.block_navigation');
    }
});