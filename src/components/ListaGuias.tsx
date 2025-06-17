import type { Guide } from '../types/Guide';

interface Props {
  guias: Guide[];
  setGuias: React.Dispatch<React.SetStateAction<Guide[]>>;
  onVerHistorial: (guia: Guide) => void;
}

function ListaGuias({ guias, setGuias, onVerHistorial }: Props) {
  const actualizarEstado = (id: string, nuevoEstado: Guide['estado']) => {
    setGuias(prev =>
      prev.map(g =>
        g.id === id
          ? { ...g, estado: nuevoEstado, ultimaActualizacion: new Date().toISOString() }
          : g
      )
    );
  };

  return (
    <div>
      <h3>Listado de Guías</h3>
      <ul>
        {guias.map(guia => (
          <li key={guia.id}>
            <strong>{guia.destinatario}</strong> - Estado: {guia.estado}
            <button className='boton-estatus' onClick={() => actualizarEstado(guia.id, 'En tránsito')}>En tránsito</button>
            <button className='boton-estatus' onClick={() => actualizarEstado(guia.id, 'Entregado')}>Entregado</button>
            <button className='boton-estatus' onClick={() => onVerHistorial(guia)}>Ver historial</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaGuias;
