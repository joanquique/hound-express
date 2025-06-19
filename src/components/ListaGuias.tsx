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
    <section aria-labelledby="listado-guias-title">
      <h3 id="listado-guias-title">Listado de Guías</h3>
      <ul>
        {guias.map((guia) => (
          <li key={guia.id}>
            <strong>{guia.destinatario}</strong> - Estado: {guia.estado}
            <button
              className="boton-estatus"
              onClick={() => actualizarEstado(guia.id, 'En tránsito')}
              aria-label={`Marcar guía de ${guia.destinatario} como En tránsito`}
            >
              En tránsito
            </button>
            <button
              className="boton-estatus"
              onClick={() => actualizarEstado(guia.id, 'Entregado')}
              aria-label={`Marcar guía de ${guia.destinatario} como Entregado`}
            >
              Entregado
            </button>
            <button
              className="boton-estatus"
              onClick={() => onVerHistorial(guia)}
              aria-label={`Ver historial de la guía de ${guia.destinatario}`}
            >
              Ver historial
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ListaGuias;
