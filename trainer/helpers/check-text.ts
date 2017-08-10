import {ItemExists} from './item-exists';
export const CheckText = function(target: string, text: string, invert = false) {
  const $ = require('jquery');
  return ItemExists(target) && (invert ? $(target).text() !== text : $(target).text() === text);
};
