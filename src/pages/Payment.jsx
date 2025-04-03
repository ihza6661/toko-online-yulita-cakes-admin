import { useState, useEffect, useMemo, useContext } from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import PaymentDetailModal from "../components/Payment/PaymentDetailModal";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import customStyles from "../mod/tableSyles";

// Komponen Filter untuk pencarian dan reset
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-start gap-3 w-full">
    <input
      id="search"
      type="text"
      placeholder="Cari Pembayaran..."
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all w-full sm:w-72"
    />
    <button
      onClick={onClear}
      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 w-full sm:w-auto"
    >
      Reset Pencarian
    </button>
  </div>
);

const Payment = () => {
  const { authFetch } = useContext(AppContext);
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [errorPayments, setErrorPayments] = useState(null);

  useEffect(() => {
    document.title = "Dasbor - Pembayaran";
  }, []);

  // Ambil data pembayaran dari backend.
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await authFetch(
          "http://127.0.0.1:8000/api/admin/payments",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        // Ambil array data dari key payments
        setPayments(Array.isArray(data.payments) ? data.payments : []);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setErrorPayments(error);
      } finally {
        setLoadingPayments(false);
      }
    };

    fetchPayments();
  }, [authFetch]);

  // Modal detail pembayaran
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const openDetailModal = (payment) => {
    setSelectedPayment(payment);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedPayment(null);
    setIsDetailModalOpen(false);
  };

  // Fungsi untuk mengupdate status pembayaran melalui backend
  const updatePaymentStatus = async (paymentId, newStatus) => {
    try {
      const response = await authFetch(
        `http://127.0.0.1:8000/api/admin/payments/${paymentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui status pembayaran.");
      }
      // Perbarui status pada state payments secara optimistik
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === paymentId ? { ...payment, status: newStatus } : payment
        )
      );
      toast.success(data.message);
    } catch (error) {
      console.error("Gagal memperbarui status pembayaran:", error);
      toast.error("Terjadi kesalahan saat memperbarui status pembayaran.");
    }
  };

  // State untuk pencarian
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // Filter data pembayaran berdasarkan No. Pesanan atau Nama Pelanggan
  const filteredPayments = payments.filter(
    (payment) =>
      payment.order?.order_number
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      (payment.order?.user?.name &&
        payment.order.user.name
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  );

  // Sub Header untuk DataTable (filter pencarian)
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // Kolom untuk DataTable
  const columns = [
    {
      name: "No",
      cell: (row, index) => <div>{index + 1}</div>,
      width: "60px",
      center: true,
    },
    {
      name: "ID Pembayaran",
      cell: (row) => <div>{row.id}</div>,
      sortable: true,
      minWidth: "180px",
      center: true,
    },
    {
      name: "No. Pesanan",
      selector: (row) => row.order?.order_number,
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "Nama Pelanggan",
      selector: (row) => row.order?.user?.name,
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "Tanggal",
      selector: (row) => {
        const date = new Date(row.created_at);
        return date.toLocaleString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      },
      sortable: true,
      minWidth: "170px",
    },
    {
      name: "Jumlah",
      cell: (row) => (
        <div>
          Rp{" "}
          {row.order?.total_amount
            ? row.order.total_amount.toLocaleString("id-ID")
            : row.amount.toLocaleString("id-ID")}
        </div>
      ),
      sortable: true,
      minWidth: "120px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <span className="capitalize">{row.status}</span>,
      minWidth: "120px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => openDetailModal(row)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Lihat Detail"
          >
            <FaEye className="text-lg" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      center: true,
      minWidth: "100px",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pembayaran</h1>
      {loadingPayments ? (
        <p className="text-center text-gray-500">Memuat pembayaran...</p>
      ) : errorPayments ? (
        <p className="text-center text-red-500">
          Terjadi kesalahan saat mengambil pembayaran.
        </p>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          <DataTable
            columns={columns}
            data={filteredPayments}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20, 50, 100]}
            paginationComponentOptions={{
              rowsPerPageText: "Baris per halaman:",
              rangeSeparatorText: "dari",
            }}
            responsive
            highlightOnHover
            striped
            customStyles={customStyles}
            subHeader
            subHeaderComponent={subHeaderComponent}
            paginationResetDefaultPage={resetPaginationToggle}
            noDataComponent={
              <div className="p-4 text-center text-gray-500">
                Tidak ada pembayaran.
              </div>
            }
          />
        </div>
      )}

      {/* Modal Detail Pembayaran */}
      <PaymentDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        payment={selectedPayment}
        updatePaymentStatus={updatePaymentStatus}
      />
    </div>
  );
};

export default Payment;
