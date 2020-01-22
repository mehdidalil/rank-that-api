import mongoose from 'mongoose';
import { REGEX_USERNAME, REGEX_PASSWORD } from '../globals';

const usersSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: [4, 'should be at least 4 characters long'],
		maxlength: [32, 'should be under 32 characters long'],
		validate: REGEX_USERNAME,
	},
	password: {
		type: String,
		required: true,
		minlength: [8, 'should be at least 8 characters long'],
		maxlength: [32, 'should be under 32 characters long'],
		validate: REGEX_PASSWORD,
	},
	mail: String
});

usersSchema.pre('save', function(next) {
	this.constructor.findOne({mail: this.mail}, function (err, res) {
		if (res)
			next(new Error('Already existing !'));
		else
			next();
	});
})

export default mongoose.model("users", usersSchema);