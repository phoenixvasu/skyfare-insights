import PropTypes from "prop-types";

const Header = ({ scrollToForm, showModelInfo }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 flex justify-between items-center shadow-lg rounded-b-lg">
      <h1 className="text-3xl font-extrabold">SkyFare Insights ✈️</h1>
      
      <div className="flex gap-6">
        <button
          onClick={scrollToForm}
          className="bg-white text-blue-600 px-5 py-2 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Predict Fare
        </button>

        <button
          onClick={showModelInfo}
          className="bg-white text-blue-600 px-5 py-2 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Learn About Model
        </button>
      </div>
    </nav>
  );
};

Header.propTypes = {
  scrollToForm: PropTypes.func.isRequired,
  showModelInfo: PropTypes.func.isRequired,
};

export default Header;
