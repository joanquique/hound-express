import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGuide } from '../store/guidesSlice';
import type { AppDispatch } from '../store/store';

function RegistroForm() {
  const dispatch = useDispatch<AppDispatch>();
  
  const [form, setForm] = useState({
    numero_guia: '',
    origen: '',
    destino: '',
    destinatario: '',
    fecha: '',
    estado_inicial: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaGuia = {
      id: crypto.randomUUID(),
      origen: form.origen,
      destino: form.destino,
      destinatario: form.destinatario,
      fecha: form.fecha,
      estado: 'Pendiente' as const,
      ultimaActualizacion: new Date().toISOString(),
    };

    dispatch(addGuide(nuevaGuia));
    setForm({
      numero_guia: '',
      origen: '',
      destino: '',
      destinatario: '',
      fecha: '',
      estado_inicial: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="origen">Origen</label>
        <input name="origen" id="origen" placeholder="Origen" onChange={handleChange} value={form.origen} />
      </div>
      <div className="form-group">
        <label htmlFor="destino">Destino</label>
        <input name="destino" id="destino" placeholder="Destino" onChange={handleChange} value={form.destino} />
      </div>
      <div className="form-group">
        <label htmlFor="destinatario">Destinatario</label>
        <input name="destinatario" id="destinatario" placeholder="Destinatario" onChange={handleChange} value={form.destinatario} />
      </div>
      <div className="form-group">
        <label htmlFor="fecha">Fecha</label>
        <input name="fecha" id="fecha" className="input-fecha" onChange={handleChange} value={form.fecha} type="date" />
      </div>
      <button type="submit">Registrar guía</button>
    </form>
  );
}

export default RegistroForm;