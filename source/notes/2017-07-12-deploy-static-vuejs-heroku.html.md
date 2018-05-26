---
page_title: 'Heroku: How to Deploy a Static VueJS app'
author: dsgndhat
date: 2017-07-12
categories: javascript
description: Heroku is an amazing hosting platform when you want to quickly share your latest projects or learnings with others.
tags: heroku, vuejs
image_small: notes/dsgndhat-heroku-vuejs-sm.jpg
image: notes/dsgndhat-heroku-vuejs.jpg
---

> Heroku is an amazing hosting platform when you want to quickly share your latest projects or learnings with others.

However, after completing a couple of tutorials aimed at increasing my knowledge of building single page web apps with vue.js, I hit a wall when it came time to deploy.
Most Google findings were geared towards deploying vue.js apps with webpack and I needed something more simple. Here's what I found and I hope it saves someone else days of searching.

Set up
------

1. You need git
2. Set up <a href="https://signup.heroku.com/" target="_blank">Heroku Account</a>
3. Download the <a href="https://toolbelt.heroku.com/" target="_blank">Heroku CLI</a>
4. Run heroku login in your terminal

Deploy to Heroku
----------------

```
cd into your project directory
```

With your editor of choice, create an index.php file and inclue this line of code:

```php
<?php header( 'Location: /index.html' ) ;  ?>
```

This brilliant method makes the browser redirect from index.php to index.html thus tricking Heroku into deploying your single page web app without the use of NodeJS buildpack.

Version Control
---------------

Next initialise your git repo:

```
git init
git add .
git commit -m 'Put your message here'
```

Create your app site on Heroku with the following command:

```
heroku apps:create vuejs-app
```

of course change vuejs-app to your name of choice.

Now the moment we've been waiting for. Push the code to Heroku:

```
git push heroku master
```

In the terminal you should see the build process and if all goes well, you should be greeted with:

'remote: Verifying deploy…. done.'

Finally a link to your app is provided so you can view your work.

Enjoy!
