import {CheckValue} from "./check-value";

export const CheckEditingModeOn = function(){
    return CheckValue('#page-header form input[name="edit"]', 'off');
};