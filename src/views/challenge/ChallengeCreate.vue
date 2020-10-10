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
						<vs-input v-model="startAt" type="date" label="Start at" />
					</div>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<div class="center content-inputs mb-40">
						<vs-input v-model="endAt" type="date" label="End at" />
					</div>
				</vs-col>
				<vs-col v-if="disabled" vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<typography type="body2" color="#CC2727" element="p" align="center">
						내용을 입력해 주세요
					</typography>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
					<BottomButton>
						<vs-button block size="xl" @click="next"> next</vs-button>
					</BottomButton>
				</vs-col>
			</vs-row>
		</div>
	</div>
</template>

<script>
import Typography from '../../components/Typography';
import BottomButton from '../../components/BottomButton';
export default {
	name: 'ChallengeCreate',
	data: () => ({
		challengeTitle: null,
		allDay: false,
		startAt: null,
		endAt: null,
		disabled: false,
	}),
	methods: {
		next() {
			if (this.challengeTitle && this.startAt && this.endAt) {
				this.disabled = false;
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
	padding: 0 24px;
	/deep/ .vs-input {
		width: 100% !important;
	}
	.vs-button {
		margin: 0 !important;
	}
}
</style>
