<template>
	<div id="AvatarList">
		<div class="center grid">
			<vs-row>
				<vs-col
					v-for="(list, index) in avatarList"
					:key="index"
					vs-type="flex"
					vs-justify="center"
					vs-align="center"
					w="6"
				>
					<vs-card :class="{ active: avatarActive[index] === true }" @click="clickAvatar(index, list._id)">
						<template #title>
							<h3>{{ list.name }}</h3>
						</template>
						<template #img>
							<img :src="list.avatarUrl" alt="list" />
						</template>
						<template #text>
							<p>
								{{ list.description }}
							</p>
						</template>
					</vs-card>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<BottomButton>
						<vs-button block size="xl" @click="createChallenge">Finish</vs-button>
					</BottomButton>
				</vs-col>
			</vs-row>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import routeMixin from '../../mixins/routeMixin';
import { mapGetters, mapMutations } from 'vuex';
import BottomButton from '../../components/BottomButton';

export default {
	name: 'AvatarList',
	mixins: [routeMixin],
	data: () => ({
		avatarList: null,
		avatarActive: [],
	}),
	computed: {
		...mapGetters(['getCreateChallengeInfo']),
	},
	async created() {
		this.avatarActive.fill(false);
		this.setHeaderTitle('Choose your Zavartar');
		await this.getAvatarList();
		this.avatarActive = new Array(this.avatarList.length);
	},
	methods: {
		...mapMutations(['setHeaderTitle', 'setCreateChallengeInfo']),
		clickAvatar(no, _id) {
			this.avatarActive.fill(false);
			this.avatarActive[no] = true;
			this.setCreateChallengeInfo({ ...this.getCreateChallengeInfo, avatarId: _id });
		},
		createChallenge() {
			const data = this.getCreateChallengeInfo;
			axios
				.post('/challenge', data)
				.then(res => {
					console.log(res);
					this.$_routeMixin_go_page('/challenge/list');
				})
				.catch(err => console.log(err));
		},
		async getAvatarList() {
			await axios
				.get('/avatarList')
				.then(res => {
					console.log(res);
					this.avatarList = res.data;
				})
				.catch(err => console.log(err));
		},
	},
	components: { BottomButton },
};
</script>

<style scoped lang="scss">
#AvatarList {
	padding: 0 20px 50px 20px;
	.vs-card-content {
		margin: 8px;
		/deep/ .vs-card {
			max-width: 100% !important;
			&.active {
				border: 1px solid red !important;
			}
			.vs-card__img {
				background: #f2f2f2;
			}
		}
	}

	.vs-button {
		margin: 0 !important;
	}
}
</style>
