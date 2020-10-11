<template>
	<div id="ChallengeDetail">
		<vs-col vs-type="flex" vs-align="center" w="11" style="overflow: auto; margin: 0 auto; padding-bottom: 60px;">
			<vs-row>
				<template v-for="(msg, index) in messageList">
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
								@click="createMessage(trigger, index)"
							>
								<vs-button
									primary
									block
									size="xl"
									style="margin: 0"
									:border="index !== 1"
									:loading="triggeredIndex === index"
								>
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
		triggeredIndex: -1,
		chatStep: 0,
		botAnswerList: [],
		shareBtn: false,
		challengeId: null,
	}),
	mounted() {
		this.getChallengeDetail(true);
		this.getTriggerList();
		this.readMessage(this.$route.params.id);
		this.challengeId = this.$route.params.id;
	},
	methods: {
		readMessage(_id) {
			const data = {
				challengeId: _id,
			};
			axios
				.post('/challenge/read', data)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		},
		async createMessage(trigger, index) {
			// 로딩 대신
			this.triggeredIndex = index;
			const data = {
				challengeId: this.$route.params.id,
				trigger: trigger,
			};
			await axios
				.post('/message', data)
				.then(() => {
					this.getChallengeDetail();
				})
				.catch(err => console.log(err));
			this.triggeredIndex = -1;
		},
		getChallengeDetail(flag) {
			axios
				.get(`challenge/${this.$route.params.id}`)
				.then(({ data }) => {
					// 그냥 로딩일 때
					if (flag) {
						this.messageList = data.messageList;
					} else {
						const lastMessage = data.messageList.slice(-1)[0];
						const restMessage = data.messageList.slice(0, data.messageList.length - 1);
						console.log(lastMessage);
						console.log(restMessage);
						this.messageList = restMessage;
						setTimeout(() => {
							this.messageList.push(lastMessage);
						}, 1000);
					}
				})
				.catch(err => console.log(err));
		},
		getTriggerList() {
			axios
				.get(`triggerList/${this.$route.params.id}`)
				.then(res => {
					this.triggerList = res.data;
				})
				.catch(err => console.log(err));
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
