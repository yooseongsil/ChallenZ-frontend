<template>
	<div></div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'ChallengeList',
	mounted() {
		this.getChallengeList();
	},
	methods: {
		getChallengeList() {
			axios
				.get('challengeList')
				.then(res => console.log(res))
				.catch(err => console.log(err));
		},
	},
};
</script>

<style scoped></style>
