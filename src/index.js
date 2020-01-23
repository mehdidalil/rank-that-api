import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { userRouter, gradeRouter } from './routes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/grades', gradeRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to the database !');
	})
	.catch((e) => {
		console.log(`S H I T: ${e}`);
	})

app.listen(process.env.PORT || 5000);
