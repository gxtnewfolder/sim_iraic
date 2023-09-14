const mqtt = require('mqtt');

// MQTT client
const client = mqtt.connect('mqtt://mqtt-dashboard.com:1883');

// Callback when the client is connected
client.on('connect', () => {
    console.log('MQTT client connected');
    // Subscribe to the topic 'test'
    client.subscribe('sim/kmutt/iot');
});

// Callback when a message is received
client.on('message', (topic, message) => {
    console.log('Message received: ' + message.toString());
});