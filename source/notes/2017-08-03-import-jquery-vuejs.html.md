---
page_title: How to import jQuery into VueJS
date: 2017-08-03
categories: javascript
description: Currently working on a Vue.js project and had a bit of a snag when trying to import jQuery into my project.
tags: jquery, vuejs
image_small: notes/dsgndhat-jquery-vuejs-sm.jpg
image: notes/dsgndhat-jquery-vuejs.jpg
---

> Currently working on a Vue.js project and had a bit of a snag when trying to import jQuery into my project.

The solution I found is from <a href="https://maketips.net/tip/223/how-to-include-jquery-into-vuejs" target="_blank">Maketips</a> and is for projects created via the vue cli webpack.

```
yarn add jquery -D
```

Instead of opening build/webpack.base.conf.js, as the post suggests, open config/webpack.dev.conf.js and after new FriendlyErrorsPlugin() add:

```
new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    })
```
