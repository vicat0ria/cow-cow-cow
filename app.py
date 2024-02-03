# Dependencies: Flask, Numpy, Pandas
from flask import Flask,render_template, request 
import pandas as pd
import numpy as np

app = Flask(__name__,template_folder="templates", static_url_path='/static') 
@app.route("/") 
def index(): 
    return render_template('index.html') 

@app.route('/receive_value', methods=['POST'])
def receive_value():
    data = request.get_json()
    paragraph_value = data['value']
    # Now you can use the paragraph_value in your Flask server
    print(f'Received value from client: {paragraph_value}')
    return 'Value received successfully'

if __name__ == '__main__': 
    app.run(debug=True) 

