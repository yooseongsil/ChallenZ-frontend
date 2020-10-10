<template>
	<header class="center grid">
		<vs-row align="center" justify="center" class="header_container">
			<vs-col vs-type="flex" vs-align="center" w="11" class="flex justify-content-flex-end">
				<!-- badge badge-position="top-right" -->
				<vs-avatar color="#FFFFFF" size="32">
					<Icon name="IconMoreMenu" />
				</vs-avatar>
			</vs-col>
		</vs-row>
	</header>
</template>

<script>
import Icon from '@/components/Icon';

export default {
	name: 'Header',
	components: {
		Icon,
	},
};
</script>

<style lang="scss" scoped>
header {
	background-color: $white;
	width: 100vw;
	height: 62px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.135216);
	border-radius: 8px;
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;

	@include pc {
		height: 70px;
	}

	.header_container {
		min-height: 62px;
		@include flexbox();
		@include justify-content(space-between);
		@include align-items(center);

		@include pc {
			height: 100%;
			padding: 0;
		}
	}
}
</style>
