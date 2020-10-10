<template>
	<div id="BottomButton">
		<vs-button block size="xl" :disabled="disabled"> {{ text }}</vs-button>
	</div>
</template>

<script>
export default {
	name: 'BottomButton',
	props: {
		text: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: true,
		},
	},
};
</script>

<style scoped lang="scss">
#BottomButton {
	width: 100%;
	padding: 8px 12px;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #fff;
	.vs-button {
		margin: 0;
	}
}
</style>
