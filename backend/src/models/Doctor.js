// models/Doctor.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctorSchema = new Schema({
	name: { type: String, required: true },
	specialty: { type: String, required: true },
	// Add more fields as needed
});

const Doctor =
	mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
