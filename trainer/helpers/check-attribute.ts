import {ItemExists} from './item-exists';
export const CheckAttribute = function(target: string, attribute: string, value:string, invert = false) {
  const $ = require('jquery');
  return ItemExists(target) && (invert ? $(target).attr(attribute).toString() !== value : $(target).attr(attribute).toString() === value);
};
