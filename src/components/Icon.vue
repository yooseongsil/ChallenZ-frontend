<template>
	<keep-alive>
		<component :is="name" ref="icon" class="c-icon" :class="computedSpinnerColor" :style="computedStyle" />
	</keep-alive>
</template>

<script>
import IconMoreMenu from '@/assets/images/icon/more-menu.svg?inline';

import { colors } from '@/components/color';

export default {
	name: 'Icon',
	props: {
		name: {
			type: String,
			default: '',
		},
		color: {
			type: String,
			default: '',
		},
		loading: {
			type: Boolean,
			default: false,
		},
		spinnerColor: {
			type: String,
			default: 'gray',
			validator(value) {
				return ['gray', 'primary', 'success'].indexOf(value) !== -1;
			},
		},
		reversed: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		computedStyle() {
			return { fill: colors[this.color] };
		},
		computedSpinnerColor() {
			return this.spinnerColor;
		},
	},
	mounted() {
		const colorMap = {
			gray: {
				stroke: '#E8EAED',
				fill: '#979CA2',
			},
			primary: {
				stroke: '#DEFAEB',
				fill: '#00C854',
			},
			primaryReversed: {
				stroke: '#00B334',
				fill: 'white',
			},
			success: {
				stroke: '#D6EBFF',
				fill: '#1E90FF',
			},
			successReversed: {
				stroke: '#0074CC',
				fill: 'white',
			},
		};
		if (this.loading) {
			const colorMapKey =
				this.reversed && this.spinnerColor !== 'gray' ? `${this.spinnerColor}Reversed` : this.spinnerColor;
			this.$refs['icon']
				.getElementsByClassName('circle')[0]
				.setAttribute('stroke', colorMap[colorMapKey]['stroke']);
			this.$refs['icon'].getElementsByClassName('quarter')[0].setAttribute('fill', colorMap[colorMapKey]['fill']);
		}
	},
	components: {
		IconMoreMenu,
	},
};
</script>

<style lang="scss" scoped>
.c-icon {
	cursor: pointer;
}
</style>
