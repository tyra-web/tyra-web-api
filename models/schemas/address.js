const MONGOOSE = require('mongoose');

var Schema = MONGOOSE.Schema;

var AddressSchema = new Schema({
	street: { type: String, required: false },
	number: { type: Number, required: false },
	intNumber: { type: Number, required: false },
	postalCode: { type: Number, required: false }
});

module.exports = AddressSchema;
