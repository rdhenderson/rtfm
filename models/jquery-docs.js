module.exports = function(sequelize, DataTypes) {
  var JQueryDoc = sequelize.define("JQueryDoc", {
    name: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being entered if it doesn't
      // have a text value
      allowNull: false,
      defaultValue: "test",
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [1, 255]
      }
    },
    data_url: {
      type: DataTypes.STRING
    },
    html: {
      type: DataTypes.TEXT
    }

  });
  return JQueryDoc;
};
