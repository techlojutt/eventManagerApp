const express = require('express');
const dotEnv = require('dotenv').config();
const morgan  = require('morgan');
var cors = require('cors')
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRouter = require('./routes/eventRoutes');


const app = express();
app.use(cors())




const port = process.env.PORT || 3000;


connectDb();


//middlewares

app.use(express.json());
app.use(morgan('dev'));

//routes

app.use('/auth', authRoutes);


app.use('/events',eventRouter);



app.get('/', (req, res) => {
    res.send('Hello World!');
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


