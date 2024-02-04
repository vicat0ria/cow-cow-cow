import pandas as pd
import requests
from apscheduler.schedulers.background import BackgroundScheduler


user_data = pd.DataFrame({
    "username": ["test"],
    "userX": [0],
    "userY": [0],
    "targetX": [0],
    "targetY": [0]
})

leaderboard = {}

url = 'http://127.0.0.1:5000/get_coords'


# def update_coords():
#     try:
#         response = requests.get(url)
#         response.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)

#         json_data = response.json()

#         # Now you can access the stored data
#         status = json_data.get('status', '')
#         data = json_data.get('data', {})

#         if status != 'success':
#             print('Error:', json_data.get('message', ''))

#     except requests.exceptions.RequestException as e:
#         print(f"Error: {e}")


for i in data:
    user_data[i] = data[i]

print(user_data)

scheduler = BackgroundScheduler()
scheduler.add_job(func=update_coords, trigger="interval", seconds=1)
scheduler.start()