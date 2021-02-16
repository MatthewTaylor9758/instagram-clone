# Instagram
*A collaboration between Matt Taylor, Caitlin Conway, and Quincy Jones.*
## Table of Contents 
- [Instagram Overview](#instagram-overview)
- Application Architecture and Technologies Involved
- Front End Overview
- Back End Overview
- Moving Forward
## Instagram Overview
Instagram is based on the real web-based Instagram site, focused on helping connect people and share photos and videos!
</br>
</br>
The front end was built using HTML, CSS, and the Pug library, while the back end was developed using the Sequelize.js ORM, and PostgreSQL.
</br>
</br>
Users can look at all of the pictures they have posted, the ones their friends have in the main feed, and leave comments if they wish.
</br>
</br>
![scrolling in main feed](https://media.giphy.com/media/4V4Oy77v1yy7hJBqvs/giphy.gif)
</br>
</br>
## Application Architecture
Placeholder for diagram that will show technologies and how they interact with each other.
</br>
</br>
## Front End Overview
### Pug
Pug is the template engine we used through the entire front end for its ability to natively use Javascript and convert the code seamlessly into HTML that the browser can parse.
</br>
</br>
### CSS
Using CSS and its many features we were able to acheive the look we desired. We took advantage of basic CSS features such as z-index, box-sizing, and overflow and integrated them with more advanced features such as the ever-handy Flexbox.
</br>
</br>
## Back End Overview
### Sequelize ORM
We decided to use the Sequelize.js library for its ease of use when creating models, migrations and seeder files. Sequelize helped streamline our interactions with the database in all facets, such as creating a model for pictures as the code below shows:
```
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {

    static associate(models) {
      Picture.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Picture.hasMany(models.Comment, {
        foreignKey: "pictureId",
      });
      Picture.hasMany(models.Like, {
        foreignKey: "pictureId",
      });
    }
  }
  Picture.init(
    {
      userId: DataTypes.INTEGER,
      fileLocation: DataTypes.STRING,
      description: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: "Picture",
    }
  );
  return Picture;
};
```
</br>
The code above is a much easier way to interact with a database and create models within it. Here we set up the model so the picture belongs to only one user, the users can have many pictures, and each picture can have many likes. This is just a taste of the features Sequelize brings, but it is a good illustation of how we took advantage of part of that utility.

### PostgreSQL
We leveraged PostgreSQL's ability to use different transactions, foreign keys, subqueries, triggers, and different user-defined types and functions to create our site. Sequelize and PostgreSQL work together to make our database construction, alterations, and interactions smoother.
