import os
from flask import Flask, request, jsonify
from PIL import Image
import torchvision.transforms.functional as TF
import CNN
import numpy as np
import torch
import pandas as pd
from flask_cors import CORS


disease_info = pd.read_csv('disease_info.csv', encoding='cp1252')
supplement_info = pd.read_csv('supplement_info.csv', encoding='cp1252')


model = CNN.CNN(39)    
model.load_state_dict(torch.load("plant_disease_model_1_latest.pt"))
model.eval()

def prediction(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image)
    input_data = input_data.view((-1, 3, 224, 224))
    output = model(input_data)
    output = output.detach().numpy()
    return np.argmax(output)

app = Flask(__name__)
CORS(app)  

@app.route('/submit', methods=['POST'])
def submit():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
        
    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    try:
        
        filename = image.filename
        file_path = os.path.join('static/uploads', filename)
        image.save(file_path)
        
        
        pred = prediction(file_path)
        
        
        return jsonify({
            "title": str(disease_info['disease_name'][pred]),
            "description": str(disease_info['description'][pred]),
            "prevent": str(disease_info['Possible Steps'][pred]),
            "image_url": str(disease_info['image_url'][pred]),
            "pred": int(pred),
            "supplement_name": str(supplement_info['supplement name'][pred]),
            "supplement_image_url": str(supplement_info['supplement image'][pred]),
            "supplement_buy_link": str(supplement_info['buy link'][pred]),
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    os.makedirs('static/uploads', exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)