import { useEffect, useState } from "react";
import api from "../api/api";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const statsRes = await api.get("/dashboard");
      setStats(statsRes.data);

      const txRes = await api.get("/transactions");
      setTransactions(txRes.data.slice(0, 10)); // last 10
    }
    fetchData();
  }, []);

  const deviceData = [
    { name: "Verified", value: stats.verified_devices || 0 },
    { name: "Pending", value: (stats.total_devices || 0) - (stats.verified_devices || 0) },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Users" value={stats.total_users} color="blue" />
        <Card title="Devices" value={stats.total_devices} color="green" />
        <Card title="Transactions" value={stats.total_transactions} color="purple" />
        <Card title="Total Balance" value={`$${stats.total_balance?.toLocaleString()}`} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Devices Chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Device Verification Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deviceData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                <Cell fill="#4ade80" />
                <Cell fill="#f97316" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions Chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Transactions</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="created_at" tickFormatter={(v) => v.split("T")[0]} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700 border-blue-400",
    green: "bg-green-100 text-green-700 border-green-400",
    purple: "bg-purple-100 text-purple-700 border-purple-400",
    orange: "bg-orange-100 text-orange-700 border-orange-400",
  };
  return (
    <div className={`p-4 border-l-4 rounded-xl ${colors[color]} shadow-sm`}>
      <p className="text-sm uppercase font-medium">{title}</p>
      <h3 className="text-2xl font-bold">{value || 0}</h3>
    </div>
  );
}
