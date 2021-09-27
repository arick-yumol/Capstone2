const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

mongoose.connect('mongodb+srv://admin:admin@zuitt-bootcamp.brw90.mongodb.net/Batch127_Capstone2?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(process.env.PORT || 4001, () => {
	console.log(`API is now online on port ${process.env.PORT || 4001}. `)
});