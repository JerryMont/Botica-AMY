import { useEffect, useState } from 'react';
import { getServicios, deleteServicio } from '../../api/servicios';

export default function ServicioList({ onEdit }) {
  const [servicios, setServicios] = useState([]);

  const fetchServicios = () => {
    getServicios().then(res => setServicios(res.data.data));
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar servicio?')) {
      await deleteServicio(id);
      fetchServicios();
    }
  };

  return (
    <div>
      <h2>Servicios</h2>
      <ul>
        {servicios.map(s => (
          <li key={s.id}>
            {s.titulo} - {s.descripcion}
            <button onClick={() => onEdit(s)}>Editar</button>
            <button onClick={() => handleDelete(s.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 