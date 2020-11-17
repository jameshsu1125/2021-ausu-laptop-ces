[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/) [![Design by realclear](https://img.shields.io/badge/Design%20by-瑞采數位科技-yellow)](http://realclear.com.tw/)

## Deploy

```
dist
 ┣ css                             // CDN server
 ┃ ┗ style.css
 ┣ img                             // CDN server
 ┃ ┗      .
 ┣ js                              // CDN server
 ┃ ┗ index.min.js
 ┗ index.html                      // Local server
```

## hide DOM in html file

```
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
