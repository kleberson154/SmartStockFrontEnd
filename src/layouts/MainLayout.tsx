import {
  AlertTriangle,
  Boxes,
  LayoutDashboard,
  LogOut,
  Menu,
  PackagePlus,
  X,
} from 'lucide-react';

import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export function MainLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
      isActive
        ? 'bg-slate-800 text-white'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="flex items-center justify-between bg-slate-900 px-4 py-4 text-white lg:hidden">
        <div>
          <h1 className="text-xl font-bold">SmartStock</h1>
          <p className="text-xs text-slate-400">Inventory Management</p>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 transition hover:bg-slate-800"
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-white
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold">SmartStock</h1>
            <p className="text-sm text-slate-400">Inventory Management</p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="mt-6 flex-1 space-y-2 px-4">
          <NavLink
            to="/"
            end
            onClick={closeSidebar}
            className={linkClass}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeSidebar}
            className={linkClass}
          >
            <Boxes size={20} />
            Produtos
          </NavLink>

          <NavLink
            to="/movements"
            onClick={closeSidebar}
            className={linkClass}
          >
            <PackagePlus size={20} />
            Movimentações
          </NavLink>

          <NavLink
            to="/low-stock"
            onClick={closeSidebar}
            className={linkClass}
          >
            <AlertTriangle size={20} />
            Estoque Baixo
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center gap-3 px-8 py-4 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={20} />
          Sair
        </button>
      </aside>

      <main className="p-4 sm:p-6 lg:ml-64 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
