import {MoodleQueue} from "../sync/moodle-queue";

export const Moodle = {
    namespaced:true,
    state:{
        queue: null
    },
    mutations:{
        createQueue(state, ajax){
            state.queue = new MoodleQueue(ajax);
        }
    },
    actions:{
        createQueue(context, ajax) {
            context.commit('createQueue', ajax);
        }
    },
    getters:{
        queue(state){
            return state.queue;
        }
    }
};