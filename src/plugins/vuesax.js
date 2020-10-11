import Vue from 'vue';
import Vuesax from 'vuesax';
import { colors } from '@/components/color';

import 'vuesax/dist/vuesax.css'; //Vuesax styles
Vue.use(Vuesax, {
	colors: {
		primary: colors['primary'],
		success: colors['success'],
		danger: colors['danger'],
		warning: colors['warning'],
		dark: colors['dark'],
	},
});
