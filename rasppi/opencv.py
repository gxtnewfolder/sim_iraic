import cv2

# Initialize the webcam
cap = cv2.VideoCapture(0)  # 0 indicates the default camera (usually the built-in webcam)

while True:
    if not cap.isOpened():
        print("Error: Could not open the webcam.")
        break