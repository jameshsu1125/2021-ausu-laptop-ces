[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/) [![Design by realclear](https://img.shields.io/badge/Design%20by-瑞采數位科技-yellow)](http://realclear.com.tw/)

## pre-install

```sh
$ [sudo] npm i webpack webpack-cli webpack-dev-server node-pre-gyp -g
$ npm i
```

## test project

```sh
$ npm start
```

#### test project on http://localhost:8080

## output to /dist

```sh
$ npm run op
```

## deploy on asus modularization server

```
dist
 ┣ css            // upload to dlcdnwebimgs
 ┃ ┗ style.css
 ┣ img            // upload to dlcdnwebimgs
 ┃ ┗      .
 ┣ js             // upload to dlcdnwebimgs
 ┃ ┗ index.min.js
 ┗ index.html     // Copy <div class='index'>...</div> into html editor
```

## dom to json

convert dom to json and pass into react.

- [read more](https://github.com/jameshsu1125/lesca-dom2json)

```html
<div class="index" style="display: none">
	<div class="title">Lorem Ipsum is simply</div>
	<div class="img">
		<img src="./img/1/png" />
	</div>
	<div class="img_link">
		<a href="https://www.asus.com">
			<img src="./update/img0.jpg" />
		</a>
	</div>
	<div class="list">
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
	</div>
	<div class="buy-now">
		<a href="#liverpool">www.liverpool.com</a>
		<a href="#momoshop">momoshop</a>
		<a href="#pchome">pchome</a>
		<a href="#Costco">Costco</a>
		<a href="#pchome">pchome</a>
		<a href="#Costco">Costco</a>
	</div>
</div>
<script>
	// The dom will re-append by server-side. It have to load after html document loaded.
	document.addEventListener('DOMContentLoaded', function () {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = 'https://dlcdnwebimgs.asus.com/files/media/xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx/js/index.min.js';
		document.getElementsByTagName('head')[0].appendChild(s);
	});
</script>
```

## require in jsx

The file path generator use require method that need to change relative path to absolute path. The path variable in 'src/config.js';

```javascript
let relative_path = require('./img/background.jpg'),
	absolute_path = require('./config.js').Require(relative_path);
```

## css background-image url

It can turn on server-base url by variable that name @cdn in 'src/config.less' ;

```less
@cdn: true; //todo: is turn cdn url? [true] => insert @cdn_url, [false] => use relative path
@cdn_url: 'https://dlcdnwebimgs.asus.com/files/media/6570DD19-B43C-4496-9A24-53CBFB320D9B/img/';
```

## dataLayer of gtag

The gtag code can push on <a> tag. You can just set attribute as "dataLayer". push data convert to string.

```html
<a href="#PRESS KIT" dataLayer="{'event':'data_layer_event','event_category_DL':'buttons','event_action_DL':'clicked','event_label_DL':'PRESS KIT','event_value_DL':'0'}">PRESS KIT</a>
```
