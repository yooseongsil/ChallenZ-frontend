<template>
	<div id="BottomButton" v-on="$listeners">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'BottomButton',
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
	border: 1px solid #dfe4ea;
	z-index: 2;
}
</style>
