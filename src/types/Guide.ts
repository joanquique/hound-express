export interface Guide {
  id: string;
  origen: string;
  destino: string;
  destinatario: string;
  fecha: string;
  estado: "Pendiente" | "En tránsito" | "Entregado";
  ultimaActualizacion: string;
}
