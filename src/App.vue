<template>
	<div id="app">
		<template v-if="!isSplash">
			<Splash />
		</template>
		<template v-else>
			<Header />
			<div class="main_grid_component center grid">
				<vs-row>
					<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
						<router-view />
					</vs-col>
				</vs-row>
			</div>
		</template>

		<!--		<Footer />-->
	</div>
</template>

<script>
import Header from '@/layouts/Header';
import Splash from '@/components/Splash';
// import Footer from '@/layouts/Footer';

export default {
	data: () => ({
		isSplash: false,
	}),
	created() {
		if (!this.isSplash) {
			setTimeout(() => {
				this.isSplash = true;
			}, 2000);
		}
	},
	mounted() {
		if (localStorage.getItem('tutorialPassed')) {
			this.$store.commit('setTutorialPassed', true);
		}
	},
	components: {
		Header,
		Splash,
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
