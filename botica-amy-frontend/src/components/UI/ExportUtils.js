import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (data, title, columns, filename) => {
  const doc = new jsPDF();
  
  // Título del documento
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  
  // Fecha de generación
  doc.setFontSize(10);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 32);
  
  // Tabla de datos
  const tableData = data.map(item => 
    columns.map(col => item[col.key] || '')
  );
  
  doc.autoTable({
    head: [columns.map(col => col.label)],
    body: tableData,
    startY: 40,
    styles: {
      fontSize: 8,
      cellPadding: 2
    },
    headStyles: {
      fillColor: [52, 152, 219],
      textColor: 255
    }
  });
  
  doc.save(`${filename}.pdf`);
};

export const exportToCSV = (data, columns, filename) => {
  const csvContent = [
    columns.map(col => col.label),
    ...data.map(item => columns.map(col => item[col.key] || ''))
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Configuraciones predefinidas para diferentes tipos de datos
export const exportConfigs = {
  productos: {
    title: 'Reporte de Productos',
    columns: [
      { key: 'id_producto', label: 'ID' },
      { key: 'nombre_producto', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' },
      { key: 'precio', label: 'Precio' },
      { key: 'stock', label: 'Stock' }
    ]
  },
  clientes: {
    title: 'Reporte de Clientes',
    columns: [
      { key: 'id_cliente', label: 'ID' },
      { key: 'nombre', label: 'Nombre' },
      { key: 'email', label: 'Email' },
      { key: 'telefono', label: 'Teléfono' },
      { key: 'direccion', label: 'Dirección' }
    ]
  },
  ventas: {
    title: 'Reporte de Ventas',
    columns: [
      { key: 'id_venta', label: 'ID Venta' },
      { key: 'cliente.nombre', label: 'Cliente' },
      { key: 'total', label: 'Total' },
      { key: 'fecha_venta', label: 'Fecha' },
      { key: 'estado', label: 'Estado' }
    ]
  }
}; 