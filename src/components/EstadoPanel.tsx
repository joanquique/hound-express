import type { Guide } from "../types/Guide";

interface Props {
  guias: Guide[];
}

function EstadoPanel({ guias }: Props) {
  const total = guias.length;
  const enTransito = guias.filter((g) => g.estado === "En tránsito").length;
  const entregadas = guias.filter((g) => g.estado === "Entregado").length;
  const pendientes = guias.filter((g) => g.estado === "Pendiente").length;

  return (
    <section aria-labelledby="estado-titulo">
      <h3 id="estado-titulo">Estado actual de tus guías</h3>

      {/* Contadores que pide la entrega */}
      <div style={{ marginBottom: 12 }}>
        <p>Total: <strong>{total}</strong></p>
        <p>Pendientes: <strong>{pendientes}</strong></p>
        <p>En tránsito: <strong>{enTransito}</strong></p>
        <p>Entregadas: <strong>{entregadas}</strong></p>
      </div>

      <ul aria-label="Lista de guías de envío">
        {guias.map((guia) => (
          <li key={guia.id}>
            {(guia.destinatario?.trim()
              ? guia.destinatario
              : `${guia.origen} → ${guia.destino}`)}{" "}
            - {guia.estado} (última actualización:{" "}
            {new Date(guia.ultimaActualizacion).toLocaleString()})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EstadoPanel;