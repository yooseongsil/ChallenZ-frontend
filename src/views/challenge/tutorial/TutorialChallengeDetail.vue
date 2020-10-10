<template>
	<div>
		<vs-row align="center" justify="center">
			<vs-col vs-type="flex" vs-align="center" w="11">
				<vs-row>
					<template v-for="(item, index) in chatList">
						<vs-col :key="`col-${index}`" class="flex flex-row">
							<vs-avatar
								v-if="item.Z"
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
								<vs-row
									v-for="(zItem, zIndex) in item"
									:key="`z-chat-balloon-${zIndex}`"
									class="z-chat-list-item"
								>
									<ChatBalloon v-if="item.Z" class="mb-12" bg-color="white" color="deepDark">
										<template v-slot:title>
											<span v-html="zItem" />
										</template>
									</ChatBalloon>
								</vs-row>

								<!-- User chat -->
								<vs-row
									v-for="(userItem, userIndex) in item"
									:key="`user-chat-balloon-${userIndex}`"
									class="flex justify-content-flex-end"
								>
									<ChatBalloon
										v-if="item.User"
										class="mt-24 mb-24"
										bg-color="linear-gradient(90deg, #7E72F2 0%, rgba(126, 114, 242, 0.623088) 100%)"
										color="white"
									>
										<template v-slot:title>
											<span v-html="userItem" />
										</template>
									</ChatBalloon>
								</vs-row>

								<!-- task type option -->
								<vs-row v-if="index === 14 && showTaskTypeOption">
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
				</vs-row>
			</vs-col>
		</vs-row>

		<!-- User answer button -->
		<vs-row>
			<vs-col w="12">
				<BottomButton v-if="showAnswerButton">
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
									@click="handleAnswer(index, userItem)"
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
		showAnswerButton: false,
		chatList: [],
		isFinishedZChat: false,
		showTaskTypeOption: false,
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
	async mounted() {
		await this.handleInitChatList();
	},
	methods: {
		...mapMutations(['setHeaderTitle']),
		async handleInitChatList() {
			const zList = this.tutorialItems[0].Z;
			await this.handleLoop(zList, 'Z');
			await this.handleShowAnswerButton(zList.length);
		},
		async handleLoop(list, key) {
			await list.forEach((item, zIndex) => {
				this.loop(zIndex, item, key);
			});
		},
		async loop(x, item, key) {
			await setTimeout(() => {
				this.chatList.push({
					[key]: item,
				});
			}, 1000 * x);
		},
		async handleShowAnswerButton(x) {
			await setTimeout(() => {
				this.showAnswerButton = true;
			}, 1000 * x);
		},
		async handleAnswer(tutorialIndex, item) {
			this.showAnswerButton = false;
			await this.loop(0, item, 'User');

			const zList = this.tutorialItems[tutorialIndex + 1].Z;
			await this.handleLoop(zList, 'Z');
			this.chatStep = tutorialIndex + 1;
			if (this.chatStep < 5) {
				await this.handleShowAnswerButton(zList.length);
			} else {
				await setTimeout(() => {
					this.showTaskTypeOption = true;
					this.showAnswerButton = false;
				}, 1000 * zList.length);
			}

			// todo: scrollToEnd
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
