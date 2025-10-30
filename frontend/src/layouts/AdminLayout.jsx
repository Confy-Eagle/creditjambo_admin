import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h1>
          <nav className="space-y-3">
            <NavItem to="/dashboard" label="📊 Dashboard" />
            <NavItem to="/users" label="👥 Users" />
            <NavItem to="/devices" label="💻 Devices" />
            <NavItem to="/transactions" label="💰 Transactions" />
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-6"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, label }) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-700 font-medium transition"
    >
      {label}
    </Link>
  );
}
