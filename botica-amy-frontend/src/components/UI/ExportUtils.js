import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (data, title, columns, filename) => {
  try {
    const doc = new jsPDF();

    // Título del documento
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text(title, 14, 22);

    // Fecha de generación
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-ES')}`, 14, 32);

    // Preparar datos de la tabla
    const tableData = data.map(item => {
      return columns.map(col => {
        // Manejar claves anidadas como 'cliente.nombre'
        const keys = col.key.split('.');
        let value = item;
        for (const key of keys) {
          value = value?.[key];
        }
        return value !== null && value !== undefined ? String(value) : '';
      });
    });

    // Tabla de datos
    doc.autoTable({
      head: [columns.map(col => col.label)],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      headStyles: {
        fillColor: [59, 130, 246], // Azul moderno
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250]
      },
      margin: { top: 40 }
    });

    // Guardar el PDF
    doc.save(`${filename}_${new Date().getTime()}.pdf`);
    return true;
  } catch (error) {
    console.error('Error al exportar PDF:', error);
    throw new Error('No se pudo generar el PDF. Verifica que los datos sean válidos.');
  }
};

export const exportToCSV = (data, columns, filename) => {
  try {
    // Encabezados
    const headers = columns.map(col => col.label);

    // Datos
    const rows = data.map(item => {
      return columns.map(col => {
        // Manejar claves anidadas
        const keys = col.key.split('.');
        let value = item;
        for (const key of keys) {
          value = value?.[key];
        }
        // Escapar comillas y comas para CSV
        const stringValue = value !== null && value !== undefined ? String(value) : '';
        return `"${stringValue.replace(/"/g, '""')}"`;
      });
    });

    // Combinar todo
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Crear BOM para UTF-8
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}_${new Date().getTime()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al exportar CSV:', error);
    throw new Error('No se pudo generar el CSV. Verifica que los datos sean válidos.');
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
      { key: 'precio', label: 'Precio (S/)' },
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
      { key: 'total', label: 'Total (S/)' },
      { key: 'fecha', label: 'Fecha' }
    ]
  }
};