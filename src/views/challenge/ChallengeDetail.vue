<template>
	<div></div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'ChallengeDetail',
	mounted() {
		this.getChallengeDetail();
	},
	methods: {
		getChallengeDetail() {
			const id = '5f81be5fca8c69000932cdfd';
			axios
				.get(`challenge/${id}`)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		},
	},
};
</script>

<style scoped></style>
