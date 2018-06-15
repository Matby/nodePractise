'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UsersSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the name of your User'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  position: {
    type: [{
      type: String,
      enum: ['koodari', 'testaaja', 'manageri']
    }],
    default: ['koodari']
  }
});

module.exports = mongoose.model('Users', UsersSchema);
