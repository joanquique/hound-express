import type { Guide } from '../types/Guide';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { updateGuideStatus } from '../store/guidesSlice';

interface Props {
  onVerHistorial: (guia: Guide) => void;
}

function ListaGuias({ onVerHistorial }: Props) {
  const guias = useSelector((state: RootState) => state.guides.guias);
  const dispatch = useDispatch();

  const actualizarEstado = (id: string, nuevoEstado: Guide['estado']) => {
    dispatch(updateGuideStatus({ id, status: nuevoEstado }));
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
