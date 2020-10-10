<template>
	<div id="ChallengeCreate">
		<div class="center grid">
			<vs-row>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<div class="center content-inputs mt-20 mb-20">
						<vs-input v-model="challengeTitle" label="Text" placeholder="Trying new recipes." />
					</div>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<div class="clearfix  mb-20" style="padding-left: 10px">
						<typography element="p" class="float-left" type="caption1" color="black"> All day</typography>

						<div style="width: 50px" class="float-right">
							<vs-switch v-model="allDay" />
						</div>
					</div>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<div class="center content-inputs mb-40">
						<vs-input v-model="startDate" class="mb-12" type="date" label="Start at" />
						<vs-input v-model="startTime" type="time" label="Start at" />
					</div>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<div class="center content-inputs">
						<vs-input v-model="endDate" class="mb-12" type="date" label="End at" />
						<vs-input v-model="endTime" type="time" label="End at" />
					</div>
				</vs-col>
				<vs-col v-if="disabled" vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<typography type="body2" color="#CC2727" element="p" align="center">
						내용을 입력해 주세요
					</typography>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
					<BottomButton @click="handleButtonClick">
						<vs-button block size="xl"> next</vs-button>
					</BottomButton>
				</vs-col>
			</vs-row>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Typography from '../../components/Typography';
import BottomButton from '../../components/BottomButton';

dayjs.extend(utc);
export default {
	name: 'ChallengeCreate',
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
		...mapGetters(['getTutorialPassed']),
	},
	methods: {
		handleButtonClick() {
			return this.getTutorialPassed ? this.createChallenge() : this.next();
		},
		next() {
			if (this.challengeTitle && this.startAt && this.startDate && this.endAt && this.endDate) {
				this.disabled = false;
			} else {
				this.disabled = true;
			}
		},
		createChallenge() {
			const data = {
				// dev용
				avatarUrl: 'https://render-image.zepeto.io/images/?key=39mqExscZJUSY63z95',
				title: this.challengeTitle,
				startAt: dayjs(this.startDate + this.startAt)
					.utc()
					.format(),
				endAt: dayjs(this.endDate + this.endAt)
					.utc()
					.format(),
			};
			axios
				.post('/challenge', data)
				.then(res => console.log(res))
				.catch(err => console.log(err));
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
