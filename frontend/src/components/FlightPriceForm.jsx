import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlightPriceForm = () => {
  const [formData, setFormData] = useState({
    Dep_Time: "",
    Arrival_Time: "",
    Source: "Delhi",
    Destination: "Cochin",
    stops: "0",
    airline: "Jet Airways",
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const depTime = new Date(formData.Dep_Time);
    const arrivalTime = new Date(formData.Arrival_Time);
    const currentTime = new Date();

    if (depTime > currentTime && arrivalTime < currentTime) {
      toast.error("Departure date is in the future and arrival date is in the past!");
      return;
    }

    if (arrivalTime < depTime) {
      toast.error("Arrival date cannot be before departure date!");
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${API_URL}/api/predict`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setPrediction(response.data.prediction_text);
    } catch (error) {
      console.error("Error submitting the form:", error.response?.data || error.message);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="absolute inset-0 bg-cover bg-center bg-opacity-50" style={{ backgroundImage: "url('https://w0.peakpx.com/wallpaper/894/165/HD-wallpaper-airplane-flying-over-beach-shore-sunset-airplane-planes-sunset-beach-shore-graphy.jpg')" }}></div>

      {/* Form */}
      <div className="container mx-auto mt-10 max-w-2xl lg:max-w-4xl bg-white bg-opacity-90 shadow-xl rounded-2xl p-10 z-10 relative">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-semibold mb-2">Departure Date</label>
              <input
                type="datetime-local"
                name="Dep_Time"
                value={formData.Dep_Time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Arrival Date</label>
              <input
                type="datetime-local"
                name="Arrival_Time"
                value={formData.Arrival_Time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Source 📍</label>
              <select
                name="Source"
                value={formData.Source}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="Delhi">Delhi</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Destination 📍</label>
              <select
                name="Destination"
                value={formData.Destination}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="Cochin">Cochin</option>
                <option value="Delhi">Delhi</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Stoppage</label>
              <select
                name="stops"
                value={formData.stops}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="0">Non-Stop</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Airline</label>
              <select
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="Jet Airways">Jet Airways</option>
                <option value="IndiGo">IndiGo</option>
                <option value="Air India">Air India</option>
                <option value="Multiple carriers">Multiple carriers</option>
                <option value="SpiceJet">SpiceJet</option>
                <option value="Vistara">Vistara</option>
                <option value="Air Asia">Air Asia</option>
                <option value="GoAir">GoAir</option>
                <option value="Multiple carriers Premium economy">Multiple carriers Premium economy</option>
                <option value="Jet Airways Business">Jet Airways Business</option>
                <option value="Vistara Premium economy">Vistara Premium economy</option>
                <option value="Trujet">Trujet</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white p-4 px-8 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Predict
            </button>
          </div>
        </form>

        {prediction && (
          <div className="mt-8 p-4 bg-green-50 text-green-800 border border-green-300 rounded-lg">
            <h3>{prediction}</h3>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default FlightPriceForm;
