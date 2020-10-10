<template>
	<div id="ChallengeDetail">
		<vs-col vs-type="flex" vs-align="center" w="11">
			<vs-row>
				<template v-for="(list, index) in messageList">
					<template v-if="list.avatarUrl !== null">
						<vs-col :key="`col-${index}`" class="flex flex-row">
							<vs-avatar size="40" circle style="min-width: 40px" class="mr-12">
								<img src="https://vuesax.com/avatars/avatar-4.png" alt="" />
							</vs-avatar>
						</vs-col>
					</template>
				</template>
			</vs-row>
		</vs-col>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'ChallengeDetail',
	data: () => ({
		messageList: null,
		chatStep: 0,
	}),
	mounted() {
		this.getChallengeDetail();
		this.getTriggerList();
	},
	methods: {
		getChallengeDetail() {
			const id = '5f81f6fb31c0f39d9f836c37';
			axios
				.get(`challenge/${id}`)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		},
		getTriggerList() {
			const id = '5f81f6fb31c0f39d9f836c37';
			axios
				.get(`triggerList/${id}`)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		},
	},
};
</script>

<style scoped></style>

<!--this.messageList = res.data.messageList; -->
