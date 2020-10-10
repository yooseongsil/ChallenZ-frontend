const routeMixin = {
	methods: {
		$_routeMixin_open_page(url) {
			window.open(url, '_blank');
		},
		$_routeMixin_href(path) {
			location.href = path;
		},
		$_routeMixin_go_page(path) {
			this.$router.push(path);
		},
		$_routeMixin_go_back() {
			this.$router.go(-1);
		},
	},
};
export default routeMixin;
