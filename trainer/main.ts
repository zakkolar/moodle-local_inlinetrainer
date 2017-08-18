import Vue from 'vue'
import Trainer from './components/Trainer.vue'
import BootstrapVue from 'bootstrap-vue';

import store from './store/store';
import {TrainerServerQueue} from "./sync/trainer-server-queue";

export const init = function(ajax){
        Vue.use(BootstrapVue);
        new Vue({
            el: '#zk_inlinetrainer',
            store,
            render: h => h(Trainer),
            beforeCreate(){
                TrainerServerQueue.setAjax(ajax);
                this.$store.dispatch('favorites/sync');
                this.$store.dispatch('recents/sync');
            }
        })
}

