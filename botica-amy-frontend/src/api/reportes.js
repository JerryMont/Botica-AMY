import api from './axios';

export const getReporteVentas = (fecha_inicio, fecha_fin) => 
  api.get(`/reporte/ventas?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`);

export const getProductosStockBajo = (umbral = 10) => 
  api.get(`/productos/stock-bajo?umbral=${umbral}`); 