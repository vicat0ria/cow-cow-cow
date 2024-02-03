# Dependencies: Flask, Numpy, Pandas
from flask import Flask,render_template, request 
import pandas as pd
import numpy as np

app = Flask(__name__,template_folder="templates") 
@app.route("/") 
def hello(): 
    return render_template('index.html') 

@app.route('/static', methods=['POST']) 
def get_coords(): 
    data = request.json['userLocation'] 
    print(data)
    return data 
  
if __name__ == '__main__': 
    app.run(debug=True) 

    get_coords()