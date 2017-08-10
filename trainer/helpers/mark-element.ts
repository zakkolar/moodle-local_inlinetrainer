const prefix = 'zk-inline-trainer-';
export const MarkElement=function(element,attr,value){
  let $ = require('jquery');
  $(element).data(prefix+attr,value);
}
export const UnmarkElement=function(element,attr){
  let $ = require('jquery');
  $(element).removeData(prefix+attr);
}
export const CheckElementForMark=function(element,attr,value){
  let $ = require('jquery');
  return $(element).data(prefix+attr)===value;
}
