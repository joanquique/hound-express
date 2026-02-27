import { api } from "./client";

export const GuidesAPI = {
  list: () => api.get("/api/guias"),
  create: (payload: any) => api.post("/api/crear-guia", payload),
  getById: (id: number | string) => api.get(`/api/obtener-guia/${id}`),
  update: (id: number | string, payload: any) => api.put(`/api/actualizar-guia/${id}`, payload),
  remove: (id: number | string) => api.delete(`/api/eliminar-guia/${id}`),
};