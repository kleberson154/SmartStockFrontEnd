import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Products } from '../pages/Products';
import { Movements } from '../pages/Movements';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/movements" element={<Movements />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
