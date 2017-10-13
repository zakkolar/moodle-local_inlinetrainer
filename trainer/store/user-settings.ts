import {TrainerServerQueue} from "../sync/trainer-server-queue";
import {LogActivity} from "../activity/log-activity";

export const UserSettings = {
    namespaced:true,
    state:{
        ask: false,
        researchConsent: false
    },
    mutations:{
        setResearchConsent(state, consent) {
            state.researchConsent = consent;
        },
        setAsk(state, ask){
            state.ask = ask;
        }
    },
    actions:{
        setResearchConsent(context, consent) {
            context.commit('setResearchConsent', consent);
            context.commit('setAsk', false);
            TrainerServerQueue.addJob('local_inlinetrainer_set_consent',{
                consent:consent
            });

        },
        enableAsk(context){
            context.commit('setAsk',true);
        }
    },
    getters:{
        researchConsent(state){
            return state.researchConsent;
        },
        ask(state){
            return state.ask;
        }
    }
};
