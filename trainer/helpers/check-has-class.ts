import {ItemExists} from './item-exists';
export const CheckHasClass = function(target: string, className: string, invert = false) {
  const $ = require('jquery');
  return ItemExists(target) && (invert ? !$(target).hasClass(className) : $(target).hasClass(className));
};
