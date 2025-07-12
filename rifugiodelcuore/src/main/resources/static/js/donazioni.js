const API_URL = '/api/donazioni';

window.onload = getDonazioni;

function mostraErrore(idElemento, messaggio) {
  const erroreDiv = document.getElementById(idElemento);
  erroreDiv.textContent = messaggio;
  erroreDiv.classList.remove('d-none');
}

function nascondiErrore(idElemento) {
  const erroreDiv = document.getElementById(idElemento);
  erroreDiv.classList.add('d-none');
}

function getDonazioni() {
  fetch(API_URL)
    .then(res => res.json())
    .then(donazioni => {
      const tbody = document.getElementById('donazioniBody');
      tbody.innerHTML = '';

      donazioni.forEach(donazione => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${donazione.idDonazione}</td>
          <td>${donazione.nomeDonatore}</td>
          <td>${donazione.importo}</td>
          <td>${donazione.metodoPagamento}</td>
          <td>${donazione.dataDonazione}</td>
          <td>${donazione.noteAggiuntive || ''}</td>
          
          <td id="azioni-${donazione.idDonazione}">
            <button class="btn btn-warning btn-sm me-2"
                    onclick='apriModifica(${JSON.stringify(donazione)})'>Modifica</button>
            <button class="btn btn-danger btn-sm"
                    onclick='confermaInline(${donazione.idDonazione})'>Elimina</button>
          </td>
          `;
        tbody.appendChild(row);
      });
    })
      .catch(error => {
      console.error('Errore nel caricamento delle donazioni:', error);
    })
    ;
}

function submitDonazione() {
  const codiceFiscale = document.getElementById("codiceFiscaleDonatore").value.trim();
  const importo = document.getElementById("importo").value;
  const metodoPagamento = document.getElementById("metodoPagamento").value;
  const dataDonazione = document.getElementById("data_Donazione").value;
  const note = document.getElementById("note_Aggiuntive").value.trim();
  
  // Controlli per i campi obbligatori 
  if (!codiceFiscale || !importo || !metodoPagamento || !dataDonazione) {
    mostraErrore("formError", "Compila tutti i campi obbligatori correttamente: codice fiscale, importo, metodo di pagamento e data.");
    return;
  }

  // Controlli per il codice fiscale (16 caratteri alfanumerici)
  if (!/^[A-Z0-9]{16}$/i.test(codiceFiscale)) {
    mostraErrore("formError", "Il codice fiscale deve essere composto da 16 caratteri alfanumerici.");
    return;
  }

  const donazione = {
    nomeDonatore: codiceFiscale,
    importo,
    metodoPagamento,
    dataDonazione,
    noteAggiuntive: note
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donazione)
  })
  .then(() => {
    getDonazioni();
    clearForm();
  })
  .catch(error => {
    console.error("Errore durante l'inserimento della donazione:", error);
  });
}

function clearForm() {
  document.getElementById("codiceFiscaleDonatore").value = '';
  document.getElementById("importo").value = '';
  document.getElementById("metodoPagamento").value = '';
  document.getElementById("data_Donazione").value = '';
  document.getElementById("note_Aggiuntive").value = '';
}

function apriModifica(donazione) {
  document.getElementById('modifica_idDonazione').value = donazione.idDonazione;
  document.getElementById('modifica_codiceFiscaleDonatore').value = donazione.nomeDonatore;
  document.getElementById('modifica_importo').value = donazione.importo;
  document.getElementById('modifica_metodoPagamento').value = donazione.metodoPagamento;
  document.getElementById('modifica_dataDonazione').value = donazione.dataDonazione;
  document.getElementById('modifica_noteAggiuntive').value = donazione.noteAggiuntive;

  const modal = new bootstrap.Modal(document.getElementById('modificaModal'));
  modal.show();
}

function salvaModifica() {
  nascondiErrore("modificaError");

  const id = document.getElementById('modifica_idDonazione').value;
  const codiceFiscale = document.getElementById("modifica_codiceFiscaleDonatore").value.trim();
  const importo = document.getElementById("modifica_importo").value;
  const metodoPagamento = document.getElementById("modifica_metodoPagamento").value;
  const dataDonazione = document.getElementById("modifica_dataDonazione").value;
  const note = document.getElementById('modifica_noteAggiuntive').value.trim();

 // Controlli per i campi obbligatori 
  if (!codiceFiscale || !importo || !metodoPagamento || !dataDonazione) {
    mostraErrore("formError", "Compila tutti i campi obbligatori correttamente: codice fiscale, importo, metodo di pagamento e data.");
    return;
  }

  // Controlli per il codice fiscale (16 caratteri alfanumerici)
  if (!/^[A-Z0-9]{16}$/i.test(codiceFiscale)) {
    mostraErrore("modificaError", "Il codice fiscale deve essere composto da 16 caratteri alfanumerici.");
    return;
  }

  const donazioneModificata = {
    nomeDonatore: codiceFiscale,
    importo,
    metodoPagamento,
    dataDonazione,
    noteAggiuntive: note
  };

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donazioneModificata)
  })
  .then(() => {
    getDonazioni();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modificaModal'));
    modal.hide();
  })
  .catch(error => {
    console.error("Errore durante la modifica:", error);
  });
}

function deleteDonazione(id) {
  if (confirm("Sei sicuro di voler eliminare questa donazione?")) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    .then(() => getDonazioni())
    .catch(error => console.error("Errore durante l'eliminazione:", error));
  }
}



function confermaInline(id) {
  const td = document.getElementById(`azioni-${id}`);
  td.innerHTML = `
    <span class="text-danger">Confermi?</span>
    <button class="btn btn-danger btn-sm ms-1" onclick='confermaElimina(${id})'>✔</button>
    <button class="btn btn-secondary btn-sm ms-1" onclick='annullaElimina(${id})'>✖</button>
  `;
}

function confermaElimina(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
  .then(() => getDonazioni());
}

function annullaElimina(id) {
  getDonazioni(); 
}

