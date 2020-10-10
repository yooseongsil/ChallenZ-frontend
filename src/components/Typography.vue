<template>
	<component :is="element" :class="computedClass" :style="[computedStyle, computedAlign]">
		<slot />
	</component>
</template>

<script>
export default {
	name: 'Typography',
	props: {
		element: {
			type: String,
			default: 'div',
		}, // 적용 tag h1,h2,h3,p ...
		align: {
			type: String,
			default: null,
		},
		color: {
			type: String,
			default: null,
		},
		type: {
			type: String,
			default: null,
			validator(value) {
				// 값이 항상 아래 세 개의 값중 하나여야 합니다.
				return ['title', 'subTitle', 'body1', 'body2', 'caption1'].indexOf(value) !== -1;
			},
		},
	},
	computed: {
		computedClass() {
			return `${this.type}`;
		},
		computedAlign() {
			return {
				textAlign: this.align,
			};
		},
		computedStyle() {
			return {
				color: this.color,
			};
		},
	},
};
</script>

<style scoped lang="scss">
.title {
	font-size: 18px;
	line-height: 22px;
	font-weight: 600;
}
.subTitle {
	font-size: 16px;
	line-height: 20px;
	font-weight: 600;
}
.body1 {
	font-size: 15px;
	line-height: 150%;
	font-weight: 600;
}
.body2 {
	font-size: 13px;
	line-height: 16px;
	font-weight: normal;
}
.caption {
	font-size: 11px;
	line-height: 13px;
	font-weight: 500;
}
</style>
