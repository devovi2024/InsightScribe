import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10  ">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Ovi's Here</h1>
      <p className="text-lg text-gray-700 mb-6">Go to Dashboard</p>
      <Link
        to="/dashboard"
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        🚀 Dashboard
      </Link>
    </div>
  );
};

export default Home;
