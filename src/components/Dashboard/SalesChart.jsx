import { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const SalesChart = () => {
  const { authFetch } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesChartData = async () => {
      try {
        const response = await authFetch("/api/admin/dashboard/sales_data", {
          method: "GET",
        });
        if (!response.ok) throw new Error("Gagal mengambil data Grafik Penjualan");
        const chartData = await response.json();
        setData(chartData);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan saat mengambil data Grafik Penjualan");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesChartData();
  }, [authFetch]);

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500">Memuat Grafik Penjualan...</div>
    );

  return (
    <div>
      <h2 className="text-xl bg-pink-200 inline-block p-2 px-5 rounded-lg font-bold mb-4">Grafik Penjualan</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 50 }}
        >
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
          />
          <Tooltip
            formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="Sales"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
