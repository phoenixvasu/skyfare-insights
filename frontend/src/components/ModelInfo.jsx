import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const modelPerformance = [
  { model: "Random Forest", r2: 0.81 },
  { model: "Decision Tree", r2: 0.72 },
  { model: "Linear Regression", r2: 0.61 },
  { model: "SVR", r2: -0.00041 },
];

const datasetColumns = [
  {
    name: "Airline",
    role: "Categorical",
    description:
      "Represents the airline operating the flight, influencing ticket pricing.",
  },
  {
    name: "Date_of_Journey",
    role: "Date",
    description:
      "Travel date affects pricing due to seasonal demands and trends.",
  },
  {
    name: "Source",
    role: "Categorical",
    description:
      "Departure city directly impacts flight prices based on demand.",
  },
  {
    name: "Destination",
    role: "Categorical",
    description:
      "Arrival city influences ticket cost depending on its popularity.",
  },
  {
    name: "Route",
    role: "Text",
    description:
      "Flight route and stopovers can significantly impact pricing.",
  },
  {
    name: "Dep_Time",
    role: "Time",
    description:
      "Departure time affects prices, with peak-hour flights being expensive.",
  },
  {
    name: "Arrival_Time",
    role: "Time",
    description:
      "Flights arriving at inconvenient hours might offer cheaper fares.",
  },
  {
    name: "Duration",
    role: "Numerical",
    description:
      "Longer flight durations generally reduce the ticket cost compared to non-stop flights.",
  },
  {
    name: "Total_Stops",
    role: "Numerical",
    description:
      "More stopovers often reduce ticket prices while increasing travel time.",
  },
  {
    name: "Additional_Info",
    role: "Text",
    description:
      "Contains supplementary flight details like baggage allowance and in-flight amenities.",
  },
  {
    name: "Price",
    role: "Numerical (Target Variable)",
    description:
      "Flight ticket price to be predicted using other variables.",
  },
];

const ModelInfo = ({ goBack }) => {
  return (
    <div className="p-8 bg-white min-h-screen text-gray-900 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Model Insights & Performance</h1>

      {/* Chart Section */}
      <div className="bg-blue-50 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Model Comparison (R² Score)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={modelPerformance}>
            <XAxis dataKey="model" stroke="#333" />
            <YAxis stroke="#333" domain={[-0.1, 1]} />
            <Tooltip cursor={{ fill: "#ddd" }} contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }} />
            <Bar dataKey="r2" fill="#007bff" name="R² Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Why Random Forest? */}
      <div className="bg-blue-50 p-8 rounded-lg shadow-lg w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Why Choose Random Forest?</h2>
        <p className="text-gray-700">
          Random Forest stands out for its robust performance. By combining multiple decision trees, it enhances accuracy and reduces the risk of overfitting. It handles categorical data, missing values, and outliers effectively — making it a reliable choice for flight price prediction.
        </p>
      </div>

      {/* Dataset Information Table */}
      <div className="bg-blue-50 p-8 rounded-lg shadow-lg w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dataset Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="border border-gray-300 px-4 py-2">Column Name</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {datasetColumns.map((col, index) => (
                <tr key={index} className="bg-white text-gray-700">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">{col.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{col.role}</td>
                  <td className="border border-gray-300 px-4 py-2">{col.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hyperparameter Tuning section */}
      <div className="bg-blue-50 p-8 rounded-lg shadow-lg w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Hyperparameter Tuning</h2>
        <p className="text-gray-700">
          To optimize the model, key hyperparameters were fine-tuned, resulting in better accuracy:
        </p>
        <ul className="list-disc ml-8 text-gray-700 mt-4">
          <li><strong>n_estimators:</strong> Adjusted to increase stability and accuracy.</li>
          <li><strong>max_depth:</strong> Limited to avoid overfitting.</li>
          <li><strong>min_samples_split:</strong> Set to ensure better generalization.</li>
          <li><strong>min_samples_leaf:</strong> Prevented overfitting by ensuring larger leaf nodes.</li>
        </ul>
        <p className="mt-6 text-gray-700">
          Before tuning, the R² Score was <strong>0.7975</strong>. After tuning, it improved to <strong>0.8134</strong>.
        </p>
      </div>

      {/* Back Button */}
      <button onClick={goBack} className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
        Return to Home
      </button>
    </div>
  );
};

ModelInfo.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default ModelInfo;
