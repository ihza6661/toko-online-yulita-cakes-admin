import { useState, useEffect, useMemo, useContext } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaTrash } from "react-icons/fa";
import ReviewDetailModal from "../components/Review/ReviewDetailModal";
import { AppContext } from "../context/AppContext";

// Komponen Filter Pencarian
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
    <input
      type="text"
      placeholder="Cari Ulasan..."
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

const Review = () => {
  useEffect(() => {
    document.title = "AS Denim | Dashboard - Ulasan";
  }, []);

  // Data dummy untuk daftar ulasan
  const [reviews, setReviews] = useState([
    {
      id: 1,
      site_user_id: 1,
      user_name: "John Doe",
      product_id: 1,
      product_name: "Blue Jeans",
      rating: 4,
      review: "Produk ini sangat bagus dan nyaman digunakan.",
      created_at: "2023-08-15 12:30",
    },
    // Tambahkan ulasan lain jika diperlukan
  ]);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const openDetailModal = (review) => {
    setSelectedReview(review);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedReview(null);
    setIsDetailModalOpen(false);
  };

  // Fungsi untuk menghapus ulasan
  const deleteReview = (reviewId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus ulasan ini?")) {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    }
  };

  // State untuk filter pencarian
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // Filter data ulasan berdasarkan nama pengguna, produk, atau isi ulasan
  const filteredReviews = reviews.filter(
    (review) =>
      review.user_name.toLowerCase().includes(filterText.toLowerCase()) ||
      review.product_name.toLowerCase().includes(filterText.toLowerCase()) ||
      review.review.toLowerCase().includes(filterText.toLowerCase())
  );

  // Sub header untuk DataTable: filter pencarian
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

  // Kolom DataTable
  const columns = [
    {
      name: "No",
      cell: (row, index) => <div>{index + 1}</div>,
      width: "60px",
      center: true,
    },
    {
      name: "Nama Pengguna",
      selector: (row) => row.user_name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Produk",
      selector: (row) => row.product_name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
      cell: (row) => <div>{row.rating} / 5</div>,
      minWidth: "100px",
    },
    {
      name: "Tanggal",
      selector: (row) => row.created_at,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => openDetailModal(row)}
            className="text-lg text-green-500 hover:text-green-600 mx-1"
            title="Lihat Detail"
          >
            <FaEye />
          </button>
          <button
            onClick={() => deleteReview(row.id)}
            className="text-lg text-red-500 hover:text-red-600 mx-1"
            title="Hapus Ulasan"
          >
            <FaTrash />
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

  // Custom Styles untuk DataTable
  const customStyles = {
    table: {
      style: {
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        overflow: "hidden",
      },
    },
    header: {
      style: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        padding: "1rem",
        backgroundColor: "#f8fafc",
        borderBottom: "2px solid #e5e7eb",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f3f4f6",
        borderBottomWidth: "2px",
      },
    },
    headCells: {
      style: {
        fontSize: "0.875rem",
        fontWeight: "600",
        padding: "0.75rem 1rem",
        color: "#374151",
      },
    },
    cells: {
      style: {
        fontSize: "0.875rem",
        padding: "0.75rem 1rem",
        color: "#4b5563",
      },
    },
    pagination: {
      style: {
        borderTop: "1px solid #e5e7eb",
        padding: "1rem",
      },
    },
    responsiveWrapper: {
      style: {
        borderRadius: "0.5rem",
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Ulasan Produk</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredReviews}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 50]}
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
              Tidak ada ulasan.
            </div>
          }
        />
      </div>

      {/* Modal Detail Ulasan */}
      <ReviewDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        review={selectedReview}
      />
    </div>
  );
};

export default Review;
