import type { Guide } from '../types/Guide';

interface Props {
  guias: Guide[];
}

function EstadoPanel({ guias }: Props) {
  return (
    <section aria-labelledby="estado-titulo">
      <h3 id="estado-titulo">Estado actual de tus guías</h3>
      <ul aria-label="Lista de guías de envío">
        {guias.map(guia => (
          <li key={guia.id}>
            {guia.destinatario} - {guia.estado} (última actualización: {new Date(guia.ultimaActualizacion).toLocaleString()})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EstadoPanel;
