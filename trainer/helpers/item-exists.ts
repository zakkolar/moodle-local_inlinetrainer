export const ItemExists = function(target: string) {
  const $ = require('jquery');
  return $(target).length > 0;
};
