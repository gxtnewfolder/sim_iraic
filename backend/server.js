const express = require('express');
const logger = require('morgan');
const mqtt = require('mqtt');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use(logger('dev'));

mongoose.Promise = global.Promise;

const mongoURI = 'mongodb://admin:1234@ac-cezqnun-shard-00-00.cooyb5m.mongodb.net:27017,ac-cezqnun-shard-00-01.cooyb5m.mongodb.net:27017,ac-cezqnun-shard-00-02.cooyb5m.mongodb.net:27017/?replicaSet=atlas-c59v5h-shard-0&ssl=true&authSource=admin';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('DB connected successfully!'))
        .catch((err) => console.error(err));

// Create a schema Name of location and location
const dataSchema = new mongoose.Schema({
    name: String,
    location: String,
    timestamp: { type: Date, default: Date.now}
});
        
const Seed = mongoose.model('Data', dataSchema);

// Get all data
app.get('/', (req, res) => {
    Seed.find()
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((error)=>{
            res.status(500).json(error)    
        })
});

// Post data to database
app.post('/', (req, res) => {
    Seed.create(req.body)
        .then((result)=>{
            res.status(201).json(result);
        })
        .catch((error)=>{
            res.status(500).json(error)    
        })
});


const mqttClient = mqtt.connect('mqtt://mqtt-dashboard.com:1883');

mqttClient.on('connect', () => {
    console.log('MQTT client connected');
    mqttClient.subscribe('test/kmutt/iot');
});

app.use((req, res, next) => {
    req.mqttClient = mqttClient;
    next();
});


// app.post('/mqtt-message', (req, res) => {
//     const { data } = req.body;

//     const newData = new Data({ data });

//     newData.save((err, savedData) => {
//         if (err) {
//             console.log(`Error while saving to DB: ${err.message}`);
//             res.status(500).json({ error: err.message });
//         } else {
//             console.log(`Data saved to DB: ${savedData}`);
//             res.status(200).json({ message: 'Data saved successfully' });
//         }
//     });
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
