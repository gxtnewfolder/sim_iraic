const express = require('express');
const mqtt = require('mqtt');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const mongoURI = 'mongodb://admin:1234@ac-cezqnun-shard-00-00.cooyb5m.mongodb.net:27017,ac-cezqnun-shard-00-01.cooyb5m.mongodb.net:27017,ac-cezqnun-shard-00-02.cooyb5m.mongodb.net:27017/?replicaSet=atlas-c59v5h-shard-0&ssl=true&authSource=admin';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`Error while connecting to DB: ${err.message}`);
});

db.once('open', () => {
    console.log('DB connected successfully!');
});

const dataSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    data: String
});

const Data = mongoose.model('Data', dataSchema);

const mqttClient = mqtt.connect('mqtt://mqtt-dashboard.com:1883');

mqttClient.on('connect', () => {
    console.log('MQTT client connected');
    mqttClient.subscribe('simkmutt/iot');
});

app.use((req, res, next) => {
    req.mqttClient = mqttClient;
    next();
});

app.post('/mqtt-message', (req, res) => {
    const { data } = req.body;

    const newData = new Data({ data });

    newData.save((err, savedData) => {
        if (err) {
            console.log(`Error while saving to DB: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            console.log(`Data saved to DB: ${savedData}`);
            res.status(200).json({ message: 'Data saved successfully' });
        }
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


