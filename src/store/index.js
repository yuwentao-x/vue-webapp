import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import test from './modules/test.js'
import good from './modules/good'
import tabbar from './modules/tabbar'

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        test,
        good,
        tabbar
    }
})