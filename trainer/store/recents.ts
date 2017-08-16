import {Action} from "../Action";
import {getQueue} from "./get-queue";
import {MoodleQueue} from "../sync/moodle-queue";
import {GetAction} from "../helpers/get-action";
const state = {
    favorites:[] as Action[],
    recents:[] as Action[]
};

export const Recents = {
    namespaced:true,
    state:{
        actions: [] as Action[]
    },
    mutations:{
        add(state, action:Action){
            const max = 10;
            const actionIndex = state.actions.indexOf(action);
            if(actionIndex>-1){
                state.actions.splice(actionIndex,1);
            }
            state.actions.unshift(action);
            if(state.actions.length>max){
                state.actions.splice(max);
            }
        }
    },
    actions:{
        add(context, action:Action) {
            context.commit('add', action);
            const queue:MoodleQueue = getQueue(context);
            let identifiers = [];
            for(let action of context.getters.actions){
                identifiers.push(action.identifier);
            }
            queue.addJob('local_inlinetrainer_set_recent_actions',{
                actions:identifiers
            });
        },
        sync(context){
            const queue:MoodleQueue = getQueue(context);
            queue.addJob('local_inlinetrainer_get_recent_actions',{},function(recents){
                for(let recent of recents.slice().reverse()){
                    context.commit('add',GetAction(recent));
                }
            });
        }
    },
    getters:{
        actions(state){
            return state.actions;
        }
    }
};