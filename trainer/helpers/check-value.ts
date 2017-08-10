import {ItemExists} from './item-exists';
export const CheckValue = function(target: string, value: string, invert = false) {
  const $ = require('jquery');
  return ItemExists(target) && (invert ? $(target).val() !== value : $(target).val() === value);
};
