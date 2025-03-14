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
  FaChartLine,
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
        className={`fixed top-16 bottom-0 md:sticky md:top-16 md:block z-40 bg-pink-100 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64 shadow-lg`}
      >
        <div className="flex flex-col h-full">
          {/* Header Mobile */}
          <div className="flex items-center justify-between p-4 md:hidden bg-pink-100">
            <h1 className="text-brown-700 text-lg font-bold">Menu</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-brown-700 hover:text-brown-500 focus:outline-none"
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
                  `flex items-center px-6 py-3 text-brown-700 hover:bg-pink-200 transition-colors ${
                    isActive ? 'bg-pink-4 00 font-bold text-white' : ''
                  }`
                }
              >
                <span className="mr-4 text-brown-600">{item.icon}</span>
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
