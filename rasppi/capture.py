import cv2
import os

def capture_image(output_directory):
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Initialize the webcam
    cap = cv2.VideoCapture(0)  # 0 indicates the default camera (usually the built-in webcam)

    if not cap.isOpened():
        print("Error: Could not open the webcam.")
        return

    # Capture a single frame
    ret, frame = cap.read()
    # brightness = cv2.convertScaleAbs(frame, alpha=5, beta=10)
    resize = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)  # Resize the image to half its original size

    if not ret:
        print("Error: Could not capture a frame.")
        return

    # Save the captured frame as an image in the specified directory
    image_path = os.path.join(output_directory, "captured_image.jpg")
    cv2.imwrite(image_path, resize)

    print(f"Image captured and saved to {image_path}")

    # Release the webcam
    cap.release()

if __name__ == "__main__":
    output_directory = "backend/images"  # Change this to your desired output directory
    capture_image(output_directory)