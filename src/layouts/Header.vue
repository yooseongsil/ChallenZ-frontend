<template>
	<header class="center grid">
		<vs-row align="center" justify="center" class="header_container">
			<vs-col vs-type="flex" vs-align="center" w="11" class="flex align-items-center justify-content-between">
				<div class="flex align-items-center">
					<div class="mr-16" @click="$_routeMixin_go_back">
						<Icon :class="{ 'visibility-hidden': !$route.meta.detailPage }" name="IconRightArrow" />
					</div>
					<div>
						<Typography type="body1">{{ getHeaderTitle }}</Typography>
					</div>
				</div>

				<!-- todo: badge badge-position="top-right" -->
				<vs-avatar color="#FFFFFF" size="32">
					<Icon name="IconMoreMenu" />
				</vs-avatar>
			</vs-col>
		</vs-row>
	</header>
</template>

<script>
import Icon from '@/components/Icon';
import routeMixin from '@/mixins/routeMixin';
import Typography from '@/components/Typography';
import { mapGetters } from 'vuex';

export default {
	name: 'Header',
	mixins: [routeMixin],
	computed: {
		...mapGetters(['getHeaderTitle']),
	},
	components: {
		Typography,
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
.visibility-hidden {
	visibility: hidden;
}
</style>
