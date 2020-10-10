import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ChallengeCreate from '@/views/challenge/ChallengeCreate';
import ChallengeList from '@/views/challenge/ChallengeList';
import ChallengeDetail from '@/views/challenge/ChallengeDetail';
import AvatarList from '@/views/avatar/AvatarList';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: '',
		},
	},
	{
		path: '/challenge/create/:id?',
		name: 'ChallengeCreate',
		component: ChallengeCreate,
		meta: {
			title: '',
			detailPage: true,
		},
	},
	{
		path: '/challenge/list',
		name: 'ChallengeList',
		component: ChallengeList,
		meta: {
			title: '',
			detailPage: true,
		},
	},
	{
		path: '/challenge/detail/:id',
		name: 'ChallengeDetail',
		component: ChallengeDetail,
		meta: {
			title: '',
			detailPage: true,
		},
	},
	{
		path: '/avatar/list',
		name: 'AvatarList',
		component: AvatarList,
		meta: {
			title: '',
			detailPage: true,
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
