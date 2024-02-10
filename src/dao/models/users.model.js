import { Schema, model } from 'mongoose';

const usersCollection = 'users';

const userSchema = new Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true,
		required: true,
		index: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	phone_number: Number,
});

export default model(usersCollection, userSchema);
