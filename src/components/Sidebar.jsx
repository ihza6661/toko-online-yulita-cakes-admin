import { NavLink } from 'react-router-dom';
import {
  FaTimes,
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaMoneyBillWave,
  FaTruck,
  FaUsers,
  FaStar,
  FaUserShield,
  FaChartLine, // Import ikon untuk laporan penjualan
} from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/' },
    { name: 'Kategori', icon: <FaTags />, path: '/categories' },
    { name: 'Produk', icon: <FaBoxOpen />, path: '/products' },
    { name: 'Pesanan', icon: <FaShoppingCart />, path: '/orders' },
    { name: 'Pembayaran', icon: <FaMoneyBillWave />, path: '/payments' },
    { name: 'Pengiriman', icon: <FaTruck />, path: '/shipments' },
    { name: 'Pengguna', icon: <FaUsers />, path: '/users' },
    { name: 'Ulasan Produk', icon: <FaStar />, path: '/reviews' },
    { name: 'Laporan Penjualan', icon: <FaChartLine />, path: '/report' },
    { name: 'Admin', icon: <FaUserShield />, path: '/admins' },
  ];

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 md:sticky md:top-16 md:block z-40 bg-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header Mobile */}
          <div className="flex items-center justify-between p-4 md:hidden bg-gray-900">
            <h1 className="text-white text-lg font-semibold">Menu</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white hover:text-gray-300 focus:outline-none"
              aria-label="Close Sidebar"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Navigasi */}
          <nav className="flex-1 py-4 overflow-y-auto">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-gray-700 font-semibold' : ''
                  }`
                }
              >
                <span className="mr-4">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
