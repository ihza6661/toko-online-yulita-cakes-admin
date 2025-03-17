import { useState, useEffect, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const OrdersChart = () => {
  const { authFetch } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersChartData = async () => {
      try {
        const response = await authFetch("/api/admin/dashboard/orders_data", {
          method: "GET",
        });
        if (!response.ok) throw new Error("Gagal mengambil data Statistik Pesanan");
        const chartData = await response.json();
        setData(chartData);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan saat mengambil data Statistik Pesanan");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersChartData();
  }, [authFetch]);

  if (loading) return <div className="p-4 text-center text-gray-500">Memuat Grafik...</div>;

  return (
    <div>
      <h2 className="text-xl bg-pink-200 inline-block p-2 px-5 rounded-lg font-bold mb-4">Statistik Pesanan</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value) => `${value} orders`}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar dataKey="Orders" fill="#10b981" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;
