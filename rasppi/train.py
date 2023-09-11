from ultralytics import YOLO

model = YOLO("yolov8s.pt")  # load a custom model

results = model.train(data="config.yaml", epochs=3)  # train the model