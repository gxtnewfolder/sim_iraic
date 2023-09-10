import os
from ultralytics import YOLO
import cv2
import time

# Initialize camera feed
cap = cv2.VideoCapture(0)  # Use camera feed (index 0)

# Load YOLO model
model_path = os.path.join('.', 'runs', 'detect', 'train16', 'weights', 'last.pt')
model = YOLO(model_path)  # Load the YOLO model

threshold = 0.8

# Initialize variables for tracking time and rickshaw count
start_time = time.time()
rickshaw_count = 0
rickshaw_detected = False

while True:

    # Read frame from camera feed
    ret, frame = cap.read()

    if not ret:
        break

    # Perform object detection using YOLO
    results = model(frame, verbose=False)[0]

    # Update the timer regardless of whether a rickshaw is detected
    current_time = time.time()
    if current_time - start_time >= 5:  # Send count every 5 seconds
        if rickshaw_detected:
            print(f"Rickshaws detected in the last 5 seconds: {rickshaw_count}")
        else:
            print("No rickshaws detected in the last 5 seconds.")
        rickshaw_count = 0
        start_time = current_time  # Reset the timer
        rickshaw_detected = False

    for result in results.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = result

        if score > threshold and results.names[int(class_id)].lower() == 'rickshaw':
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)
            class_name = results.names[int(class_id)].upper()
            text = f'{class_name} ({score:.2f})'  # Display class name and score
            cv2.putText(frame, text, (int(x1), int(y1 - 10)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)

            # Increment the rickshaw count and set rickshaw_detected to True
            rickshaw_count += 1
            rickshaw_detected = True

    # Display the annotated frame in real-time
    cv2.imshow('Real-time Object Detection', frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Clean up
cap.release()
cv2.destroyAllWindows()
