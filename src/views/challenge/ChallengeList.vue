<template>
	<div id="ChallengeList">
		<header class="challengeList_header">
			<button type="button" class="btn btn_prev" @click="clickPrev"></button>
			<typography type="title" element="p" align="center" color="black">
				{{ targetYear }}.{{ targetMonth }}.{{ targetDate }}
				<span style="font-weight: normal">({{ targetDay }}.)</span>
			</typography>
			<button type="button" class="btn btn_next" @click="clickNext"></button>
		</header>
		<div class="challengeList_body">
			<vs-card v-for="list in challengeList" :key="list._id" type="3" class="mb-20" @click="goDetail(list._id)">
				<template #title>
					<h3>{{ list.title }}</h3>
				</template>
				<template #img>
					<img :src="list.avatar.avatarUrl" alt="" />
				</template>
				<template #text>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					</p>
				</template>
				<template #interactions>
					<vs-button danger icon>
						<Icon name="IconTrash" />
					</vs-button>
				</template>
			</vs-card>
			<router-link to="/challenge/create">
				<div class="plus_btn" :style="computedStyle">
					<vs-button circle icon floating>
						+
					</vs-button>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import routeMixin from '../../mixins/routeMixin';
import axios from 'axios';
import Icon from '@/components/Icon';
import Typography from '@/components/Typography';

export default {
	name: 'ChallengeList',
	mixins: [routeMixin],
	data: () => ({
		targetDate: null,
		targetYear: null,
		targetMonth: null,
		targetDay: null,
		targetDayNumber: null,
		challengeList: null,
	}),
	computed: {
		computedStyle() {
			return this.challengeList ? null : { top: 0 };
		},
	},
	created() {
		this.targetDate = new Date().getUTCDate() + 1;
		this.targetYear = new Date().getUTCFullYear();
		this.targetMonth = new Date().getUTCMonth() + 1;
		this.targetDay = new Date().getUTCDay();
		this.targetDayNumber = this.targetDay;
		this.getChallengeList();
	},
	mounted() {
		this.checkDay();
	},
	methods: {
		goDetail(id) {
			this.$_routeMixin_go_page(`/challenge/detail/${id}`);
		},
		checkDay() {
			switch (this.targetDayNumber) {
				case 0:
					this.targetDay = 'Sun';
					break;
				case 1:
					this.targetDay = 'Mon';
					break;
				case 2:
					this.targetDay = 'Thu';
					break;
				case 3:
					this.targetDay = 'Wen';
					break;
				case 4:
					this.targetDay = 'Thu';
					break;
				case 5:
					this.targetDay = 'Fir';
					break;
				case 6:
					this.targetDay = 'Sat';
					break;
			}
		},
		clickPrev() {
			this.targetDayNumber = this.targetDayNumber - 1;
			this.targetDate = this.targetDate - 1;
			if (this.targetDayNumber < 0) {
				this.targetDayNumber = 6;
			}
			this.checkDay();
		},
		clickNext() {
			this.targetDayNumber = this.targetDayNumber + 1;
			this.targetDate = this.targetDate + 1;
			if (this.targetDayNumber > 6) {
				this.targetDayNumber = 0;
			}
			this.checkDay();
		},
		getChallengeList() {
			axios
				.get('challengeList')
				.then(res => {
					console.log(res);
					this.challengeList = res.data;
				})
				.catch(err => console.log(err));
		},
	},
	components: { Icon, Typography },
};
</script>

<style scoped lang="scss">
#ChallengeList {
	padding: 0 20px;
	.challengeList_header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		height: 62px;
		background: $white;
		p {
			line-height: 62px;
		}
	}
	.btn {
		border: 0;
		border-top: 2px solid black !important;
		border-right: 2px solid black !important;
		background: transparent;
		color: transparent;
		padding: 0;
		width: 10px;
		height: 10px;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		&_prev {
			transform: rotate(-135deg);
			left: 32px;
		}
		&_next {
			transform: rotate(45deg);
			right: 32px;
		}
	}
	.plus_btn {
		position: absolute;
		bottom: 5px;
		right: 16px;
		.vs-button {
			border-radius: 56px;
			width: 56px;
			height: 56px;
			line-height: 56px;
			font-size: 28px;
		}
	}
}
</style>
