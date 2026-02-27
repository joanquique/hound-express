import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { createGuide, clearError } from "../store/guidesSlice";

function RegistroForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((s: RootState) => s.guides);

  const [form, setForm] = useState({
    numero_guia: "",
    origen: "",
    destino: "",
    destinatario: "",
    fecha: "",
    estado_inicial: "Pendiente",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(clearError());
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(
      createGuide({
        trackingNumber: form.numero_guia.trim(),
        origin: form.origen.trim(),
        destination: form.destino.trim(),
        currentStatus: form.estado_inicial || "Pendiente",
      })
    );

    setForm({
      numero_guia: "",
      origen: "",
      destino: "",
      destinatario: "",
      fecha: "",
      estado_inicial: "Pendiente",
    });
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Formulario de registro de guías">
      <div className="form-group">
        <label htmlFor="numero_guia">Número de guía</label>
        <input
          name="numero_guia"
          id="numero_guia"
          placeholder="Ej. HND123456"
          onChange={handleChange}
          value={form.numero_guia}
          required
          style={{
            color: "#000",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Origen */}
      <div className="form-group">
        <label htmlFor="origen">Origen</label>
        <input
          name="origen"
          id="origen"
          placeholder="Ej. CDMX"
          onChange={handleChange}
          value={form.origen}
          required
          style={{
            color: "#000",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Destino */}
      <div className="form-group">
        <label htmlFor="destino">Destino</label>
        <input
          name="destino"
          id="destino"
          placeholder="Ej. Monterrey"
          onChange={handleChange}
          value={form.destino}
          required
          style={{
            color: "#000",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Estado inicial */}
      <div className="form-group">
        <label htmlFor="estado_inicial">Estado inicial</label>
        <select
          name="estado_inicial"
          id="estado_inicial"
          value={form.estado_inicial}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "5.5px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "14px",
            outline: "none",
            appearance: "none",       // quita estilo feo nativo
            WebkitAppearance: "none", // Safari
            MozAppearance: "none",    // Firefox
          }}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En tránsito">En tránsito</option>
          <option value="Entregado">Entregado</option>
        </select>
      </div>

      {error && <p style={{ marginTop: 8 }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrar guía"}
      </button>
    </form>
  );
}

export default RegistroForm;