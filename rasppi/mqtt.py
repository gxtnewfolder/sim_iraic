import paho.mqtt.client as mqtt

# Call back when client connects to the broker
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

# Create an MQTT client instance
client = mqtt.Client()

# Set the callback functions
client.on_connect = on_connect

# Connect to the broker
client.connect("mqtt-dashboard.com", 1883, 60)

# Publish a message
a = input("Enter your message: ")
if a == "Hello":
    client.publish("test/kmutt/iot", "Hello World!")

# keep the client running to process callbacks and messages
client.loop_forever()