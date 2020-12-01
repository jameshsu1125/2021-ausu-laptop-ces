module.exports = {
	skip_enter: true,
	Client: {
		desktop: {
			widht: 2560,
			height: 1255,
		},
		mobile: {
			widht: 730,
			height: 1160,
		},
	},
	Require(url) {
		return location.hostname.indexOf('asus') < 0 ? url : 'https://dlcdnwebimgs.asus.com/files/media/6570DD19-B43C-4496-9A24-53CBFB320D9B/' + url;
	},
};
