import { Header } from './components/Header';
import RegistroForm from './components/RegistroForm';
import EstadoPanel from './components/EstadoPanel';
import ListaGuias from './components/ListaGuias';
import Historial from './components/Historial';
import { useState, useEffect } from 'react';
import type { Guide } from './types/Guide';

function App() {
  const [guias, setGuias] = useState<Guide[]>([]);
  const [verHistorial, setVerHistorial] = useState<Guide | null>(null);

  useEffect(() => {
    console.log("Guías actualizadas:", guias);
  }, [guias]);

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
          <RegistroForm guias={guias} setGuias={setGuias} />
        </section>

        <section id="estado">
          <EstadoPanel guias={guias} />
        </section>

        <section id="lista">
          <ListaGuias
            guias={guias}
            setGuias={setGuias}
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
