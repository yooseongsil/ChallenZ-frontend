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
				return (
					[
						'display1',
						'headline1',
						'headline2',
						'headline3',
						'headline4',
						'headline5',
						'headline6',
						'body1',
						'body2',
						'caption1',
						'caption2',
					].indexOf(value) !== -1
				);
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
.display1 {
	font-size: 42px;
	line-height: 120%;
	font-weight: bold;
}
.headline1 {
	font-size: 32px;
	line-height: 130%;
	font-weight: bold;
}
.headline2 {
	font-size: 28px;
	line-height: 130%;
	font-weight: bold;
}
.headline3 {
	font-size: 26px;
	line-height: 130%;
	font-weight: bold;
}
.headline4 {
	font-size: 24px;
	line-height: 125%;
	font-weight: bold;
}
.headline5 {
	font-size: 22px;
	line-height: 135%;
	font-weight: normal;
}
.headline6 {
	font-size: 18px;
	line-height: 135%;
	font-weight: bold;
}
.body1 {
	font-size: 16px;
	line-height: 160%;
	font-weight: normal;
}
.body2 {
	font-size: 14px;
	line-height: 150%;
	font-weight: normal;
}
.caption1 {
	font-size: 12px;
	line-height: 110%;
	font-weight: 300;
}
.caption2 {
	font-size: 10px;
	line-height: 100%;
	font-weight: 300;
}
</style>
