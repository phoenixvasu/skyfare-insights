const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center p-8 mt-10 shadow-xl rounded-t-lg">
      <p className="text-xl font-bold mb-4">✈️ Plan Smart, Fly Smart!</p>
      <p className="text-sm mb-6">&copy; 2025 Flight Price Prediction. All rights reserved.</p>
      <div className="flex justify-center gap-8 text-sm">
        <a href="#" className="hover:text-gray-200 transition">Privacy Policy</a>
        <a href="#" className="hover:text-gray-200 transition">Terms of Service</a>
        <a href="#" className="hover:text-gray-200 transition">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
