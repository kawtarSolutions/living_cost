from flask import Flask, jsonify, request
from flask_cors import CORS
from main import main
from model import knn_rank

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/city/<city_name>", methods=["GET"])
def get_city_data(city_name):
    result = main(city_name)
    return jsonify(result)


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    
    user_preferences = {
        "salary": float(data["salary"]),
        "location": data["location"],
        "housing_type": data["housing_type"],
        "transport_type": data["transport_type"],
        "gas_liters": int(data["gas_liters"]),
        "cheap_visits": int(data["cheap_visits"]),
        "mid_visits": int(data["mid_visits"]),
        "fast_food_visits": int(data["fast_food_visits"]),
        "go_gym": data["go_gym"] == True or data["go_gym"] == "true",
        "play_tennis": data["play_tennis"] == True or data["play_tennis"] == "true",
        "tennis_frequency": int(data["tennis_frequency"]),
        "go_cinema": data["go_cinema"] == True or data["go_cinema"] == "true",
        "cinema_visits": int(data["cinema_visits"]),
    }
    
    result = knn_rank(user_preferences)
    
    if result is None or result.empty:
        return jsonify({"error": "No cities found for your budget and preferences"}), 404
    
    return jsonify(result.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True, port=5000)