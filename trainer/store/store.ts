//https://medium.com/codingthesmartway-com-blog/vue-js-2-state-management-with-vuex-introduction-db26cb495113
import Vue from 'vue'
import Vuex from 'vuex'

import {Favorites} from "./favorites";
import {Recents} from "./recents";
import {TabSettings} from "./tab-settings";
import {Moodle} from "./moodle";

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        favorites:Favorites,
        recents:Recents,
        tabSettings: TabSettings,
        moodle: Moodle
    }
});