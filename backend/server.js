const express = require('express');
const mqtt = require('mqtt');
const mongoose = require('mongoose');

const path = require('path');
const app = express();

const port = process.env.PORT || 3001;

const mongoURI = 'mongodb+srv://admin:1234@cluster0.cooyb5m.mongodb.net/?retryWrites=true&w=majority';
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
  mqttClient.subscribe('test/kmutt/iot');
});

mqttClient.on('message', (topic, message) => {
  const data = message.toString();
  console.log('Received MQTT message: ' + data);

  const newData = new Data({ data });

  newData.save((err, savedData) => {
    if (err) {
      console.log(`Error while saving to DB: ${err.message}`);
    } else {
      console.log(`Data saved to DB: ${savedData}`);
    }
  });
});

app.use((req, res, next) => {
  req.mqttClient = mqttClient;
  next();
});

app.post('mqtt-message', (req, res) => {
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
  

// app.use(express.static(path.join(__dirname, 'images')));


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
