<template>
	<div id="BottomButton">
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
	border-radius: 8px 8px 0 0;
	border: 1px solid #dfe4ea;
}
</style>
