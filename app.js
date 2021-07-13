require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();



console.log(process.env.DATABASE);
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})
.then(()=> console.log("mongodb connected..."))
.catch((err)=> console.log(err))

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY ROUTES
app.use('/api', authRoutes );
app.use('/api', userRoutes );
app.use('/api', categoryRoutes);
app.use('/api',productRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> {
    console.log(`app running on ${PORT}`);
})

