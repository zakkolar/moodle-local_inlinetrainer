import {Action} from "../Action";
import {SyncQueue} from "../sync/sync-queue";
import {GetAction} from "../helpers/get-action";
import {TrainerServerQueue} from "../sync/trainer-server-queue";
export const Favorites = {
    namespaced:true,
    state:{
        actions: [] as Action[]
    },
    mutations:{
        add(state, action:Action){
            state.actions.push(action);
        },
        remove(state, action:Action){
            state.actions.splice(state.actions.indexOf(action),1);
        }
    },
    actions:{
        add(context, action:Action) {
            context.commit('add', action);
            TrainerServerQueue.addJob('local_inlinetrainer_add_favorite',{
                action:action.identifier
            });
        },
        remove(context, action:Action){
            context.commit('remove',action);
            TrainerServerQueue.addJob('local_inlinetrainer_remove_favorite',{
                action:action.identifier
            });
        },
        sync(context){
            TrainerServerQueue.addJob('local_inlinetrainer_get_favorites',{},function(favorites){
                for(let favorite of favorites){
                    context.commit('add',GetAction(favorite));
                }
            });
        }
    },
    getters:{
        actions(state){
            return state.actions.slice().reverse();
        }
    }
};