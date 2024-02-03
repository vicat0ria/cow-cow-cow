# Dependencies: Flask, Numpy, Pandas
from flask import Flask,render_template, request 
import pandas as pd
import numpy as np

app = Flask(__name__,template_folder="templates") 
@app.route("/") 
def hello(): 
    return render_template('index.html') 

@app.route('/process-data', methods=['POST']) 
def process_data(): 
    data = request.json['data'] 
    result = sum(data) 
    return jsonify({'result': result}) 
  
if __name__ == '__main__': 
    app.run(debug=True) 