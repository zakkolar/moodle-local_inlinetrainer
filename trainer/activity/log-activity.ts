import {TrainerServerQueue} from "../sync/trainer-server-queue";
import {Timestamp} from "../helpers/timestamp";

export const LogActivity = function(type, data){
    TrainerServerQueue.addJob('local_inlinetrainer_log_activity', {
        timestamp: Timestamp(),
        type: type,
        data: JSON.stringify(data)
    })
};