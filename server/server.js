const express = require('express');
const path = require('path');

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const connectMQTT = require('./config/mqtt');

const { readdirSync } = require('fs');
// const product = require('./routes/product'); // Imports routes for the products
// const auth = require('./routes/auth'); // Imports routes for the auth
const app = express();
const port = 8000;

// Connect to database
connectDB();

// MQTT
connectMQTT();


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.use(express.static(path.join(__dirname, 'uploads')));

// Routes 1
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// Routes 2
// app.use('/api', product);
// app.use('/api', auth);

// Routes 3
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

app.listen(port, () => {
  console.log(`Server starting on port ${port}!`);
});