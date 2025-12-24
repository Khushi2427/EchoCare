import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/analytics/users-per-day`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // transform backend data
        const formatted = res.data.map((item) => ({
          date: item._id,
          users: item.count,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Analytics error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">📊 User Analytics</h1>
      <p className="text-gray-600 mb-6">
        Number of users registered per day
      </p>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {loading && <p>Loading analytics...</p>}

        {!loading && data.length === 0 && (
          <p className="text-gray-500">No data available</p>
        )}

        {!loading && data.length > 0 && (
          <>
            {/* Chart */}
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Summary */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Days</p>
                <p className="text-xl font-bold">{data.length}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-xl font-bold">
                  {data.reduce((sum, d) => sum + d.users, 0)}
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Max in a Day</p>
                <p className="text-xl font-bold">
                  {Math.max(...data.map((d) => d.users))}
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Latest Day</p>
                <p className="text-xl font-bold">
                  {data[data.length - 1]?.users}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
