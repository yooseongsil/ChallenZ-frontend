import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ChallengeCreate from '@/views/challenge/ChallengeCreate';
import ChallengeList from '@/views/challenge/ChallengeList';
import ChallengeDetail from '@/views/challenge/ChallengeDetail';
import AvatarCreate from '@/views/avatar/AvatarCreate';
import AvatarList from '@/views/avatar/AvatarList';
import AvatarDetail from '@/views/avatar/AvatarDetail';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/challenge/create/:id?',
		name: 'ChallengeCreate',
		component: ChallengeCreate,
	},
	{
		path: '/challenge/list',
		name: 'ChallengeList',
		component: ChallengeList,
	},
	{
		path: '/challenge/detail/:id',
		name: 'ChallengeDetail',
		component: ChallengeDetail,
	},
	{
		path: '/avatar/create/:id?',
		name: 'AvatarCreate',
		component: AvatarCreate,
	},
	{
		path: '/avatar/list',
		name: 'AvatarList',
		component: AvatarList,
	},
	{
		path: '/avatar/detail/:id',
		name: 'AvatarDetail',
		component: AvatarDetail,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
