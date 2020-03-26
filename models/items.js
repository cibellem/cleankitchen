module.exports = function (sequelize, DataTypes) {
  var items = sequelize.define("items", {
    name: DataTypes.STRING,
    status: {  // "not started", "working", "finished"
      type: DataTypes.STRING,
      defaultValue: "not started"
    },
    orderNumber: DataTypes.INTEGER,
    station: DataTypes.INTEGER,      // 1 : Salad, 2 : Dessert
    mods: DataTypes.STRING,
    highlight: {
      type: DataTypes.STRING,
      defaultValue: "##0000ff"
    },
    averageTime: DataTypes.STRING,
    currentTime: {
      type: DataTypes.STRING,
      defaultValue: "0:00"
    }
  });


  return items;
};


