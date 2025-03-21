from flask import Flask, request, render_template, jsonify
from flask_cors import cross_origin, CORS
from dotenv import load_dotenv
import os
import sklearn
import pickle
import pandas as pd

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)
import os
import pickle

model_path = os.path.join(os.path.dirname(__file__), 'flight_price_prediction_model.pkl')

if not os.path.isfile(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}")

model = pickle.load(open(model_path, "rb"))


@app.route("/")
@cross_origin()
def home():
    return jsonify({'msg':'this is home page'})

@app.route("/api/predict", methods=["POST"])
@cross_origin()
def predict():
    if request.method == "POST":
        # Check the Content-Type header
        if request.content_type == "application/json":
            data = request.json
        else:
            data = request.form

        try:
            # Extract and process input data
            date_dep = data["Dep_Time"]
            Journey_day = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").day)
            Journey_month = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").month)

            # Departure
            Dep_hour = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").hour)
            Dep_min = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").minute)

            # Arrival
            date_arr = data["Arrival_Time"]
            Arrival_hour = int(pd.to_datetime(date_arr, format="%Y-%m-%dT%H:%M").hour)
            Arrival_min = int(pd.to_datetime(date_arr, format="%Y-%m-%dT%H:%M").minute)

            # Duration
            dur_hour = abs(Arrival_hour - Dep_hour)
            dur_min = abs(Arrival_min - Dep_min)

            # Total Stops
            Total_stops = int(data["stops"])

            # Airline Encoding
            airline = data['airline']
            Jet_Airways, IndiGo, Air_India, Multiple_carriers, SpiceJet, Vistara, GoAir, \
            Multiple_carriers_Premium_economy, Jet_Airways_Business, Vistara_Premium_economy, Trujet = \
                [0] * 11

            match airline:
                case 'Jet Airways':
                    Jet_Airways = 1
                case 'IndiGo':
                    IndiGo = 1
                case 'Air India':
                    Air_India = 1
                case 'Multiple carriers':
                    Multiple_carriers = 1
                case 'SpiceJet':
                    SpiceJet = 1
                case 'Vistara':
                    Vistara = 1
                case 'GoAir':
                    GoAir = 1
                case 'Multiple carriers Premium economy':
                    Multiple_carriers_Premium_economy = 1
                case 'Jet Airways Business':
                    Jet_Airways_Business = 1
                case 'Vistara Premium economy':
                    Vistara_Premium_economy = 1
                case 'Trujet':
                    Trujet = 1

            # Source Encoding
            Source = data["Source"]
            s_Delhi, s_Kolkata, s_Mumbai, s_Chennai = [0] * 4
            match Source:
                case 'Delhi':
                    s_Delhi = 1
                case 'Kolkata':
                    s_Kolkata = 1
                case 'Mumbai':
                    s_Mumbai = 1
                case 'Chennai':
                    s_Chennai = 1

            # Destination Encoding
            Destination = data["Destination"]
            d_Cochin, d_Delhi, d_New_Delhi, d_Hyderabad, d_Kolkata = [0] * 5
            match Destination:
                case 'Cochin':
                    d_Cochin = 1
                case 'Delhi':
                    d_Delhi = 1
                case 'New Delhi':
                    d_New_Delhi = 1
                case 'Hyderabad':
                    d_Hyderabad = 1
                case 'Kolkata':
                    d_Kolkata = 1

            # Create model input
            inputs = [
                Total_stops, Journey_day, Journey_month, Dep_hour, Dep_min, Arrival_hour, Arrival_min,
                dur_hour, dur_min, s_Chennai, s_Delhi, s_Kolkata, s_Mumbai, d_Cochin, d_Delhi,
                d_Hyderabad, d_Kolkata, d_New_Delhi, Jet_Airways, IndiGo, Air_India, Multiple_carriers,
                SpiceJet, Vistara, GoAir, Multiple_carriers_Premium_economy, Jet_Airways_Business,
                Vistara_Premium_economy, Trujet
            ]

            # Predict and return result
            prediction = model.predict([inputs])
            return jsonify({"prediction_text": f"Predicted flight price is {round(prediction[0],2)}"})

        except Exception as e:
            return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
