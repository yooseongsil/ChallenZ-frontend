<template>
	<keep-alive>
		<component :is="name" ref="icon" class="c-icon" :class="computedSpinnerColor" :style="computedStyle" />
	</keep-alive>
</template>

<script>
import IconMoreMenu from '@/assets/images/icon/more-menu.svg?inline';
import PlusImage from '@/assets/images/plus-image.svg?inline';
import IconNew from '@/assets/images/new-icon.svg?inline';
import IconRightArrow from '@/assets/images/icon/right-arrow.svg?inline';
import IconTrash from '@/assets/images/icon/icon-trash.svg?inline';
import IconSend from '@/assets/images/icon/icon-send.svg?inline';
import ZAvatar from '@/assets/images/z-avatar.svg?inline';
import Splash from '@/assets/images/splash.svg?inline';

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
		PlusImage,
		IconRightArrow,
		IconTrash,
		IconSend,
		IconNew,
		ZAvatar,
		Splash,
	},
};
</script>

<style lang="scss" scoped>
.c-icon {
	cursor: pointer;
}
</style>
