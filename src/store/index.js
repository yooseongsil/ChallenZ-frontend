import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tutorialPassed: false,
		headerTitle: '',
		createChallengeInfo: null,
	},
	getters: {
		getTutorialPassed: state => {
			return state.tutorialPassed;
		},
		getHeaderTitle: state => {
			return state.headerTitle;
		},
		getCreateChallengeInfo: state => {
			return state.createChallengeInfo;
		},
	},
	mutations: {
		setTutorialPassed: (state, payload) => {
			return (state.tutorialPassed = payload);
		},
		setHeaderTitle: (state, payload) => {
			return (state.headerTitle = payload);
		},
		setCreateChallengeInfo: (state, payload) => {
			return (state.createChallengeInfo = payload);
		},
	},
	actions: {},
	modules: {},
});
