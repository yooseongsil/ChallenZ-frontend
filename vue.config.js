module.exports = {
	css: {
		loaderOptions: {
			scss: {
				prependData: ` 
                    @import "@/assets/styles/base/variables.scss"; 
                    @import "@/assets/styles/base/mixins.scss"; 
                `,
			},
		},
	},
};
