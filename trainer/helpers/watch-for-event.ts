import {MarkElement, UnmarkElement} from "./mark-element";

function makeEventString(event, id) {
  return event + '.' + id;
}
export const WatchForEvent = function(eventString: string, target: string, id: string, callback: Function, markEvent?: boolean){
  const $ = require('jquery');
  const events = eventString.split(' ');

  for (const event of events) {
    setTimeout(function () {
      $(target).on(makeEventString(event, id), function (e) {
        MarkElement(target, event, 'true');
        // e.preventDefault();
        callback(e);
      });
    }, 100);
  }

};

export const UnwatchForEvent = function(eventString: string, target: string, id: string){
  const $ = require('jquery');
  const events = eventString.split(' ');
  for (const event of events){
    $(target).off(makeEventString(event, id));
    UnmarkElement(target, event);

  }
};
