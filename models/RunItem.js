
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var runItemSchema = Schema( {
  distance: Number,
  distanceUnit: String,
  min: Number,
  sec: Number,
  createdAt: Date,
  userId: ObjectId
} );

module.exports = mongoose.model( 'RunItem', runItemSchema );
