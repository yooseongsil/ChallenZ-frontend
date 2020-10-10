<template>
	<div>
		<vs-row align="center" justify="center">
			<vs-col vs-type="flex" vs-align="center" w="11">
				<vs-row id="TutorialChallengeDetail">
					<template v-for="(tutorialItem, index) in tutorialItems">
						<template v-if="index <= chatStep">
							<vs-col :key="`col-${index}`" class="flex flex-row">
								<vs-avatar
									v-if="tutorialItem.Z"
									:key="`avatar-${index}`"
									size="40"
									circle
									style="min-width: 40px"
									class="mr-12"
								>
									<img src="https://vuesax.com/avatars/avatar-4.png" alt="" />
								</vs-avatar>
								<vs-row>
									<!-- Z chat -->
									<!--									<transition-group name="z-chat-list" tag="span">-->
									<vs-row
										v-for="(zItem, zIndex) in tutorialItem.Z"
										:key="`z-chat-balloon-${zIndex}`"
										class="z-chat-list-item"
									>
										<ChatBalloon
											class="mb-12"
											:class="{ 'mb-40': zIndex + 1 === tutorialItem.Z.length }"
											bg-color="white"
											color="deepDark"
										>
											<template v-slot:title>
												<span v-html="zItem" />
											</template>
										</ChatBalloon>
									</vs-row>
									<!--									</transition-group>-->

									<!-- User chat -->
									<vs-row
										v-for="(userItem, userIndex) in tutorialItem.User"
										:key="`user-chat-balloon-${userIndex}`"
										class="flex justify-content-flex-end"
									>
										<ChatBalloon
											v-if="index < chatStep"
											class="mb-12"
											:class="{ 'mb-40': userIndex + 1 === tutorialItem.User.length }"
											bg-color="linear-gradient(90deg, #7E72F2 0%, rgba(126, 114, 242, 0.623088) 100%)"
											color="white"
										>
											<template v-slot:title>
												<span v-html="userItem" />
											</template>
										</ChatBalloon>
									</vs-row>

									<!-- task type option -->
									<vs-row v-if="showTaskTypeOption(index)">
										<swiper :options="swiperOptions" class="swiper pb-20">
											<swiper-slide
												v-for="option in taskTypeOption"
												:key="option.title"
												style="width: 116px"
											>
												<vs-card
													@click="
														$_routeMixin_go_page(
															`/challenge/create?challenge_name=${option.title}`,
														)
													"
												>
													<template #title>
														<h3>{{ option.title }}</h3>
													</template>
													<template #img>
														<img v-if="option.image !== ''" :src="option.image" alt="" />
														<Icon name="PlusImage" />
													</template>
													<template #text>
														<span style="display: none">text</span>
													</template>
												</vs-card>
											</swiper-slide>
										</swiper>
									</vs-row>
								</vs-row>
							</vs-col>
						</template>
					</template>
				</vs-row>
			</vs-col>
		</vs-row>

		<!-- User answer button -->
		<vs-row>
			<vs-col w="12">
				<BottomButton>
					<template v-for="(tutorialItem, index) in tutorialItems">
						<div
							v-if="chatStep === index"
							:key="`tutorial-items-button-${index}`"
							class="flex flex-row justify-content-between"
						>
							<template v-for="(userItem, userIndex) in tutorialItem.User">
								<vs-button
									:key="`user-button-${userIndex}`"
									primary
									block
									size="xl"
									style="margin: 0"
									:class="{ 'ml-12': userIndex > 0 }"
									@click="handleAnswer(index)"
								>
									{{ userItem }}
								</vs-button>
							</template>
						</div>
					</template>
				</BottomButton>
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
import routeMixin from '@/mixins/routeMixin';
import TutorialData from '@/assets/data/tutorial.json';
import { mapMutations } from 'vuex';
import BottomButton from '@/components/BottomButton';
import ChatBalloon from '@/components/ChatBalloon';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import Icon from '@/components/Icon';

export default {
	name: 'TutorialChallengeDetail',
	mixins: [routeMixin],
	data: () => ({
		tutorialItems: TutorialData.data,
		chatStep: 0,
	}),
	computed: {
		swiperOptions() {
			let swiperOption = {
				slidesPerView: 'auto',
				spaceBetween: 12,
			};

			return swiperOption;
		},
		taskTypeOption() {
			return [
				{
					image: 'https://vuesax.com/avatars/avatar-4.png',
					title: 'Workout',
				},
				{
					image: 'https://vuesax.com/avatars/avatar-5.png',
					title: 'Hobby',
				},
				{
					image: '',
					title: 'Add New',
				},
			];
		},
	},
	created() {
		this.setHeaderTitle('Tutorial');
	},
	mounted() {},
	methods: {
		...mapMutations(['setHeaderTitle']),
		handleAnswer(tutorialIndex) {
			this.chatStep = tutorialIndex + 1;
			this.$_scrollToEnd('TutorialChallengeDetail');
		},
		showTaskTypeOption(index) {
			return index + 1 === this.tutorialItems.length && this.chatStep + 1 === this.tutorialItems.length;
		},
	},
	components: {
		BottomButton,
		ChatBalloon,
		Swiper,
		SwiperSlide,
		Icon,
	},
};
</script>

<style lang="scss" scoped>
.z-chat-list-item {
	//display: inline-block;
	//margin-right: 10px;
}
.z-chat-list-enter-active,
.z-chat-list-leave-active {
	transition: all 1s;
}
.z-chat-list-enter,
.z-chat-list-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
</style>
