# Midnight CMS
This project includes two parts: 
- Backend: RESTful API built with Node & Express and PostgreSQL as a database. 
- Frontend: Vue.js app with Nuxt.js

## Backend
The code for the API is [in this other repository.](https://github.com/AlexMayol/midnight_products_api)  
I chose PostgreSQL in order to learn how to use a SQL language in Node, since [I previously developed with MongoDB and Node](https://github.com/AlexMayol/Telegram-Bots).
I decides to use [ElephantSQL, a PostgreSQL SaaS](https://www.elephantsql.com/) in order to simplify both development and deployment phases. A backup of the database can be found on this repository. [node-postgres](https://node-postgres.com/) was used to ease the connection between PostgreSQL and node.js.

[The documentation for this API can be found in this url: https://arcane-sea-21496.herokuapp.com/api-docs/](https://arcane-sea-21496.herokuapp.com/api-docs/)

It's hosted on Heroku.


## Frontend
[Here is the website](https://musing-johnson-5ae84e.netlify.com)
You can find the code for the frontend part in this repository. You can see a classic Nuxt.js folder structure since it was my framework of choice. 
The app has 3 main routes:
1. Colors: here you can create a color. Give it a name (label) and pick a color with the native HTML5 color input. In a product, you'll see a preview of the color and the label as the title.
2. Categories: create a category by giving it a name, a description and a cute preview image. This is a nice adittion in case we would want to list all the categories in the future.
3. Products: create a new product by giving it a name, price, three descriptions (English, Spanish and German), a nice image to show how cool the product is and a category. You can also pick a color or more, but it's not required.

All of these entities can be created, modified and deleted. Each one has a form inside to update it and see the change in real time.
 
This frontend is hosted on Heroku.

## FAQ
1. Does your API have an auth system?
> No, I didn't consider it to be necessary. This way, everybody can add, edit and delete and it's so much fun!
2. Did you use a component library for the frontend?
> No. I see component libraries as overkill for small projects and they add a layer of complexity I don't want to deal with. If I had to pick one, anyway, I'd choose [Quasar](https://quasar.dev/) since I've seen and read a lot of good comments about it.
3. Did you use SSR in your app?
> Yes. As stated above, I decided to use Nuxt.js. Since I love performance, this way of developing modern apps is a good choice. Also, SEO is the hidden boss behind every developer, and SSR greatly helps with it. The rest is up to you!   
