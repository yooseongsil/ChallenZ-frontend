import Vue from 'vue';
import Vuesax from 'vuesax';

import 'vuesax/dist/vuesax.css'; //Vuesax styles
Vue.use(Vuesax, {
	colors: {
		primary: '#7E72F2',
		success: 'rgb(23, 201, 100)',
		danger: 'rgb(242, 19, 93)',
		warning: 'rgb(255, 130, 0)',
		dark: 'rgb(36, 33, 69)',
	},
});
