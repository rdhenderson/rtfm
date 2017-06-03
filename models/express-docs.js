module.exports = function(sequelize, DataTypes) {
  var ExpressDoc = sequelize.define("ExpressDoc", {
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
      type: DataTypes.TEXT
    },
    detail: {
      type: DataTypes.TEXT,
    }

  },
  {
      indexes: [
        // add a FULLTEXT index
        { type: 'FULLTEXT', name: 'text_idx', fields: ['detail', 'name'] }
      ]
    });
  return ExpressDoc;
};
