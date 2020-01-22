import express from 'express';
import { User } from '../models';

const userRouter = express.Router();

userRouter.post('/create', (req, res) => {
	const user = new User(req.body);
	user
	.save()
	.then(() => res.send('User added.'))
	.catch(error => res.status(400).send(`User not created: ${error.message}`));
});

userRouter.patch('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, { $set: { username: req.body.username } }, { useValidators: true, useFindAndModify: false }, function (err, result) {
		if (err)
			res.status(400).send(`Can't modify user props: ${err.message}`);
		else
			res.send('User updated');
	});
});

userRouter.get('/:id', (req, res) => {
	User.findById(req.params.id, function (err, result) {
		if (err)
			res.status(400).send(`User not found: ${err.message}`);
		else
			res.send(result);
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