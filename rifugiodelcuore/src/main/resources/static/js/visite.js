const API_URL = '/api/visite';

// Quando la pagina è pronta, carica le visite
window.onload = getVisite;

function getVisite() {
  fetch(API_URL)
    .then(res => res.json())
    .then(visite => {
      const tbody = document.getElementById('visiteBody');
      tbody.innerHTML = ''; // Pulisce la tabella

      visite.forEach(visita => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${visita.id_Visita}</td>
          <td>${visita.id_Animale}</td>
          <td>${visita.id_Veterinario}</td>
          <td>${visita.data_Visita}</td>
          <td>${visita.orario_Visita}</td>
          <td>${visita.tipo_Visita}</td>
          <td>${visita.urgenza}</td>
          <td>${visita.note_Aggiuntive}</td>
        `;

        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Errore nel caricamento delle visite:', error);
    });
}







function createVisita() {
  const visita = {
    idAnimale: parseInt(document.getElementById("id_Animale").value),
    idVeterinario: parseInt(document.getElementById("id_Veterinario").value),
    dataVisita: document.getElementById("data_Visita").value,
    orarioVisita: document.getElementById("orario_Visita").value,
    tipoVisita: document.getElementById("tipo_Visita").value,
    urgenza: document.getElementById("urgenza").value,
    noteAggiuntive: document.getElementById("note_Aggiuntive").value
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(visita)
  })
  .then(() => {
    getVisite();
    clearForm();
  });
}

function clearForm() {
  document.getElementById("id_Animale").value = '';
  document.getElementById("id_Veterinario").value = '';
  document.getElementById("data_Visita").value = '';
  document.getElementById("orario_Visita").value = '';
  document.getElementById("tipo_Visita").value = '';
  document.getElementById("urgenza").value = '';
  document.getElementById("note_Aggiuntive").value = '';
}

