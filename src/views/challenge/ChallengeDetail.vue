<template>
	<div id="ChallengeDetail">
		<vs-col vs-type="flex" vs-align="center" w="11">
			<vs-row>
				<template v-for="(list, index) in messageList">
					<template v-if="list.avatarUrl !== null">
						<vs-col :key="`col-${index}`" class="flex flex-row">
							<vs-avatar size="40" circle style="min-width: 40px" class="mr-12">
								<img :src="list.avatarUrl" alt="" />
							</vs-avatar>
							<vs-card>
								<template #text>
									<p>
										{{ list.contents }}
									</p>
								</template>
							</vs-card>
						</vs-col>
					</template>
					<template v-else>
						<vs-col :key="`col-${index}`" class="flex flex-row">
							<vs-avatar size="40" circle style="min-width: 40px" class="mr-12">
								<img src="https://vuesax.com/avatars/avatar-4.png" alt="" />
							</vs-avatar>
							<vs-card>
								<template #text>
									<p>
										{{ list.contents }}
									</p>
								</template>
							</vs-card>
						</vs-col>
					</template>
				</template>
			</vs-row>
			<template v-for="(trigger, index) in triggerList">
				<vs-button :key="`trigger-${index}`" flat @click="createMessage(trigger)">
					{{ trigger }}
				</vs-button>
			</template>
		</vs-col>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'ChallengeDetail',
	data: () => ({
		messageList: null,
		triggerList: null,
		chatStep: 0,
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
			axios
				.get(`challenge/${this.$route.params.id}`)
				.then(res => {
					console.log(res);
					this.messageList = res.data.messageList;
				})
				.catch(err => console.log(err));
		},
		getTriggerList() {
			axios
				.get(`triggerList/${this.$route.params.id}`)
				.then(res => {
					console.log(res);
					this.triggerList = res.data;
				})
				.catch(err => console.log(err));
		},
	},
};
</script>

<style scoped></style>

<!--this.messageList = res.data.messageList; -->
