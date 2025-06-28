const API_URL = '/api/visite';

// Quando la pagina è pronta, carica le visite
window.onload = getVisite;

function getVisite() {
  

  fetch(API_URL)
    .then(res => res.json())
    .then(visite => {
      const tbody = document.getElementById('visiteBody');
      tbody.innerHTML = ''; // Pulisce la tabella
  console.log("Dati ricevuti dal backend:", visite);
      visite.forEach(visita => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${visita.idVisita}</td>
          <td>${visita.idAnimale}</td>
          <td>${visita.idVeterinario}</td>
          <td>${visita.dataVisita}</td>
          <td>${visita.orarioVisita}</td>
          <td>${visita.tipoVisita}</td>
          <td>${visita.urgenza}</td>
          <td>${visita.noteAggiuntive}</td>
        `;

        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Errore nel caricamento delle visite:', error);
    });
}






// Funzione per creare una nuova visita
function createVisita() {
  const visita = {
    idAnimale: parseInt(document.getElementById("id_Animale").value),
    idVeterinario: parseInt(document.getElementById("id_Veterinario").value),
    dataVisita: document.getElementById("data_Visita").value,
    orarioVisita: document.getElementById("orario_Visita").value,
    tipoVisita: document.getElementById("tipo_Visita").value,
    urgenza: document.getElementById("urgenza").value,
    noteAggiuntive: document.getElementById("note_Aggiuntive").value,

  
  };
console.log("Sto provando a inviare questa visita:", visita);


  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(visita)
  })
  .then(() => {
    getVisite();
    clearForm();
  });

  if (!visita.idAnimale || !visita.idVeterinario || !visita.dataVisita || !visita.orarioVisita) {
  alert("Compila tutti i seguenti campi campi obbligatori correttamente: id Animale id Veterinario data Visita e orario Visita.");
  return;
  }
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

