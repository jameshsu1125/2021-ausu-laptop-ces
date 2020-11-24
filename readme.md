[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/) [![Design by realclear](https://img.shields.io/badge/Design%20by-瑞采數位科技-yellow)](http://realclear.com.tw/)

# Deploy ./dist

```
dist
 ┣ css                             // CDN / Local server
 ┃ ┗ style.css
 ┣ img                             // CDN / Local server
 ┃ ┗      .
 ┣ js                              // CDN / server
 ┃ ┗ index.min.js
 ┗ index.html                      // Local server
```

# localization Usage [index.html](https://github.com/jameshsu1125/ASUS-CES-2021/blob/main/dist/index.html)

## download package

## edit dist/index.html

```html
<div class="main">
	<div class="index">
		<div class="Key">value</div>
		<div class="example-title">第 10 世代インテル® Core™ プロセッサー搭載</div>
		<!--
			make div into comment block to hide
			<div class="example-hide-element">さらに詳しい情報は：https://www.asus.com/jp/</div>
		-->
	</div>

	<script src="./js/index.min.js"></script>
</div>
```
