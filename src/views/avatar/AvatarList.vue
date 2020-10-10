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
					<vs-card
						class="mb-20"
						:class="{ active: avatarActive[index] === true }"
						@click="clickAvatar(index)"
					>
						<template #img>
							<img :src="list" alt="list" />
						</template>
					</vs-card>
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
					<vs-row justify="space-around">
						<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5">
							<vs-button block>저장하기 </vs-button>
						</vs-col>
						<vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5">
							<vs-button border block> 취소하기</vs-button>
						</vs-col>
					</vs-row>
				</vs-col>
				<!-- <vs-button
        border
        :active="active == 0"
        @click="active = 0"
      >-->
			</vs-row>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AvatarList',
	data: () => ({
		avatarList: [
			'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt',
			'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt',
			'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt',
			'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt',
			'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt',
			'https://render-cdn.zepeto.io/20201010/06/39mqFOscZFNPoxxwDt',
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
};
</script>

<style scoped lang="scss">
#AvatarList {
	/deep/ .vs-card {
		max-width: 100% !important;
		&.active {
			border: 1px solid red !important;
		}
	}
	.vs-button {
		margin: 0 !important;
	}
}
</style>
