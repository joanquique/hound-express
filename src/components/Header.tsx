export function Header() {
  return (
    <header>
      <div className="banner">
        <img className="img-logo" src="./public/logo.png" alt="Logo de la aplicación" />
        <div>
          <h1>HoundTrack</h1>
          <p>Tu envío, siempre bajo control</p>
        </div>
      </div>
      <nav>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#registro">Registro de Guías</a></li>
          <li><a href="#estado">Estado General</a></li>
          <li><a href="#lista">Lista de Guías</a></li>
          <li><a href="#buscar">Buscar Guías</a></li>
          <li><a href="#historial">Historial de Guías</a></li>
        </ul>
      </nav>
    </header>
  );
}
