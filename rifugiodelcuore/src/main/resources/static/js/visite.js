const API_URL = '/api/visite';

// Quando la pagina è pronta, carica le visite
window.onload = getVisite;

// Funzione per gestire gli errori di validazione
function mostraErrore(idElemento, messaggio) {
  const erroreDiv = document.getElementById(idElemento);
  erroreDiv.textContent = messaggio;
  erroreDiv.classList.remove('d-none');
}
// funzione nascondere eventuali errori precedenti:
function nascondiErrore(idElemento) {
  const erroreDiv = document.getElementById(idElemento);
  erroreDiv.classList.add('d-none');
}

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
  nascondiErrore("formError");

  const microchip = document.getElementById("microchipAnimale").value.trim();
  const codiceFiscale = document.getElementById("codiceFiscaleVeterinario").value.trim();
  const dataVisita = document.getElementById("data_Visita").value;
  const orarioVisita = document.getElementById("orario_Visita").value;
  const tipoVisita = document.getElementById("tipo_Visita").value;
  const urgenza = document.getElementById("urgenza").value;
  const note = document.getElementById("note_Aggiuntive").value.trim();

  // Controlli per i campi obbligatori che non possono essere vuoti (microchip, codice fiscale, data, orario, tipo e urgenza) altrimenti mostra un errore
  if (!microchip || !codiceFiscale || !dataVisita || !orarioVisita || !tipoVisita || !urgenza) {
    mostraErrore("formError", "Compila tutti i campi obbligatori: microchip, codice fiscale, data, orario, tipo e urgenza.");
    return;
  }
  // Controlli per il microchip (almeno 8 cifre numeriche) altrimenti mostra un errore
  if (!/^\d{8,}$/.test(microchip)) {
    mostraErrore("formError", "Il microchip deve contenere almeno 8 cifre numeriche.");
    return;
  }
  // Controlli per il codice fiscale (16 caratteri alfanumerici) altrimenti mostra un errore
  if (!/^[A-Z0-9]{16}$/i.test(codiceFiscale)) {
    mostraErrore("formError", "Il codice fiscale deve essere composto da 16 caratteri alfanumerici.");
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

// Funzione per salvare le modifiche con i controlli
function salvaModifica() {
  nascondiErrore("modificaError");

  const id = document.getElementById('modifica_idVisita').value;
  const microchip = document.getElementById('modifica_microchipAnimale').value.trim();
  const codiceFiscale = document.getElementById('modifica_codiceFiscaleVeterinario').value.trim();
  const data = document.getElementById('modifica_dataVisita').value;
  const orario = document.getElementById('modifica_orarioVisita').value;
  const tipo = document.getElementById('modifica_tipoVisita').value;
  const urgenza = document.getElementById('modifica_urgenza').value;
  const note = document.getElementById('modifica_noteAggiuntive').value.trim();

  // controlli per i campi obbligatori che non possono essere vuoti (microchip, codice fiscale, data, orario, tipo e urgenza)
  if (!microchip || !codiceFiscale || !data || !orario || !tipo || !urgenza) {
    mostraErrore("modificaError", "Compila tutti i campi obbligatori: microchip, codice fiscale, data, orario, tipo e urgenza.");
    return;
  }
  // controlli per il microchip (almeno 8 cifre numeriche)
  if (!/^\d{8,}$/.test(microchip)) {
    mostraErrore("modificaError", "Il microchip deve contenere almeno 8 cifre numeriche.");
    return;
  }
// controlli per il codice fiscale (16 caratteri alfanumerici)
  if (!/^[A-Z0-9]{16}$/i.test(codiceFiscale)) {
    mostraErrore("modificaError", "Il codice fiscale deve essere composto da 16 caratteri alfanumerici.");
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

