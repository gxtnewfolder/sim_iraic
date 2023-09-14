const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://mqtt-dashboard.com:1883');

const connectMQTT = async () => {
    try {
        await client.on('connect', () => {
            console.log('MQTT client connected');
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectMQTT;