const express = require('express');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const connectMQTT = require('./config/mqtt');
// const product = require('./routes/product'); // Imports routes for the products
// const auth = require('./routes/auth'); // Imports routes for the auth
const app = express();

// Connect to database
connectDB();

// MQTT
connectMQTT();


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Routes 1
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// Routes 2
// app.use('/api', product);
// app.use('/api', auth);

// Routes 3
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

app.listen(8000, () => {
  console.log('Server starting on port 8000');
});