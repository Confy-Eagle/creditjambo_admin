import { useEffect, useState } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDevices() {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/devices", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDevices(res.data);
      } catch (err) {
        console.error("Fetch devices error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDevices();
  }, []);

  const handleVerify = async (id, verified) => {
    const token = localStorage.getItem("token");
    try {
     await api.put(
       `/devices/${id}/verify`,
       { verified: !verified ? 1 : 0 },
       { headers: { Authorization: `Bearer ${token}` } }
     );

      setDevices((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, verified: !verified } : d
        )
      );
    } catch (err) {
      console.error("Verification update failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this device?")) return;
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/devices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDevices((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Delete device failed", err);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Devices</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Device ID</th>
                <th className="p-3 text-left">Info</th>
                <th className="p-3 text-left">Verified</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{d.device_id}</td>
                  <td className="p-3">{d.device_info}</td>
                  <td className="p-3">
                    {d.verified ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="p-3">{new Date(d.created_at).toLocaleString()}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleVerify(d.id, d.verified)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      {d.verified ? "Unverify" : "Verify"}
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
