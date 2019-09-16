
# Top Ice Cream Shops in Alpharetta Simple API  
***Find Top Ice Cream Shops using Yelp Fusion***

The project contains following files
 - Package.json
	 - This file holds metadata for the project, such as a project description, dependencies, the version, author and repository details.
 - .gitignore
	 - .**gitignore** tells git which **files** (or patterns) it should ignore. It's usually used to avoid committing transient **files** from your working directory that aren't useful to other collaborators, such as compilation products, temporary **files** IDEs create, etc.
 - .env
	 - .**env files** allow you to put your **environment** variables inside a **file**, such as **NODE_ENV, API_Key, PORT**
 - app.js
	 - Here we have created a Rest API using express, which takes **location** and **limit** as parameter with default values **Alpharetta** and **5** respectively and send the request to ***Yelp Fusion***, once the ***Yelp Fusion*** responds with the result set in order of rating, the API moves to **synchronous** function using ***async.whilst*** to get reviews of each shop in result set. Once all reviews are collected the final response is prepared and sent back to the client.
<br/><br/>

**Demo** For a working example go to:  
[https://alpharetta-top-ice-cream-shops-simple-api.amitmourya.me/api/businesses](https://alpharetta-top-ice-cream-shops-simple-api.amitmourya.me/api/businesses)
it also accepts optional parameter **location** & **limit**

[https://alpharetta-top-ice-cream-shops-simple-api.amitmourya.me/api/businesses?location=Duluth&limit=2](https://alpharetta-top-ice-cream-shops-simple-api.amitmourya.me/api/businesses?location=Duluth&limit=2)
