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
					<vs-card :class="{ active: avatarActive[index] === true }" @click="clickAvatar(index)">
						<template #title>
							<h3>{{ list.name }}</h3>
						</template>
						<template #img>
							<img :src="list.url" alt="list" />
						</template>
						<template #text>
							<p>
								{{ list.desc }}
							</p>
						</template>
					</vs-card>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<BottomButton>
						<vs-button block size="xl" @click="next"> next</vs-button>
					</BottomButton>
				</vs-col>
			</vs-row>
		</div>
	</div>
</template>

<script>
import BottomButton from '../../components/BottomButton';
export default {
	name: 'AvatarList',
	data: () => ({
		avatarList: [
			{ url: 'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt', name: '강북멋쟁이', desc: '^0^' },
			{ url: 'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt', name: '강북멋쟁이', desc: '^0^' },
			{ url: 'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt', name: '강북멋쟁이', desc: '^0^' },
			{ url: 'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt', name: '강북멋쟁이', desc: '^0^' },
			{ url: 'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt', name: '강북멋쟁이', desc: '^0^' },
			{ url: 'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt', name: '강북멋쟁이', desc: '^0^' },
		],
		avatarActive: [],
	}),
	created() {
		this.avatarActive = new Array(this.avatarList.length);
		this.avatarActive.fill(false);
	},
	methods: {
		clickAvatar(no) {
			this.avatarActive.fill(false);
			this.avatarActive[no] = true;
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
