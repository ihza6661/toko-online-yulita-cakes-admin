import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { token, setToken, setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AS Denim | Masuk";
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user); // Simpan data user (pastikan response memiliki properti "user")
        toast.success(data.message || "Login berhasil");
        navigate("/");
      } else {
        toast.error(data.message || "Login gagal");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Alamat Email</p>
            <input
              type="email"
              placeholder="Masukan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Kata Sandi</p>
            <input
              type="password"
              placeholder="Masukan password anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 text-white bg-black rounded-md"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
