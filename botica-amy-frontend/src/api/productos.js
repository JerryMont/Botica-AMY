import api from './axios';

export const getProductos = () => api.get('/productos');
export const getProducto = (id) => api.get(`/productos/${id}`); 