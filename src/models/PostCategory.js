const PostCategory = (sequelize, DataTypes) => {
  const postCategories = sequelize.define("PostCategory",
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "BlogPosts",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    {
      tableName: "posts_categories",
      timestamps: false,
      underscored: true,
    }
  );
  postCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: postCategories,
      foreignKey: "postId",
      otherKey: "categoryId",
      as: "categories",
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: postCategories,
      foreignKey: "categoryId",
      otherKey: "postId",
      as: "BlogPosts",
    });
  };
  return postCategories;
};

module.exports = PostCategory;