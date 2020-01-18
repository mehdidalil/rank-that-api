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

export default userRouter;