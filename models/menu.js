module.exports = function (sequelize, DataTypes) {
  var menu = sequelize.define("menus", {
    name: DataTypes.STRING,
    station: DataTypes.INTEGER,      // 1 : Salad, 2 : Dessert
    mods: DataTypes.STRING,
    highlight: DataTypes.STRING,
    averageTime: DataTypes.STRING
  });


  return menu;
};
