import {Action} from "../Action";
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
        }
    },
    getters:{
        actions(state){
            return state.actions;
        }
    }
};