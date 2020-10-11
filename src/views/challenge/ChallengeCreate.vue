<template>
	<div id="ChallengeCreate">
		<div class="center grid">
			<vs-row>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<div class="center content-inputs mt-20 mb-20">
						<vs-input v-model="challengeTitle" label="Challenge Name" placeholder="Trying new recipes." />
					</div>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12" class="mb-20">
					<div
						class="mb-20 flex align-items-center  justify-content-between justify-content-center"
						style="padding-left: 10px"
					>
						<typography element="p" class="float-left" type="caption" color="black"> All day</typography>

						<div style="width: 50px">
							<vs-switch v-model="allDay" />
						</div>
					</div>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12" class="mb-20">
					<div class="center content-inputs mb-40">
						<vs-input v-model="startDate" class="mb-12" type="date" label="Starts at" :max="endDate" />
						<vs-input v-model="startTime" type="time" />
					</div>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<div class="center content-inputs">
						<vs-input
							v-model="endDate"
							:disabled="allDay"
							class="mb-12"
							type="date"
							label="Ends at"
							:min="startDate"
						/>
						<vs-input v-model="endTime" :disabled="allDay" type="time" />
					</div>
				</vs-col>
				<vs-col v-if="disabled" vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<typography type="body2" color="#CC2727" element="p" align="center">
						내용을 입력해 주세요
					</typography>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
					<BottomButton @click="next">
						<vs-button block size="xl">Next</vs-button>
					</BottomButton>
				</vs-col>
			</vs-row>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import routeMixin from '../../mixins/routeMixin';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Typography from '../../components/Typography';
import BottomButton from '../../components/BottomButton';

dayjs.extend(utc);
export default {
	name: 'ChallengeCreate',
	mixins: [routeMixin],
	data: () => ({
		challengeTitle: null,
		allDay: false,
		startDate: null,
		startTime: null,
		endDate: null,
		endTime: null,
		disabled: false,
	}),
	computed: {
		...mapGetters(['getTutorialPassed', 'getCreateChallengeInfo']),
	},
	watch: {
		allDay(newVal) {
			if (newVal) {
				this.endTime = this.startTime;
				this.endDate = this.startDate;
			}
		},
		startTime() {
			if (this.allDay) {
				this.endTime = this.startTime;
			}
		},
		startDate() {
			if (this.allDay) {
				this.endDate = this.startDate;
			}
		},
	},
	created() {
		this.setHeaderTitle('Create a challenge');
		// tutorial challenge name
		const tutorialChallengeName = this.$route.query.challenge_name;
		if (tutorialChallengeName) {
			this.setTutorialChallengeName(tutorialChallengeName);
		}
	},
	methods: {
		...mapMutations(['setHeaderTitle', 'setCreateChallengeInfo']),
		setTutorialChallengeName(challengeName) {
			const challengeNameList = {
				Workout: 'Running in a marathon.',
				Study: 'Trying new recipes.',
			};
			this.challengeTitle = challengeNameList[challengeName];
		},
		next() {
			if (this.challengeTitle && this.startTime && this.startDate && this.endTime && this.endDate) {
				this.disabled = false;
				const [startHour, startMinute] = this.startTime.split(':');
				const [endHour, endMinute] = this.endTime.split(':');
				this.setCreateChallengeInfo({
					...this.getCreateChallengeInfo,
					title: this.challengeTitle,
					startAt: dayjs(this.startDate)
						.hour(startHour)
						.minute(startMinute)
						.utc(),
					endAt: dayjs(this.endDate)
						.hour(endHour)
						.minute(endMinute)
						.utc(),
				});
				this.$_routeMixin_go_page('/avatar/list');
			} else {
				this.disabled = true;
			}
		},
	},
	components: { BottomButton, Typography },
};
</script>

<style scoped lang="scss">
#ChallengeCreate {
	padding: 0 24px 50px 24px;
	/deep/ .vs-input {
		width: 100% !important;
	}
	.vs-button {
		margin: 0 !important;
	}
}
</style>
