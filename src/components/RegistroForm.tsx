import type { Guide } from '../types/Guide';
import { useState } from 'react';

interface Props {
  guias: Guide[];
  setGuias: React.Dispatch<React.SetStateAction<Guide[]>>;
}

function RegistroForm({ guias, setGuias }: Props) {
  const [form, setForm] = useState({
    origen: '',
    destino: '',
    destinatario: '',
    fecha: '',
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
    setForm({ origen: '', destino: '', destinatario: '', fecha: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="origen" placeholder="Origen" onChange={handleChange} value={form.origen} />
      <input name="destino" placeholder="Destino" onChange={handleChange} value={form.destino} />
      <input name="destinatario" placeholder="Destinatario" onChange={handleChange} value={form.destinatario} />
      <input name="fecha" placeholder="Fecha" onChange={handleChange} value={form.fecha} type="date" />
      <button type="submit">Registrar guía</button>
    </form>
  );
}

export default RegistroForm;
