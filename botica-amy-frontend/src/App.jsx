import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Clientes from './pages/Clientes';
import Ventas from './pages/Ventas';
import Servicios from './pages/Servicios';
import Reportes from './pages/Reportes';
import ToastContainer from './components/UI/ToastContainer';
import WelcomeNotification from './components/UI/WelcomeNotification';
import Admin from './pages/Admin';
import ReporteVentas from './components/Reportes/ReporteVentas';
import ReporteStock from './components/Reportes/ReporteStock';
import './components/UI/DarkModeStyles.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <MainLayout>
                  <Productos />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <MainLayout>
                  <Clientes />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/ventas"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <MainLayout>
                  <Ventas />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/servicios"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <MainLayout>
                  <Servicios />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reportes"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <MainLayout>
                  <Reportes />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reportes/ventas"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <MainLayout>
                  <ReporteVentas />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reportes/stock"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <MainLayout>
                  <ReporteStock />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={['admin']}>
                <MainLayout>
                  <Admin />
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
        <WelcomeNotification />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
