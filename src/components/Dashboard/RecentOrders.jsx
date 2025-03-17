import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const RecentOrders = () => {
  const { authFetch } = useContext(AppContext);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await authFetch("/api/admin/dashboard/recent_orders", {
          method: "GET",
        });
        if (!response.ok) throw new Error("Gagal mengambil data Orderan terbaru");
        const ordersData = await response.json();
        setRecentOrders(ordersData);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan saat mengambil data Orderan terbaru");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, [authFetch]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 p-4">
        Memuat orderan terbaru...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl bg-pink-200 inline-block p-2 px-5 rounded-lg font-bold mb-4">Orderan Terbaru</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">No. Pesanan</th>
              <th className="py-3 px-6 text-left">Nama Pelanggan</th>
              <th className="py-3 px-6 text-left">Tanggal Pesanan</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{order.order_number}</td>
                  <td className="py-3 px-6">{order.customer}</td>
                  <td className="py-3 px-6">{order.date}</td>
                  <td className="py-3 px-6">
                    Rp {order.total.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-6">{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center">
                  Tidak ada pesanan terbaru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
