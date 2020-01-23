import express from 'express';
import { Grade } from '../models';

const gradeRouter = express.Router();

gradeRouter.post('/set', (req, res) => {
	if (!req.body.songId || !req.body.userId)
		res.status(400).send('Invalid userId or songId !');
	else {
		Grade.findOneAndUpdate(
			{ songId: req.body.songId, userId: req.body.userId },
			{ $set: { ...req.body } },
			{ upsert: true, runValidators: true, useFindAndModify: false },
			function (err, result) {
			if (err)
				res.status(400).send(`Can't set grade: ${err.message}`);
			else
				res.send('Grade set');
			});
	}
});

gradeRouter.get('/get', (req, res) => {
	Grade.findOne({ songId: req.body.songId, userId: req.body.userId }, function (err, result) {
		if (err || !result)
			res.status(400).send(`Grade not found`);
		else
			res.send(result);
	});
});

gradeRouter.delete('/delete/', (req, res) => {
	Grade.deleteOne({ songId: req.body.songId, userId: req.body.userId }, function (err, item) {
		console.log(item);
		if (err)
			res.status(400).send(`Grade not deleted: ${err.message}`);
		else if (!item.deletedCount)
			res.status(400).send(`Grade not found for deletion !`);
		else
			res.send('Grade deleted !');
	})
});

export default gradeRouter;