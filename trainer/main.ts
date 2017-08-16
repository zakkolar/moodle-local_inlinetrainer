import Vue from 'vue'
import Trainer from './components/Trainer.vue'
import BootstrapVue from 'bootstrap-vue';

import store from './store/store';

export const init = function(ajax){
        Vue.use(BootstrapVue);
        new Vue({
            el: '#zk_inlinetrainer',
            store,
            render: h => h(Trainer),
            beforeCreate(){
                this.$store.dispatch('moodle/createQueue',ajax);
                this.$store.dispatch('favorites/sync');
            }
        })
}

