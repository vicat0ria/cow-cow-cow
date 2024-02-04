# Dependencies: Flask, Numpy, Pandas
from flask import Flask,render_template, request, jsonify
import pandas as pd

# creating a dataframe for easier data storage
user_data = pd.DataFrame({
    "username": ["test"],
    "userX": [0],
    "userY": [0],
    "targetX": [0],
    "targetY": [0]
})

# initializing Flask
app = Flask(__name__,template_folder="templates", static_url_path='/static')

# rendering the index page template
@app.route("/") 
def index(): 
    return render_template('index.html') 

# setting up a function to grab coordinates
@app.route('/receive_value', methods=['POST'])
def receive_value():
    # get request called by the JS script 
    try:
        data = request.get_json()
        # fill in the dataframe
        for i in data:
            user_data[i] = data[i]
        # saves only current user progress into the CSV
        csv_line = user_data.loc[user_data['username'] == "test"]
        # converting dataframe into CSV
        csv_line.to_csv("user_data.csv", index=False)
        return data 
    except Exception as e:
        result = {'status': 'error', 'message': str(e)}
        return jsonify(result), 500
    

if __name__ == '__main__': 
    app.run(debug=True) 
