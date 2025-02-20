import Modal from '../Modal';

const ReviewDetailModal = ({ isOpen, onClose, review }) => {
  if (!review) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Ulasan Produk">
      {/* Informasi Ulasan */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Informasi Ulasan</h2>
        <p>
          <strong>Nama Pengguna:</strong> {review.user_name}
        </p>
        <p>
          <strong>Produk:</strong> {review.product_name}
        </p>
        <p>
          <strong>Rating:</strong> {review.rating} / 5
        </p>
        <p>
          <strong>Tanggal:</strong> {review.created_at}
        </p>
      </div>
      {/* Isi Ulasan */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Ulasan</h2>
        <p>{review.review}</p>
      </div>
      {/* Tombol */}
      <div className="text-right">
        <button
          type="button"
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Tutup
        </button>
      </div>
    </Modal>
  );
};

export default ReviewDetailModal;
