import {Action} from "../action";
import {Step} from "../step/step";
import {LocalStorage} from "../helpers/local-storage";
import {LogActivity} from "./log-activity";
import {STEP_COMPLETE, STEP_UNCOMPLETE} from "./activity-type";

const locks = require('locks');

class ActionActivity{
    actions:{};

    stepCompletion:{};

    locks:{};

    constructor(){
        this.actions = {};
        this.stepCompletion = LocalStorage.get('action.activity.stepCompletion') || {};
        this.locks = {};
    }

    watchAction(action:Action, tab){
        if(!this.actionWatched(action)){
            this.actions[action.identifier] = {
                tabs:[tab],
                watcherSet:false,
                subscriptions: {},
                mutex: locks.createMutex()
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
            if(!this.locks.hasOwnProperty(this.getStepKey(action, step))){
                this.locks[this.getStepKey(action, step)] = locks.createMutex();
            }
            const mutex = this.locks[this.getStepKey(action, step)];
            mutex.lock(async () => {
                const storedCompletion = this.stepCompletion[this.getStepKey(action, step)];
                let complete = await step.isComplete();
                if((storedCompletion && !complete) || (!storedCompletion && complete)){
                    LogActivity(complete? STEP_COMPLETE:STEP_UNCOMPLETE, {
                        action:action.identifier,
                        step:step.identifier
                    });
                    this.stepCompletion[this.getStepKey(action, step)] = complete;
                    this.storeStepCompletion();
                }
                mutex.unlock();
            });

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

    getStepKey(action: Action, step:Step){
        return action.identifier + "." + step.identifier;
    }
}

export const ActionActivityWatcher = new ActionActivity();