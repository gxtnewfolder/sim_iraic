const mqtt = require('mqtt');
const fs = require('fs');

const client = mqtt.connect('mqtt://mqtt-dashboard.com:1883');

const connectMQTT = async () => {
    try {
        await client.on('connect', () => {
            console.log('MQTT client connected');
            client.subscribe('sim/kmutt/iot/image'); // Subscribe to the image topic
        });
    } catch (err) {
        console.log(err);
    }
}

client.on('message', (topic, message) => {
    console.log('Message received on topic ' + topic);

    if (topic === 'sim/kmutt/iot/image') {
        // Assuming `message` contains the received base64-encoded image data
        const base64Image = message.toString();

        // Decode the base64 image data to a Buffer
        const imageBuffer = Buffer.from(base64Image, 'base64');

        // You can now process or save the image data as needed
        // For example, save it as an image file:
        const timestamp = Date.now();
        const filename = `uploads/SIM-${timestamp}.jpg`;
        fs.writeFileSync(filename, imageBuffer);
        console.log(`Image saved as ${filename}`);
    }
});

module.exports = connectMQTT;
