import {Action} from '../action';
import {LocalStorage} from "./local-storage";
export const SyncAction = function (action: Action, expiration = 10){
  for(let step of action.steps){
    step.subscribe(function(){
      if (step.persistent || !step.complete) {
        LocalStorage.set(action.identifier, action.exportStepCompletion());
      }
    });
  }
}
export const RetrieveAction = function (action: Action){
  return LocalStorage.get(action.identifier) || {};
};