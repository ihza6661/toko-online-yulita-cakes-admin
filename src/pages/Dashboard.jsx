import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import SummaryCard from "../components/Dashboard/SummaryCard";
import SalesChart from "../components/Dashboard/SalesChart";
import OrdersChart from "../components/Dashboard/OrdersChart";
import RecentOrders from "../components/Dashboard/RecentOrders";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { authFetch } = useContext(AppContext);
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Yulita Cakes | Dashboard";
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await authFetch("/api/admin/dashboard/summary", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Gagal memuat data rangkuman");
      }
      const data = await response.json();
      setSummary({
        totalSales: Number(data.totalSales),
        totalOrders: data.totalOrders,
        totalUsers: data.totalUsers,
        totalProducts: data.totalProducts,
      });
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      toast.error("Terjadi kesalahan saat memuat data dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="text-center text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Kartu Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Total Penjualan"
          value={`Rp ${summary.totalSales.toLocaleString("id-ID")}`}
          icon={<FaMoneyBillWave className="w-8 h-8 text-blue-500" />}
        />
        <SummaryCard
          title="Total Pesanan"
          value={summary.totalOrders}
          icon={<FaShoppingCart className="w-8 h-8 text-green-500" />}
        />
        <SummaryCard
          title="Total Pengguna"
          value={summary.totalUsers}
          icon={<FaUsers className="w-8 h-8 text-yellow-500" />}
        />
        <SummaryCard
          title="Total Produk"
          value={summary.totalProducts}
          icon={<FaBoxOpen className="w-8 h-8 text-purple-500" />}
        />
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <SalesChart />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <OrdersChart />
        </div>
      </div>

      {/* Pesanan Terbaru */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
