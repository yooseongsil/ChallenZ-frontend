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
			<vs-card
				v-for="list in challengeList"
				:key="list._id"
				type="3"
				class="card_container mb-20"
				:class="avatarRandomBgColor(list.avatar.name)"
				@click="goDetail(list._id, list.title)"
			>
				<template #title>
					<h3>{{ list.title }}</h3>
				</template>
				<template #img>
					<img :src="list.avatar.avatarUrl" alt="" />
				</template>
				<template #text>
					<div class="challengeList_body_text">
						<p style="color: #999; margin-bottom: 8px;">
							<strong style="display: block">Starts at</strong>
							{{ list.startAt | parseDate }}
						</p>
						<p style="color: #999">
							<strong style="display: block">Ends at</strong>
							{{ list.endAt | parseDate }}
						</p>
					</div>
				</template>
				<template v-if="list.unread" #buttons>
					<Icon name="IconNew"></Icon>
				</template>
				<template #interactions>
					<div class="IconTrash">
						<Icon name="IconTrash" />
					</div>
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
import dayjs from 'dayjs';
import Icon from '@/components/Icon';
import Typography from '@/components/Typography';
import { mapMutations } from 'vuex';

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
		this.targetDate = new Date().getUTCDate();
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
		...mapMutations(['setHeaderTitle']),
		avatarRandomBgColor(name) {
			const index = name.length % 5;
			return `bg-${index}`;
		},
		goDetail(id, title) {
			this.$_routeMixin_go_page(`/challenge/detail/${id}`);
			this.setHeaderTitle(title);
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
					this.targetDay = 'Tue';
					break;
				case 3:
					this.targetDay = 'Wed';
					break;
				case 4:
					this.targetDay = 'Thu';
					break;
				case 5:
					this.targetDay = 'Fri';
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
			this.getChallengeList();
		},
		clickNext() {
			this.targetDayNumber = this.targetDayNumber + 1;
			this.targetDate = this.targetDate + 1;
			if (this.targetDayNumber > 6) {
				this.targetDayNumber = 0;
			}
			this.checkDay();
			this.getChallengeList();
		},
		getChallengeList() {
			const targetDate = dayjs(`${this.targetYear}-${this.targetMonth}-${this.targetDate}`).format();
			axios
				.get(`challengeList/${targetDate}`)
				.then(res => {
					const legacyAvatarList = ['강북멋쟁이', 'V'];
					this.challengeList = [...res.data].filter(data => !legacyAvatarList.includes(data.avatar.name));
				})
				.catch(err => console.log(err));
		},
	},
	filters: {
		parseDate(value) {
			return dayjs(value).format('YY.MM.DD A h:mm ');
		},
	},
	components: { Icon, Typography },
};
</script>

<style scoped lang="scss">
/deep/ .vs-card__buttons {
	position: absolute;
	right: -5px;
	top: -5px;
}
/deep/ .vs-card {
	margin: 0 auto !important;
}

.card_container {
	/deep/ .vs-card {
		height: 200px;
		&__img {
			img {
				transform: translateY(60px);
				width: 200%;
				min-width: auto !important;
			}
		}
	}

	&.bg {
		&-0 {
			/deep/ .vs-card__img {
				background: #facaca;
			}
		}
		&-1 {
			/deep/ .vs-card__img {
				background: #facae9;
			}
		}
		&-2 {
			/deep/ .vs-card__img {
				background: #f0cafa;
			}
		}
		&-3 {
			/deep/ .vs-card__img {
				background: #dccafa;
			}
		}
		&-4 {
			/deep/ .vs-card__img {
				background: #ffdec6;
			}
		}
	}
}

/deep/ .vs-card__img {
	width: 55%;
}
/deep/ .vs-card__text {
	padding-top: 25px !important;
	position: relative;
	width: 45%;
}
#ChallengeList {
	padding: 0 20px;
	height: 100%;

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
	.challengeList_body {
		&_text {
			position: absolute;
			bottom: 20px;
			font-size: 11px;
			line-height: 13px;
		}
	}
	.btn {
		border: 0;
		border-top: 2px solid #606060 !important;
		border-right: 2px solid #606060 !important;
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
		position: fixed;
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
	.IconTrash {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
		background: #fff;
		padding: 8px 10px;
	}
	///deep/ .vs-card__img {
	//	background: #f2f2f2;
	//}
}
</style>
