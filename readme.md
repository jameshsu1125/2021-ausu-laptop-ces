[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/) [![Design by realclear](https://img.shields.io/badge/Design%20by-瑞采數位科技-yellow)](http://realclear.com.tw/)

### Demo
https://jameshsu1125.github.io/ASUS-CES-2021/

## Deploy package ./dist 

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

## localization Usage [index.html](https://github.com/jameshsu1125/ASUS-CES-2021/blob/main/dist/index.html)

### (1)download [package](https://github.com/jameshsu1125/ASUS-CES-2021/archive/main.zip)

### (2)edit dist/index.html

```html
<div class="main">
	<div class="index">
		<!-- 
				tips : Monitors clickable arrow buttons with lightbox infomation
						tips-xxx => It a key for JSON. ( xxx = non-repeating key name )
						img => lightbox image url
						title => lightbox first row title
						subTitle => lightbox second row sub-title
						list => lightbox ul > li items. (keep <p> tag stay.)
						see-more => button url
						buy-now => button label and url (max length 6)
					
			 -->
		<div class="tips-g14">
			<div class="content">
				<div class="img">./img/lightbox/img0.jpg</div>
				<div class="title">ROG Zephyrus g15 g16 g15 <sub>a</sub><sup>b</sup></div>
				<div class="subTitle">Power Up. Do More.</div>
				<div class="list">
					<p>Up to NVIDIA® GeForce RTX™ 3090 GPU</p>
					<p>Up to 16-core AMD® Ryzen™ R9-3950X CPU</p>
					<p>Humanized eSports-friendly design</p>
					<p>Multi air chamber boost cooling</p>
				</div>
			</div>
			<div class="see-more">
				<a href="#See More">See More</a>
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
	</div>

	<script src="./js/index.min.js"></script>
</div>
```

### (3)update files to server
