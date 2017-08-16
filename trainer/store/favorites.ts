import {Action} from "../Action";
import {MoodleQueue} from "../sync/moodle-queue";
import {GetAction} from "../helpers/get-action";
import {getQueue} from "./get-queue";
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
            const queue:MoodleQueue = getQueue(context);
            queue.addJob('local_inlinetrainer_add_favorite',{
                action:action.identifier
            });
        },
        remove(context, action:Action){
            context.commit('remove',action);
            const queue:MoodleQueue = getQueue(context);
            queue.addJob('local_inlinetrainer_remove_favorite',{
                action:action.identifier
            });
        },
        sync(context){
            const queue:MoodleQueue = getQueue(context);
            queue.addJob('local_inlinetrainer_get_favorites',{},function(favorites){
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