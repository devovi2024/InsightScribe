import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Error:", e);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Ovi's Here</h1>
      <p className="text-lg text-gray-700 mb-6">Go to Dashboard</p>
      <Link
        to="/dashboard"
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        🚀 Dashboard
      </Link>

      {/* ✅ Google Ad Section */}
      <div className="mt-8">
        <p className="text-gray-500 text-sm mb-2">Sponsored Ads</p>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx" 
          data-ad-slot="xxxxxxxxxx" 
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default Home;
