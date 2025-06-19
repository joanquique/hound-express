import type { Guide } from '../types/Guide';

interface Props {
  guia: Guide | null;
}

function Historial({ guia }: Props) {
  if (!guia)
    return (
      <p role="alert" aria-live="assertive">
        Selecciona una guía para ver su historial.
      </p>
    );

  return (
    <section aria-labelledby="historial-title">
      <h3 id="historial-title">Historial de {guia.destinatario}</h3>
      <p>Último estado: {guia.estado}</p>
      <p>Última actualización: {new Date(guia.ultimaActualizacion).toLocaleString()}</p>
      {/* Aquí luego podrías agregar una lista de cambios si usas HistoryEntry */}
    </section>
  );
}

export default Historial;
