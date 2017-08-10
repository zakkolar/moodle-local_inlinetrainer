import Vue from 'vue'
import Trainer from './components/Trainer.vue'
import BootstrapVue from 'bootstrap-vue';

import store from './store/store';

Vue.use(BootstrapVue);



new Vue({
    el: '#zk_inlinetrainer',
    store,
    render: h => h(Trainer),
})