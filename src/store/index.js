import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tutorialPassed: false,
		headerTitle: '',
	},
	getters: {
		getTutorialPassed: state => {
			return state.tutorialPassed;
		},
		getHeaderTitle: state => {
			return state.headerTitle;
		},
	},
	mutations: {
		setTutorialPassed: (state, payload) => {
			return (state.tutorialPassed = payload);
		},
		setHeaderTitle: (state, payload) => {
			return (state.headerTitle = payload);
		},
	},
	actions: {},
	modules: {},
});
