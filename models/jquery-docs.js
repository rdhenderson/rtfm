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
    detail: {
      type: DataTypes.TEXT
    },
    examples: {
      type: DataTypes.TEXT,
      get: function() {
           return JSON.parse(this.getDataValue('examples'));
       },
       set: function(val) {
           return this.setDataValue('examples', JSON.stringify(val));
       }
    },
    description : {
      type: DataTypes.TEXT
    }

  },
  {
      indexes: [
        // add a FULLTEXT index
        { type: 'FULLTEXT', name: 'text_idx', fields: ['detail', 'name', 'description'] }
      ]
    });
  return JQueryDoc;
};
