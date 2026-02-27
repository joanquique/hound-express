import type { Guide } from "../types/Guide";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { updateGuideStatus } from "../store/guidesSlice";

interface Props {
  onVerHistorial: (guia: Guide) => void;
}

function ListaGuias({ onVerHistorial }: Props) {
  const guias = useSelector((state: RootState) => state.guides.guias);
  const dispatch = useDispatch<AppDispatch>();

  const actualizarEstado = (id: string, nuevoEstado: Guide["estado"]) => {
    dispatch(
      updateGuideStatus({
        id,
        currentStatus: nuevoEstado, // esto se manda al backend como currentStatus
      })
    );
  };

  return (
    <section aria-labelledby="listado-guias-title">
      <h3 id="listado-guias-title">Listado de Guías</h3>

      <ul>
        {guias.map((guia) => (
          <li key={guia.id}>
            <strong>
              {guia.destinatario?.trim()
                ? guia.destinatario
                : `Guía ${guia.id} (${guia.origen} → ${guia.destino})`}
            </strong>
            {" "} - Estado: {guia.estado}

            <button
              className="boton-estatus"
              onClick={() => actualizarEstado(guia.id, "En tránsito")}
            >
              En tránsito
            </button>

            <button
              className="boton-estatus"
              onClick={() => actualizarEstado(guia.id, "Entregado")}
            >
              Entregado
            </button>

            <button className="boton-estatus" onClick={() => onVerHistorial(guia)}>
              Ver historial
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ListaGuias;