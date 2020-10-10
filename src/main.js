import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './utils';
import './plugins';
import './assets/styles/base/index.scss';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
