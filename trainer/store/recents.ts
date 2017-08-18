import {Action} from "../Action";
import {SyncQueue} from "../sync/sync-queue";
import {GetAction} from "../helpers/get-action";
import {TrainerServerQueue} from "../sync/trainer-server-queue";
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
            let identifiers = [];
            for(let action of context.getters.actions){
                identifiers.push(action.identifier);
            }
            TrainerServerQueue.addJob('local_inlinetrainer_set_recent_actions',{
                actions:identifiers
            });
        },
        sync(context){
            TrainerServerQueue.addJob('local_inlinetrainer_get_recent_actions',{},function(recents){
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