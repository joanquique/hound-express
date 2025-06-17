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
      {/* <input name="numero_guia" placeholder="Número de Guía" onChange={handleChange} value={form.numero_guia} /> */}
      <input name="origen" placeholder="Origen" onChange={handleChange} value={form.origen} />
      <input name="destino" placeholder="Destino" onChange={handleChange} value={form.destino} />
      <input name="destinatario" placeholder="Destinatario" onChange={handleChange} value={form.destinatario} />
      <input name="fecha" className="input-fecha" onChange={handleChange} value={form.fecha} type="date" />
      {/* <input name="estado_inicial" placeholder="Estado Inicial" onChange={handleChange} value={form.estado_inicial} /> */}
      <button type="submit">Registrar guía</button>
    </form>
  );
}

export default RegistroForm;