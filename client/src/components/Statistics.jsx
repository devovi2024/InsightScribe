import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const Statistics = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:2800/api/posts")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setPosts(data);

        // Count categories
        const counts = data.reduce((acc, post) => {
          const categoryName = post.category?.name || "Uncategorized";
          acc[categoryName] = (acc[categoryName] || 0) + 1;
          return acc;
        }, {});
        setCategoryCounts(counts);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p>{error}</p>;

  // Pie Chart Data
  const pieData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
  // Bubble Chart Data
  const bubbleData = pieData.map((item, index) => ({ x: index + 1, y: item.value, z: item.value * 5 }));

  // Waterfall Chart Data
  const waterfallData = Object.entries(categoryCounts).reduce((acc, [name, value], index) => {
    const prevValue = acc.length ? acc[acc.length - 1].total : 0;
    acc.push({ name, value, total: prevValue + value });
    return acc;
  }, []);

  // Doughnut Chart Data
  const doughnutData = {
    labels: pieData.map((item) => item.name),
    datasets: [
      {
        data: pieData.map((item) => item.value),
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
      },
    ],
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      {/* Waterfall Chart */}
      <h2 className="mt-10 text-2xl font-bold text-gray-800">📊 Waterfall Chart</h2>
      <div className="flex justify-center mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={waterfallData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Doughnut Chart */}
      <h2 className="mt-10 text-2xl font-bold text-gray-800">🍩 Doughnut Chart</h2>
      <div className="flex justify-center">
        <div style={{ width: "300px", height: "300px" }}>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Bubble Chart */}
      <h2 className="mt-10 text-2xl font-bold text-gray-800">Bubble Chart</h2>
      <div className="flex justify-center mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis dataKey="x" name="Index" />
            <YAxis dataKey="y" name="Value" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Bubble" data={bubbleData} fill="#FF8042" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
