import {ItemExists} from './item-exists';
export const Checked = function(target: string) {
  const $ = require('jquery');
  return ItemExists(target) && $(target).is(':checked');
};
