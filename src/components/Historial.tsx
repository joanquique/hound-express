import type { Guide } from '../types/Guide';

interface Props {
  guia: Guide | null;
}

function Historial({ guia }: Props) {
  if (!guia) return <p>Selecciona una guía para ver su historial.</p>;

  return (
    <div>
      <h3>Historial de {guia.destinatario}</h3>
      <p>Último estado: {guia.estado}</p>
      <p>Última actualización: {new Date(guia.ultimaActualizacion).toLocaleString()}</p>
      {/* Aquí luego podrías agregar una lista de cambios si usas HistoryEntry */}
    </div>
  );
}

export default Historial;
