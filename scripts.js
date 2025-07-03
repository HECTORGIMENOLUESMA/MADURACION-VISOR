
function filtrarYMostrar() {
  const bodega = document.getElementById("filtro-bodega").value;
  const viticultor = document.getElementById("filtro-viticultor").value;
  const anio = document.getElementById("filtro-anio").value;
  const zona = document.getElementById("filtro-zona").value;
  const variedad = document.getElementById("filtro-variedad").value;
  const punto = document.getElementById("filtro-punto").value;

  const filtrados = muestreos.filter(m => 
    (bodega === "" || m.BODEGA === bodega) &&
    (viticultor === "" || m.VITICULTOR === viticultor) &&
    (anio === "" || String(m.AÑO) === anio) &&
    (zona === "" || m.ZONA === zona) &&
    (variedad === "" || m.VARIEDAD === variedad) &&
    (punto === "" || m["PUNTO MUESTREO"] === punto)
  );

  const tabla = document.getElementById("tabla-muestreos");
  const thead = tabla.querySelector("thead");
  const tbody = tabla.querySelector("tbody");
  thead.innerHTML = "";
  tbody.innerHTML = "";

  if (filtrados.length === 0) return;

  const columnas = Object.keys(filtrados[0]);
  const headerRow = document.createElement("tr");
  columnas.forEach(c => {
    const th = document.createElement("th");
    th.textContent = c;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  filtrados.forEach(row => {
    const tr = document.createElement("tr");
    columnas.forEach(c => {
      const td = document.createElement("td");
      td.textContent = row[c];
      if (["pH", "AC TOTAL", "AC MÁLICO"].includes(c)) td.className = "acidez";
      if (["BAUMÉ", "AZÚCAR"].includes(c)) td.className = "azucar";
      if (["YAN", "NTV"].includes(c)) td.className = "nitrogeno";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function cargarFiltros() {
  const campos = [
    ["BODEGA", "filtro-bodega"],
    ["VITICULTOR", "filtro-viticultor"],
    ["AÑO", "filtro-anio"],
    ["ZONA", "filtro-zona"],
    ["VARIEDAD", "filtro-variedad"],
    ["PUNTO MUESTREO", "filtro-punto"]
  ];

  campos.forEach(([campo, id]) => {
    const select = document.getElementById(id);
    const opciones = [...new Set(muestreos.map(m => m[campo]))].filter(Boolean).sort();
    select.innerHTML = '<option value="">Todos</option>' + opciones.map(o => `<option value="${o}">${o}</option>`).join("");
    select.onchange = filtrarYMostrar;
  });

  filtrarYMostrar();
}

window.onload = cargarFiltros;
