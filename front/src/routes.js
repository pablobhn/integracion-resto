/* eslint-disable import/no-unresolved */
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import EmpleadosList from 'src/pages/EmpleadosList';
import ProductList from 'src/pages/ProductList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import MesasList from 'src/pages/MesasList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import VentasList from 'src/pages/VentasList';
import LiquidacionesList from 'src/pages/LiquidacionesList';
import Registracion from 'src/pages/Registracion';
import EmpresasList from './pages/EmpresasList';

export const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'empleados', element: <EmpleadosList /> },
      { path: 'productos', element: <ProductList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'mesas', element: <MesasList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'ventas', element: <VentasList /> },
      { path: 'liquidaciones', element: <LiquidacionesList /> },
      { path: 'registracion', element: <Registracion /> },
      { path: 'empresas', element: <EmpresasList /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export const noLogin = [
  {
    path: '*',
    element: <MainLayout />,
    children: [
      { path: '*', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  }
];
