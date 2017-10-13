import {TrainerServerQueue} from "../sync/trainer-server-queue";
import {Timestamp} from "../helpers/timestamp";
import {RESEARCH_DATA_COLLECTION} from "../settings";

import store from '../store/store';

export const LogActivity = function(type, data){
    if(store.getters['userSettings/researchConsent'] && RESEARCH_DATA_COLLECTION){
        data = Object.assign(data, {
            url: window.location.href
        });
        TrainerServerQueue.addJob('local_inlinetrainer_log_activity', {
            timestamp: Timestamp(),
            type: type,
            data: JSON.stringify(data)
        })
    }

};