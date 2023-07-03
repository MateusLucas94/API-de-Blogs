const User = (sequelize, DataTypes) => {
    const users = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      displayName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      image: DataTypes.STRING,
    },
      {
        tableName: 'users',
        timestamps: false,
        underscored: true
        
      });
    users.associate = (models) => {
      users.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blogPosts' });
    };
    return users;
  };
  
  module.exports = User;