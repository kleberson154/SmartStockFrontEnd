import { Boxes, LayoutDashboard, LogOut, PackagePlus } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">SmartStock</h1>
          <p className="text-sm text-slate-400">Inventory Management</p>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Boxes size={20} />
            Produtos
          </NavLink>

          <NavLink
            to="/movements"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <PackagePlus size={20} />
            Movimentações
          </NavLink>
        </nav>
        <button className="flex w-full items-center gap-3 px-8 py-4 text-slate-400 hover:text-white">
          <LogOut size={20} />
          Sair
        </button>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
