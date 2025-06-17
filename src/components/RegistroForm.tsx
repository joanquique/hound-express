import type { Guide } from '../types/Guide';
import { useState } from 'react';

interface Props {
  guias: Guide[];
  setGuias: React.Dispatch<React.SetStateAction<Guide[]>>;
}

function RegistroForm({ guias, setGuias }: Props) {
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
    const nuevaGuia: Guide = {
      id: crypto.randomUUID(),
      ...form,
      estado: 'Pendiente',
      ultimaActualizacion: new Date().toISOString(),
    };
    setGuias([...guias, nuevaGuia]);
    setForm({ numero_guia: '', origen: '', destino: '', destinatario: '', fecha: '', estado_inicial: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="numero_guia" placeholder="Número de Guía" onChange={handleChange} value={form.numero_guia} />
      <input name="origen" placeholder="Origen" onChange={handleChange} value={form.origen} />
      <input name="destino" placeholder="Destino" onChange={handleChange} value={form.destino} />
      <input name="destinatario" placeholder="Destinatario" onChange={handleChange} value={form.destinatario} />
      <input name="fecha" placeholder="Fecha" onChange={handleChange} value={form.fecha} type="date" />
      <input name="estado_inicial" placeholder="Estado Inicial" onChange={handleChange} value={form.estado_inicial} type='select'/>
      <button type="submit">Registrar guía</button>
    </form>
  );
}

export default RegistroForm;
