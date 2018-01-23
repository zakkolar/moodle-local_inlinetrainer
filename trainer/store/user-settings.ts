import {TrainerServerQueue} from "../sync/trainer-server-queue";
import {LogActivity} from "../activity/log-activity";
import {LocalStorage} from "../helpers/local-storage";

export const UserSettings = {
    namespaced:true,
    state:{
        ask: false,
        researchConsent: false,
        open: true
    },
    mutations:{
        setResearchConsent(state, consent) {
            state.researchConsent = consent;
        },
        setAsk(state, ask){
            state.ask = ask;
        },
        setOpen(state, open){
            state.open = open;
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
        },
        setOpen(context, open){
            context.commit('setOpen', open);
            // TrainerServerQueue.addJob('local_inlinetrainer_set_open',{
            //     open:open
            // });
            LocalStorage.set('trainer.user-settings.open', open);
        },
        initSettings(context,settings){
            // context.dispatch('setOpen',settings.open);
            context.dispatch('setOpen', LocalStorage.get('trainer.user-settings.open'));
            context.dispatch('setResearchConsent',settings.consent);
        }
    },
    getters:{
        researchConsent(state){
            return state.researchConsent;
        },
        ask(state){
            return state.ask;
        },
        open(state){
            return state.open;
        }
    }
};
