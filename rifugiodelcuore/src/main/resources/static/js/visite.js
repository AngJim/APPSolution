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
    <td>
      
    <button class="btn btn-warning btn-sm me-2" onclick='apriModifica(${JSON.stringify(visita)})'>Modifica</button>
    <button class="btn btn-danger btn-sm" onclick="eliminaVisita(${visita.idVisita})">Elimina</button>
    </td>
  `;

        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Errore nel caricamento delle visite:', error);
    });
}







// Funzione per creare una nuova visita e  inviare i dati al backend con i vari controlli
function createVisita() {
  const microchip = document.getElementById("microchipAnimale").value.trim();
  const codiceFiscale = document.getElementById("codiceFiscaleVeterinario").value.trim();
  const dataVisita = document.getElementById("data_Visita").value;
  const orarioVisita = document.getElementById("orario_Visita").value;
  const tipoVisita = document.getElementById("tipo_Visita").value;
  const urgenza = document.getElementById("urgenza").value;
  const note = document.getElementById("note_Aggiuntive").value.trim();

  // Validazione base
  if (!microchip || !codiceFiscale || !dataVisita || !orarioVisita || !tipoVisita || !urgenza) {
    alert("Compila tutti i campi obbligatori.");
    return;
  }

  // Esempio di validazione microchip (solo numeri, almeno 8 cifre)
  if (!/^\d{8,}$/.test(microchip)) {
    alert("Il microchip deve contenere almeno 8 cifre numeriche.");
    return;
  }

  // Esempio di validazione codice fiscale (16 caratteri alfanumerici)
  if (!/^[A-Z0-9]{16}$/i.test(codiceFiscale)) {
    alert("Il codice fiscale deve essere composto da 16 caratteri alfanumerici.");
    return;
  }

  const visita = {
    microchipAnimale: microchip,
    codiceFiscaleVeterinario: codiceFiscale,
    dataVisita,
    orarioVisita,
    tipoVisita,
    urgenza,
    noteAggiuntive: note
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


function clearForm() {
  document.getElementById("microchipAnimale").value = '';
  document.getElementById("codiceFiscaleVeterinario").value = '';
  document.getElementById("data_Visita").value = '';
  document.getElementById("orario_Visita").value = '';
  document.getElementById("tipo_Visita").value = '';
  document.getElementById("urgenza").value = '';
  document.getElementById("note_Aggiuntive").value = '';
}
// Funzione per eliminare una visita
function eliminaVisita(id) {
  if (confirm("Sei sicuro di voler eliminare questa visita?")) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    .then(() => getVisite())
    .catch(error => console.error("Errore durante l'eliminazione:", error));
  }
}


// Funzione per aprire il modal di modifica
function apriModifica(visita) {
  document.getElementById('modifica_idVisita').value = visita.idVisita;
  document.getElementById('modifica_microchipAnimale').value = visita.microchipAnimale;
  document.getElementById('modifica_codiceFiscaleVeterinario').value = visita.codiceFiscaleVeterinario;
  document.getElementById('modifica_dataVisita').value = visita.dataVisita;
  document.getElementById('modifica_orarioVisita').value = visita.orarioVisita;
  document.getElementById('modifica_tipoVisita').value = visita.tipoVisita;
  document.getElementById('modifica_urgenza').value = visita.urgenza;
  document.getElementById('modifica_noteAggiuntive').value = visita.noteAggiuntive;

  const modal = new bootstrap.Modal(document.getElementById('modificaModal'));
  modal.show();
}

// Funzione per salvare le modifiche
function salvaModifica() {
  const id = document.getElementById('modifica_idVisita').value;
  const microchip = document.getElementById('modifica_microchipAnimale').value.trim();
  const codiceFiscale = document.getElementById('modifica_codiceFiscaleVeterinario').value.trim();
  const data = document.getElementById('modifica_dataVisita').value;
  const orario = document.getElementById('modifica_orarioVisita').value;
  const tipo = document.getElementById('modifica_tipoVisita').value;
  const urgenza = document.getElementById('modifica_urgenza').value;
  const note = document.getElementById('modifica_noteAggiuntive').value.trim();

  if (!microchip || !codiceFiscale || !data || !orario || !tipo || !urgenza) {
    alert("Compila tutti i campi obbligatori.");
    return;
  }

  if (!/^\d{8,}$/.test(microchip)) {
    alert("Il microchip deve contenere almeno 8 cifre numeriche.");
    return;
  }

  if (!/^[A-Z0-9]{16}$/i.test(codiceFiscale)) {
    alert("Il codice fiscale deve essere composto da 16 caratteri alfanumerici.");
    return;
  }

  const visitaModificata = {
    idVisita: id,
    microchipAnimale: microchip,
    codiceFiscaleVeterinario: codiceFiscale,
    dataVisita: data,
    orarioVisita: orario,
    tipoVisita: tipo,
    urgenza: urgenza,
    noteAggiuntive: note
  };

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(visitaModificata)
  })
  .then(() => {
    getVisite();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modificaModal'));
    modal.hide();
  });
}

  fetch(`${API_URL}/${visitaModificata.idVisita}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(visitaModificata)
  })
  .then(() => {
    getVisite();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modificaModal'));
    modal.hide();
  });

