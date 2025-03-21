import { useRef, useState } from "react";
import FlightPriceForm from "./FlightPriceForm";
import Footer from "./Footer";
import Header from "./Header";
import ModelInfo from "./ModelInfo";

const Home = () => {
  const formRef = useRef(null);
  const [showModelInfo, setShowModelInfo] = useState(false);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {showModelInfo ? (
        <ModelInfo goBack={() => setShowModelInfo(false)} />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 flex flex-col text-white">
          {/* Navbar */}
          <Header scrollToForm={scrollToForm} showModelInfo={() => setShowModelInfo(true)} />

          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-center justify-center px-10 py-20">
            {/* Left Content */}
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-5xl font-extrabold leading-tight">
                Predict Flight Prices and Save Big!
              </h1>
              <p className="text-lg text-gray-200">
                Get the best flight deals using AI-powered predictions. Make your travel budget-friendly.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={scrollToForm}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                  Predict Now
                </button>
                <button
                  onClick={() => setShowModelInfo(true)}
                  className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-200"
                >
                  How it Works
                </button>
              </div>
            </div>

            {/* Right Content - Airplane Image */}
            <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/1017/525/123/the-sky-aviation-the-plane-background-wallpaper-preview.jpg"
                alt="Airplane"
                className="rounded-2xl shadow-xl w-full max-w-md"
              />
            </div>
          </section>

          {/* Form Section */}
          <section ref={formRef} className="py-20 bg-white text-gray-900">
            <div className="max-w-4xl mx-auto p-10 rounded-3xl shadow-xl">
              <h2 className="text-4xl font-bold text-center mb-8">Flight Price Prediction Form</h2>
              <FlightPriceForm />
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
