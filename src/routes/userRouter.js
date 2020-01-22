import express from 'express';
import { User } from '../models';

const userRouter = express.Router();

userRouter.post('/create', (req, res) => {
	const user = new User(req.body);
	user
	.save()
	.then(result => res.send('User added.'))
	.catch(err => res.status(400).send(`User not created: ${err.message}`));
});

userRouter.get('/:id', (req, res) => {
	User.findById(req.params.id, function (err, result) {
		if (err)
			res.status(400).send(`User not found: ${err.message}`);
		else
			res.send(result);
	});
});

userRouter.patch('/:id', (req, res) => {
	User.findById(req.params.id, function (err, result) {
		if (err)
			res.status(400).send(`Can't modify user props: ${err.message}`);
		else
		{
			result.username = req.body.username;
			result
			.updateOne()
			.then(result => res.send('User updated.'))
			.catch(err => res.status(400).send(`User not updated: ${err.message}`));
		}
	});
});

userRouter.delete('/delete', (req, res) => {
	User.deleteOne({ mail: req.body.mail }, function (err, item) {
		if (err)
			res.status(400).send(`User not deleted: ${err.message}`);
		else if (!item.deletedCount)
			res.status(400).send(`User not found for deletion !`);
		else
			res.send('User deleted !');
	})
});

export default userRouter;