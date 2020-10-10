<template>
	<div id="app">
		<Header />
		<div class="main_grid_component center grid">
			<vs-row>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<router-view />
				</vs-col>
			</vs-row>
		</div>
		<!--		<Footer />-->
	</div>
</template>

<script>
import Header from '@/layouts/Header';
// import Footer from '@/layouts/Footer';

export default {
	components: {
		Header,
		// Footer,
	},
};
</script>

<style lang="scss" scoped>
.main_grid_component {
	padding-top: 80px !important;
	overflow-x: hidden;
	-ms-overflow-x: hidden;
	height: 100vh;

	@include pc {
		padding-top: 80px !important;
	}
}
</style>
