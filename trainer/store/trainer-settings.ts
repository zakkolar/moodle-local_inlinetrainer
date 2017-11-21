import {TrainerServerQueue} from "../sync/trainer-server-queue";

export const TrainerSettings = {
    namespaced:true,
    state:{
        helpText: null,
        consentMessage: null
    },
    mutations:{
        setHelpText(state, text) {
            state.helpText = text;
        },
        setConsentMessage(state, message){
            state.consentMessage = message;
        }
    },
    actions:{
        setHelpText(context, text) {
            context.commit('setHelpText', text);

        },
        setConsentMessage(context, message){
            context.commit('setConsentMessage',message);
        },
        load(context){
            TrainerServerQueue.addJob('local_inlinetrainer_get_trainer_settings',{},function(settings){
                context.commit('setConsentMessage',settings.consentMessage);
                context.commit('setHelpText',settings.helpText);

            });
        }
    },
    getters:{
        helpText(state){
            return state.helpText;
        },
        consentMessage(state){
            return state.consentMessage;
        }
    }
};
