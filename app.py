# Dependencies: Flask, Numpy, Pandas
from flask import Flask,render_template, request, jsonify
import pandas as pd


user_data = pd.DataFrame({
    "username": ["test"],
    "userX": [0],
    "userY": [0],
    "targetX": [0],
    "targetY": [0]
})


app = Flask(__name__,template_folder="templates", static_url_path='/static') 
@app.route("/") 
def index(): 
    return render_template('index.html') 

@app.route('/receive_value', methods=['POST'])
def receive_value():
    try:
        data = request.get_json()
        for i in data:
            user_data[i] = data[i]
        csv_line = user_data.loc[user_data['username'] == "test"]
        print(csv_line)
        csv_line.to_csv("user_data.csv", index=False)
        return data 
    except Exception as e:
        result = {'status': 'error', 'message': str(e)}
        return jsonify(result), 500
    

# @app.route('/get_coords', methods=['GET'])
# def get_coords():
#     try:
#         global stored_data
#         result = {'status': 'success', 'data': stored_data}
#         print(stored_data)
#         return jsonify(result)

#     except Exception as e:
#         result = {'status': 'error', 'message': str(e)}
#         return jsonify(result), 500


if __name__ == '__main__': 
    app.run(debug=True) 
