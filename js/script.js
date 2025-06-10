document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#registro form");
  const inputs = {
    guia: form.querySelector("input[name='guia']"),
    origen: form.querySelector("input[name='origen']"),
    destino: form.querySelector("input[name='destino']"),
    destinatario: form.querySelector("input[name='destinatario']"),
    fecha: form.querySelector("input[name='fecha']"),
    estado: form.querySelector("select[name='estado']")
  };

  const tbody = document.querySelector("#lista tbody");
  const historialSection = document.querySelector("#historial");

  const resumenSpans = document.querySelectorAll("#estado .resumen-estado span");
  const resumen = {
    total: resumenSpans[0],
    transito: resumenSpans[1],
    entregadas: resumenSpans[2]
  };

  const guias = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const numero = inputs.guia.value.trim();
    const origen = inputs.origen.value.trim();
    const destino = inputs.destino.value.trim();
    const destinatario = inputs.destinatario.value.trim();
    const fecha = inputs.fecha.value;
    const estado = inputs.estado.value;

    if (!numero || !origen || !destino || !destinatario || !fecha || !estado) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (guias.some(g => g.numero === numero)) {
      alert("El número de guía ya está registrado");
      return;
    }

    const nuevaGuia = {
      numero,
      origen,
      destino,
      destinatario,
      fecha,
      estado,
      historial: [
        {
          estado,
          fecha: new Date().toLocaleString()
        }
      ]
    };

    guias.push(nuevaGuia);
    renderGuias();
    actualizarResumen();
    form.reset();
  });

  function renderGuias() {
    tbody.innerHTML = "";
    guias.forEach((guia, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${guia.numero}</td>
        <td>${guia.estado}</td>
        <td>${guia.origen}</td>
        <td>${guia.destino}</td>
        <td>${guia.historial[guia.historial.length - 1].fecha}</td>
        <td>
          <button onclick="actualizarEstado(${index})">Actualizar Estado</button>
          <button onclick="verHistorial(${index})">Ver Historial</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.actualizarEstado = function (index) {
    const guia = guias[index];
    const siguiente = {
      "Pendiente": "En tránsito",
      "En tránsito": "Entregado",
      "Entregado": "Entregado"
    }[guia.estado];

    if (guia.estado === "Entregado") {
      alert("Esta guía ya fue entregada");
      return;
    }

    guia.estado = siguiente;
    guia.historial.push({
      estado: siguiente,
      fecha: new Date().toLocaleString()
    });
    renderGuias();
    actualizarResumen();
  }

  function actualizarResumen() {
    const activas = guias.filter(g => g.estado !== "Entregado").length;
    const transito = guias.filter(g => g.estado === "En tránsito").length;
    const entregadas = guias.filter(g => g.estado === "Entregado").length;
    resumen.total.textContent = activas;
    resumen.transito.textContent = transito;
    resumen.entregadas.textContent = entregadas;
  }

  window.verHistorial = function (index) {
    const guia = guias[index];
    const historialHTML = guia.historial.map(h => `<li>${h.estado} - ${h.fecha}</li>`).join("");

    historialSection.innerHTML = `
      <h2>Historial de Guía ${guia.numero}</h2>
      <ul>${historialHTML}</ul>
    `;
    location.href = "#historial";
  }
});
