<template>
	<div class="chat_balloon_component" :style="computedBalloonColor">
		<Typography type="body1">
			<slot name="title" v-html="title" />
		</Typography>
	</div>
</template>

<script>
import Typography from '@/components/Typography';
import { colors } from '@/components/color';

export default {
	name: 'ChatBalloon',
	props: {
		title: String,
		bgColor: {
			type: String,
			default: 'white',
		},
		color: {
			type: String,
			default: '',
		},
	},
	computed: {
		computedBalloonColor() {
			return { background: this.bgColor, color: colors[this.color] };
		},
	},
	components: { Typography },
};
</script>

<style lang="scss" scoped>
.chat_balloon_component {
	background: $white;
	padding: 11px 16px;
	display: block;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.135216);
	border-radius: 8px;
}
</style>
