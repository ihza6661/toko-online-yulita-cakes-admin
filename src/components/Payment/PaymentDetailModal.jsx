import { useState, useEffect } from 'react';
import Modal from '../Modal';

const PaymentDetailModal = ({ isOpen, onClose, payment, updatePaymentStatus }) => {
  const [status, setStatus] = useState(payment ? payment.status : '');

  // Perbarui state status jika data payment berubah
  useEffect(() => {
    if (payment) {
      setStatus(payment.status);
    }
  }, [payment]);

  if (!payment) return null;

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    updatePaymentStatus(payment.id, status);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Pembayaran">
      <div className="space-y-6">
        {/* Informasi Pembayaran */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Informasi Pembayaran</h2>
          <p>
            <strong>ID Pembayaran:</strong> PAY-{payment.id}
          </p>
          <p>
            <strong>No. Pesanan:</strong> {payment.order_number}
          </p>
          <p>
            <strong>Tanggal:</strong> {payment.created_at}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span className="capitalize">{payment.status}</span>
          </p>
          <p>
            <strong>Jumlah:</strong> Rp {payment.amount.toLocaleString('id-ID')}
          </p>
        </div>
        {/* Informasi Transaksi */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Informasi Transaksi</h2>
          <p>
            <strong>Tipe Pembayaran:</strong> {payment.payment_type}
          </p>
          <p>
            <strong>ID Transaksi:</strong> {payment.transaction_id}
          </p>
          {/* Jika ada metadata, Anda bisa menampilkannya juga */}
        </div>
        {/* Ubah Status Pembayaran */}
        <div>
          <label className="block mb-2 font-semibold">Ubah Status Pembayaran</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="settlement">Settlement</option>
            <option value="cancel">Cancel</option>
            <option value="expire">Expire</option>
            <option value="deny">Deny</option>
          </select>
        </div>
        {/* Tombol */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition duration-200"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleUpdateStatus}
            className="px-5 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Perbarui Status
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentDetailModal;
