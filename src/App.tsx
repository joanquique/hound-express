import React, { useState } from "react";
import "./App.css";
import { Guide } from "./types/Guide";

function App() {
  const [guides, setGuides] = useState<Guide[]>([]);

  return (
    <main>
      <h1>HoundTrack</h1>
      {/* Aquí iremos agregando los componentes */}
    </main>
  );
}

export default App;
