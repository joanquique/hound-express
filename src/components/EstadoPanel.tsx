import type { Guide } from '../types/Guide';

interface Props {
  guias: Guide[];
}

function EstadoPanel({ guias }: Props) {
  return (
    <div>
      <h3>Estado actual de tus guías</h3>
      <ul>
        {guias.map(guia => (
          <li key={guia.id}>
            {guia.destinatario} - {guia.estado} (última actualización: {new Date(guia.ultimaActualizacion).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstadoPanel;
