import {CheckElementForMark} from "./mark-element";

export const CheckEventHappened = function(target, events){
  const $ = require('jquery');
  const eventArray = events.split(" ");
  for(let event of eventArray){
    if(CheckElementForMark(target, event, 'true')){
      return true;
    }
  }
  return false;
};