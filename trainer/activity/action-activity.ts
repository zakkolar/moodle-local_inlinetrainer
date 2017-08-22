import {Action} from "../action";
import {Step} from "../step/step";
import {LocalStorage} from "../helpers/local-storage";
import {LogActivity} from "./log-activity";
import {STEP_COMPLETE, STEP_UNCOMPLETE} from "./activity-type";

class ActionActivity{
    actions:{};

    stepCompletion:{};

    constructor(){
        this.actions = {};
        this.stepCompletion = LocalStorage.get('action.activity.stepCompletion') || {};
    }

    watchAction(action:Action, tab){
        if(!this.actionWatched(action)){
            this.actions[action.identifier] = {
                tabs:[tab],
                watcherSet:false,
                subscriptions: {}
            }
        }
        else{
            if(this.getActionWatcher(action).tabs.indexOf(tab)==-1){
                this.getActionWatcher(action).tabs.push(tab);
            }
        }

        const actionWatcher = this.getActionWatcher(action);

        if(!actionWatcher.watcherSet){
            this.setWatchers(action);
            actionWatcher.watcherSet = true;
        }
    }

    setWatchers(action:Action){
        const actionWatcher = this.getActionWatcher(action);
        const actionActivity = this;
        for(const step of action.steps){

            actionWatcher.subscriptions[step.identifier] = step.subscribe(function(step){
                actionActivity.checkLogStepActivity(action, step);
            });

        }
    }
    unsetWatchers(action:Action){
        const actionWatcher = this.getActionWatcher(action);
        for(const step of action.steps){
             step.unsubscribe(actionWatcher.subscriptions[step.identifier]);
        }
    }

    checkLogStepActivity(action:Action, step:Step){
        if(this.actionWatched(action)){
            const storedCompletion = this.stepCompletion[step.identifier];
            if((storedCompletion && !step.complete) || (!storedCompletion && step.complete)){
                LogActivity(step.complete? STEP_COMPLETE:STEP_UNCOMPLETE, {
                   action:action.identifier,
                   step:step.identifier
                });
                this.stepCompletion[step.identifier] = step.complete;
                this.storeStepCompletion();
            }
        }

    }

    checkLogActionActivity(action:Action){
        for(const step of action.steps){
            this.checkLogStepActivity(action, step);
        }
    }

    unwatchAction(action:Action, tab){
        const actionWatcher = this.getActionWatcher(action);
        if(this.actionWatched(action)){
            const index = actionWatcher.tabs.indexOf(tab);
            if(index>-1){
                actionWatcher.tabs.splice(index,1);
            }

            if(!this.actionActive(action) && actionWatcher.watcherSet){
                this.unsetWatchers(action);
                actionWatcher.watcherSet = false;
            }
        }
    }

    actionWatched(action:Action){
        return this.actions.hasOwnProperty(action.identifier);
    }

    actionActive(action:Action){
        return this.actionWatched(action) && this.getActionWatcher(action).tabs.length > 0;
    }

    getActionWatcher(action:Action){
        return this.actions[action.identifier];
    }

    storeStepCompletion(){
        LocalStorage.set('action.activity.stepCompletion', this.stepCompletion);
    }
}

export const ActionActivityWatcher = new ActionActivity();