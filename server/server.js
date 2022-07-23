import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

//load routes
import PostRouter from './routes/post.routes.js';
import UserRouter from './routes/user.routes.js';

//create express instance
const app = express();
dotenv.config();

//middleware
// Cross-Origin Resource Sharing==>Enable All CORS Requests
app.use(cors());

//data parser
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());

//heroku test route
app.get('/', (req, res) => {
  res.send('hello from memories api');
});

//routes
app.use('/api/posts', PostRouter);
app.use('/api/auth', UserRouter);

//connect to db then run server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  } catch (error) {
    console.error('connection to db failed', error.message);
  }
};

ConnectDB();
mongoose.connection.on('open', () => console.log('db connected'));
mongoose.connection.on('error', (err) => console.log(err.message));
