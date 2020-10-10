<template>
	<header>
		<nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'Header',
};
</script>

<style lang="scss" scoped>
header {
	background-color: $white;
	width: 100vw;
	height: 48px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;

	@include pc {
		height: 70px;
	}

	.header_container {
		height: 48px;
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
