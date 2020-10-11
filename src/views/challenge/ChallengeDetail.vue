<template>
	<div id="ChallengeDetail">
		<vs-col vs-type="flex" vs-align="center" w="11">
			<vs-row>
				<template v-for="(msg, index) in botAnswerList">
					<vs-col :key="`col-${index}`" class="flex flex-row">
						<template>
							<vs-row v-if="msg.avatarUrl === null" class="flex justify-content-flex-end">
								<ChatBalloon
									class="mb-12"
									bg-color="linear-gradient(90deg, #7E72F2 0%, rgba(126, 114, 242, 0.623088) 100%)"
									color="white"
								>
									<template v-slot:title>
										<span v-html="msg.contents" />
									</template>
								</ChatBalloon>
							</vs-row>
							<template v-else>
								<vs-avatar
									:key="`avatar-${index}`"
									size="40"
									circle
									style="min-width: 40px"
									class="mr-12"
								>
									<img :src="msg.avatarUrl" alt="" />
								</vs-avatar>
								<ChatBalloon class="mb-12" bg-color="white" color="deepDark">
									<template v-slot:title>
										<span v-html="msg.contents" />
									</template>
								</ChatBalloon>
							</template>
						</template>
					</vs-col>
				</template>
			</vs-row>
			<vs-row>
				<vs-col w="12">
					<BottomButton>
						<template v-for="(trigger, index) in triggerList">
							<div
								:key="`trigger-${index}`"
								class="flex flex-row justify-content-between mt-8"
								@click="chooseTrigger(trigger)"
							>
								<vs-button primary block size="xl" style="margin: 0" border>
									{{ trigger }}
								</vs-button>
							</div>
						</template>
					</BottomButton>
				</vs-col>
			</vs-row>
		</vs-col>
		<div v-if="shareBtn" class="shareBtn">
			<Icon name="IconSend" />
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import ChatBalloon from '@/components/ChatBalloon';
import BottomButton from '@/components/BottomButton';
import Icon from '@/components/Icon';

export default {
	name: 'ChallengeDetail',
	data: () => ({
		messageList: null,
		triggerList: null,
		chatStep: 0,
		botAnswerList: [],
		shareBtn: false,
	}),
	mounted() {
		this.getChallengeDetail();
		this.getTriggerList();
	},
	methods: {
		createMessage(trigger) {
			const data = {
				challengeId: this.$route.params.id,
				trigger: trigger,
			};
			axios
				.post('/message', data)
				.then(res => {
					console.log(res);
					this.getChallengeDetail();
				})
				.catch(err => console.log(err));
		},
		getChallengeDetail() {
			// const id = '5f81f6fb31c0f39d9f836c37';
			/*${this.$route.params.id}*/
			axios
				.get(`challenge/${this.$route.params.id}`)

				.then(res => {
					// console.log(res);
					this.messageList = res.data.messageList;
				})
				.catch(err => console.log(err));
		},
		getTriggerList() {
			// const id = '5f81f6fb31c0f39d9f836c37';
			axios
				.get(`triggerList/${this.$route.params.id}`)
				.then(res => {
					// console.log(res);
					this.triggerList = res.data;
				})
				.catch(err => console.log(err));
		},
		chooseTrigger(text) {
			this.shareBtn = true;
			switch (text) {
				case 'I am not in the mood':
					this.botAnswerList.push(this.messageList[0]);
					setTimeout(() => {
						this.botAnswerList.push(this.messageList[1]);
					}, 400);
					break;
				case "I'm done with this challenge!":
					this.botAnswerList.push(this.messageList[2]);
					setTimeout(() => {
						this.botAnswerList.push(this.messageList[3]);
					}, 300);
					break;
				case 'Need some encouragement':
					this.botAnswerList.push(this.messageList[4]);
					setTimeout(() => {
						this.botAnswerList.push(this.messageList[9]);
					}, 200);
					break;
			}
		},
	},
	components: {
		Icon,
		BottomButton,
		ChatBalloon,
	},
};
</script>

<style scoped lang="scss">
#ChallengeDetail {
	padding-bottom: 150px;
	position: relative;
	.shareBtn {
		position: absolute;
		bottom: 110px;
		right: 20px;
		width: 40px;
		height: 40px;
		border-radius: 4px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.227437);
		padding: 12px 10px;
	}
}
</style>

<!--this.messageList = res.data.messageList; -->
