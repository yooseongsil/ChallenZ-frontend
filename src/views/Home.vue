<template>
	<div id="Home" class="center grid">
		<vs-row align="center" justify="center">
			<vs-col vs-type="flex" vs-align="center" w="11">
				<vs-row>
					<template v-for="(tutorialItem, index) in tutorialItems">
						<template v-if="index <= chatIndex">
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
									<vs-row v-for="(zItem, zIndex) in tutorialItem.Z" :key="`z-chat-balloon-${zIndex}`">
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
									<!-- User chat -->
									<vs-row
										v-for="(userItem, userIndex) in tutorialItem.User"
										:key="`user-chat-balloon-${userIndex}`"
										class="flex justify-content-flex-end"
									>
										<ChatBalloon
											v-if="index < chatIndex"
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
														$_routeMixin_go_page(`/challenge/create?text=${option.title}`)
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
							v-if="chatIndex === index"
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
import ChatBalloon from '@/components/ChatBalloon';
import TutorialData from '@/assets/data/tutorial.json';
import BottomButton from '@/components/BottomButton';
import Icon from '@/components/Icon';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import routeMixin from '@/mixins/routeMixin';
import { mapMutations } from 'vuex';

export default {
	name: 'Home',
	mixins: [routeMixin],
	data: () => ({
		tutorialItems: TutorialData.data,
		chatIndex: 0,
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
					title: 'Study',
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
	methods: {
		...mapMutations(['setHeaderTitle']),
		handleAnswer(tutorialIndex) {
			this.chatIndex = tutorialIndex + 1;
			// todo: scroll
		},
		showTaskTypeOption(index) {
			return index + 1 === this.tutorialItems.length && this.chatIndex + 1 === this.tutorialItems.length;
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
