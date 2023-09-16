import requests
import json

url = 'http://localhost:8000/api/mqtt-message'  # Replace with your server URL
files = {'file': open('backend/images/captured_image.jpg', 'rb')}  # Replace with the actual file path
headers = {'Content-Type': 'application/json'}

data = {
    "name": "SIM",
    "location": "Rasppi"
}

response = requests.post(url, data=json(data), files=files, headers=headers)

if response.status_code == 200:
    print('Data sent successfully to server')
else:
    print('Error sending data to server')