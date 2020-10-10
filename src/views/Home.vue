<template>
	<div id="Home" class="center grid">
		<template v-if="getTutorialPassed">
			<!-- challenge detail -->
			<ChallengeDetail />
		</template>
		<template v-else>
			<!-- tutorial -->
			<TutorialChallengeDetail />
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TutorialChallengeDetail from '@/views/challenge/tutorial/TutorialChallengeDetail';
import ChallengeDetail from '@/views/challenge/ChallengeDetail';

export default {
	name: 'Home',
	computed: {
		...mapGetters(['getTutorialPassed']),
	},
	components: {
		ChallengeDetail,
		TutorialChallengeDetail,
	},
};
</script>

<style lang="scss" scoped>
#Home {
	padding-bottom: 70px;
}
.add_new_card {
	background: $primary;
	opacity: 0.1;
	width: 100%;
	height: 100%;
}
</style>
