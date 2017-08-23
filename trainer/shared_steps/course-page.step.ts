import {ShowHint} from "../helpers/show-hint";
import {RouteStep} from "../step/route-step";

export const CoursePageStep = new RouteStep({
    text: 'Navigate to course page',
    route: '/course/view.php',
    identifier: 'course_page',
    help: function(){
        ShowHint('.block_navigation');
    }
});