import {Action} from "../Action";

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
        },
        remove(context, action:Action){
            context.commit('remove',action);
        }
    },
    getters:{
        actions(state){
            return state.actions;
        }
    }
};