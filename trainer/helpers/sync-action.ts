import {Action} from '../action';
import {LocalStorage} from "./local-storage";
export const SyncAction = function (action: Action){
  for(let step of action.steps){
    step.subscribe(async function(){
      if (step.persistent || await !step.isComplete()) {
        action.exportStepCompletion().then(function(state){
            LocalStorage.set('synced-actions.'+action.identifier, state);
        });

      }
    });
  }
}
export const RetrieveAction = function (action: Action){
  return LocalStorage.get('synced-actions.'+action.identifier) || {};
};