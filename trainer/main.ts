import Vue from 'vue'
import Trainer from './components/Trainer.vue'
import BootstrapVue from 'bootstrap-vue';

import store from './store/store';
import {TrainerServerQueue} from "./sync/trainer-server-queue";
import {RESEARCH_DATA_COLLECTION} from "./settings";


export const init = function(ajax, userPrefs){



        Vue.use(BootstrapVue);
        new Vue({
            el: '#zk_inlinetrainer',
            store,
            render: h => h(Trainer),
            beforeCreate(){
                if(RESEARCH_DATA_COLLECTION){
                    if(userPrefs===null){
                        this.$store.dispatch('userSettings/enableAsk');
                    }
                    else{
                        this.$store.dispatch('userSettings/initSettings',{
                            open: userPrefs.open,
                            consent: userPrefs.researchConsent
                        });
                    }
                }
                this.$store.dispatch('trainerSettings/load');
                TrainerServerQueue.setAjax(ajax);
                this.$store.dispatch('favorites/sync');
                this.$store.dispatch('recents/sync');
            }
        })
}

