import Vue from 'vue'
import Trainer from './components/Trainer.vue'
import BootstrapVue from 'bootstrap-vue';

import store from './store/store';
import {TrainerServerQueue} from "./sync/trainer-server-queue";


export const init = function(ajax, user_prefs){



        Vue.use(BootstrapVue);
        new Vue({
            el: '#zk_inlinetrainer',
            store,
            render: h => h(Trainer),
            beforeCreate(){
                if(user_prefs===null){
                    this.$store.dispatch('userSettings/enableAsk');
                }
                else{
                    this.$store.dispatch('userSettings/setResearchConsent', user_prefs.researchConsent);
                }
                TrainerServerQueue.setAjax(ajax);
                this.$store.dispatch('favorites/sync');
                this.$store.dispatch('recents/sync');
            }
        })
}

