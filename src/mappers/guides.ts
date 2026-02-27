import type { ApiGuide } from "../types/ApiGuide";
import type { Guide } from "../types/Guide";

const normalizeStatus = (s: string): Guide["estado"] => {
  const v = (s || "").toLowerCase();

  if (v.includes("tránsito") || v.includes("transito")) return "En tránsito";
  if (v.includes("entreg")) return "Entregado";
  return "Pendiente";
};

export const apiToUiGuide = (g: ApiGuide): Guide => ({
  id: String(g.id), // UI usa string
  origen: g.origin,
  destino: g.destination,
  destinatario: "", // backend no lo trae (por ahora)
  fecha: "", // backend no lo trae (por ahora)
  estado: normalizeStatus(g.currentStatus),
  ultimaActualizacion: g.updatedAt || g.createdAt,
});

export const uiToApiCreatePayload = (g: {
  origin: string;
  destination: string;
  trackingNumber: string;
  currentStatus: string;
}) => ({
  origin: g.origin,
  destination: g.destination,
  trackingNumber: g.trackingNumber,
  currentStatus: g.currentStatus,
});