import { Header } from './components/Header';
import RegistroForm from './components/RegistroForm';
import EstadoPanel from './components/EstadoPanel';
import ListaGuias from './components/ListaGuias';
import Historial from './components/Historial';
import { useState } from 'react';
import type { Guide } from './types/Guide';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

function App() {
  const guias = useSelector((state: RootState) => state.guides.guias);
  const [verHistorial, setVerHistorial] = useState<Guide | null>(null);

  return (
    <div className="main-container">
      <Header />
      <main>
        <section id="inicio">
          <h2>Bienvenido a HoundTrack</h2>
          <p>Consulta y gestiona el estado de tus envíos de manera rápida y sencilla.</p>
        </section>

        <section id="registro">
          <h1 className='encabezado-guias'>Registro de Guías</h1>
          <RegistroForm />
        </section>

        <section id="estado">
          <EstadoPanel guias={guias} />
        </section>

        <section id="lista">
          <ListaGuias
            onVerHistorial={setVerHistorial} 
          />
        </section>

        <section id="historial">
          <Historial guia={verHistorial} />
        </section>
      </main>
    </div>
  );
}

export default App;
