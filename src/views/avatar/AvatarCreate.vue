<template>
	<div></div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'AvatarCreate',
	created() {
		this.setHeaderTitle('Choose your Zavartar');
	},
	methods: {
		...mapMutations(['setHeaderTitle']),
	},
};
</script>

<style scoped></style>
