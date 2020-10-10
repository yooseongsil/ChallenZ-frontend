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
	chainWebpack: config => {
		const svgRule = config.module.rule('svg');

		svgRule.uses.clear();

		svgRule
			.use('babel-loader')
			.loader('babel-loader')
			.end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader');
	},
};
