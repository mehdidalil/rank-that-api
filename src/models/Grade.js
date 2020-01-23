import mongoose from 'mongoose';

const gradeSchema = mongoose.Schema({
	songId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true
	},
	flow: {
		type: Number,
		min: 0,
		max: 10,
		required: true
	},
	beat: {
		type: Number,
		min: 0,
		max: 10,
		required: true
	},
	lyrics: {
		type: Number,
		min: 0,
		max: 10,
		required: true
	},
	originality: {
		type: Number,
		min: 0,
		max: 10,
		required: true
	},
	creativity: {
		type: Number,
		min: 0,
		max: 10,
		required: true
	}
});

export default mongoose.model('grades', gradeSchema);