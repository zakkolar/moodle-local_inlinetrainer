import {ShowHint} from "../helpers/show-hint";
import {RouteStep} from "../step/route-step";
import {StepFactory} from "./step-factory";

export const CalendarBlockFactory = StepFactory(RouteStep, {
    text: 'Scroll to the "Calendar" block on the left side of the screen and click the name of the current month',
    help: function() {
        ShowHint('.block_calendar_month');
    },
    route: '/calendar/view.php',
    routeExtras: {'parameters':[['view','month']]},
    identifier: 'click_calendar'
});