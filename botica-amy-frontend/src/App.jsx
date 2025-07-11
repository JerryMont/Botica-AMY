import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Clientes from './pages/Clientes';
import Ventas from './pages/Ventas';
import Servicios from './pages/Servicios';
import Reportes from './pages/Reportes';
import ToastContainer from './components/UI/ToastContainer';
import HelpButton from './components/UI/HelpButton';
import WelcomeNotification from './components/UI/WelcomeNotification';

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
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <Productos />
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <Clientes />
              </PrivateRoute>
            }
          />
          <Route
            path="/ventas"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <Ventas />
              </PrivateRoute>
            }
          />
          <Route
            path="/servicios"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <Servicios />
              </PrivateRoute>
            }
          />
          <Route
            path="/reportes"
            element={
              <PrivateRoute roles={['admin', 'vendedor']}>
                <Reportes />
              </PrivateRoute>
            }
          />
        </Routes>
        <HelpButton />
        <WelcomeNotification />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
