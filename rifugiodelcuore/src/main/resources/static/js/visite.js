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
        <td>${visita.microchipAnimale}</td>
        <td>${visita.codiceFiscaleVeterinario}</td>
        <td>${visita.dataVisita}</td>
        <td>${visita.orarioVisita}</td>
        <td>${visita.tipoVisita}</td>
        <td>${visita.urgenza}</td>
        <td>${visita.noteAggiuntive}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminaVisita(${visita.idVisita})">Elimina</button></td>
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
    microchipAnimale: document.getElementById("microchipAnimale").value,
    codiceFiscaleVeterinario: document.getElementById("codiceFiscaleVeterinario").value,
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
/* funzione per allert campi obbligatori
  if (!visita.microchip || !visita.codiceFiscaleVeterinario || !visita.dataVisita || !visita.orarioVisita) {

  alert("Compila tutti i seguenti campi campi obbligatori correttamente: id Animale id Veterinario data Visita e orario Visita.");
  return;
  }
  */
}

function clearForm() {
  document.getElementById("microchipAnimale").value = '';
  document.getElementById("codiceFiscaleVeterinario").value = '';
  document.getElementById("data_Visita").value = '';
  document.getElementById("orario_Visita").value = '';
  document.getElementById("tipo_Visita").value = '';
  document.getElementById("urgenza").value = '';
  document.getElementById("note_Aggiuntive").value = '';
}

function eliminaVisita(id) {
  if (confirm("Sei sicuro di voler eliminare questa visita?")) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    .then(() => getVisite())
    .catch(error => console.error("Errore durante l'eliminazione:", error));
  }
}