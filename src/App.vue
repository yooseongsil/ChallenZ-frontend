<template>
	<div id="app" class="center grid">
		<vs-row>
			<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
				<Header />
				<router-view />
				<Footer />
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';

export default {
	components: { Footer, Header },
};
</script>

<style lang="scss"></style>
