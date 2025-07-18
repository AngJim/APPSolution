const API_URL = '/api/visite';



// Debug: aggiungiamo dei console.log per tracciare l'esecuzione
console.log('Script caricato');

// Un solo event listener per il DOM
document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM caricato');
  getVisite();
});

// Funzione per gestire gli errori di validazione
function mostraErrore(idElemento, messaggio) {
  const erroreDiv = document.getElementById(idElemento);
  erroreDiv.textContent = messaggio;
  erroreDiv.classList.remove('d-none');
}

// Funzione per nascondere eventuali errori precedenti
function nascondiErrore(idElemento) {
  const erroreDiv = document.getElementById(idElemento);
  erroreDiv.classList.add('d-none');
}

function getVisite() {
  console.log('Caricamento visite...');
  fetch(API_URL)
    .then(res => {
      console.log('Risposta GET visite:', res);
      return res.json();
    })
    .then(visite => {
      console.log('Visite caricate:', visite);
      const tbody = document.getElementById('visiteBody');
      tbody.innerHTML = '';

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
          <td>${visita.noteAggiuntive || ''}</td>
          
          <td id="azioni-${visita.idVisita}">
            <button class="btn btn-warning btn-sm me-2"
                    onclick='apriModifica(${JSON.stringify(visita)})'>Modifica</button>
            <button class="btn btn-danger btn-sm"
                    onclick='confermaInline(${visita.idVisita})'>Elimina</button>
          </td>
          `;
        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Errore nel caricamento delle visite:', error);
    });
}









function filtraVisite() {
  const microchip = document.getElementById("filtro_microchip").value;
  const codiceFiscale = document.getElementById("filtro_codiceFiscale").value;
  const data = document.getElementById("filtro_data").value;
  const tipo = document.getElementById("filtro_tipo").value;
  const urgenza = document.getElementById("filtro_urgenza").value;

  const params = new URLSearchParams();
  if (microchip) params.append("microchip", microchip);
  if (codiceFiscale) params.append("codiceFiscale", codiceFiscale);
  if (data) params.append("dataVisita", data);
  if (tipo) params.append("tipoVisita", tipo);
  if (urgenza) params.append("urgenza", urgenza);

  fetch(`${API_URL}/filtra?${params.toString()}`)
    .then(res => res.json())
    .then(visite => {
      const tbody = document.getElementById('visiteBody');
      tbody.innerHTML = '';
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
          <td>${visita.noteAggiuntive || ''}</td>
          <td id="azioni-${visita.idVisita}">
            <button class="btn btn-warning btn-sm me-2"
                    onclick='apriModifica(${JSON.stringify(visita)})'>Modifica</button>
            <button class="btn btn-danger btn-sm"
                    onclick='confermaInline(${visita.idVisita})'>Elimina</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(error => console.error("Errore durante il filtro:", error));
}







// Funzione per creare una nuova visita
function createVisita() {
  nascondiErrore("formError");

  const microchip = document.getElementById("microchipAnimale").value.trim();
  const codiceFiscale = document.getElementById("codiceFiscaleVeterinario").value.trim();
  const dataVisita = document.getElementById("data_Visita").value;
  const orarioVisita = document.getElementById("orario_Visita").value;
  const tipoVisita = document.getElementById("tipo_Visita").value;
  const urgenza = document.getElementById("urgenza").value;
  const note = document.getElementById("note_Aggiuntive").value.trim();
  
  // Controlli per i campi obbligatori (microchip, codice fiscale, data, orario, tipo e urgenza)
  if (!microchip || !codiceFiscale || !dataVisita || !orarioVisita || !tipoVisita || !urgenza) {
    mostraErrore("formError", "Compila tutti i campi obbligatori correttamente: microchip, codice fiscale, data, orario, tipo e urgenza.");
    return;
  }

  // Controlli per il microchip (almeno 15 cifre numeriche)
  if (!/^\d{15,}$/.test(microchip)) {
    mostraErrore("formError", "Il microchip deve contenere almeno 15 cifre numeriche.");
    return;
  }

  // Controlli per il codice fiscale (16 caratteri alfanumerici)
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
  })
  .catch(error => {
    console.error("Errore durante l'inserimento della visita:", error);
  });
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
  nascondiErrore("modificaError");

  const id = document.getElementById('modifica_idVisita').value;
  const microchip = document.getElementById('modifica_microchipAnimale').value.trim();
  const codiceFiscale = document.getElementById('modifica_codiceFiscaleVeterinario').value.trim();
  const data = document.getElementById('modifica_dataVisita').value;
  const orario = document.getElementById('modifica_orarioVisita').value;
  const tipo = document.getElementById('modifica_tipoVisita').value;
  const urgenza = document.getElementById('modifica_urgenza').value;
  const note = document.getElementById('modifica_noteAggiuntive').value.trim();

  // Controlli per i campi obbligatori (microchip, codice fiscale, data, orario, tipo e urgenza)
  if (!microchip || !codiceFiscale || !data || !orario || !tipo || !urgenza) {
    mostraErrore("modificaError", "Compila tutti i campi obbligatori correttamente: microchip, codice fiscale, data, orario, tipo e urgenza.");
    return;
  }

  // Controlli per il microchip (almeno 8 cifre numeriche)
  if (!/^\d{8,}$/.test(microchip)) {
    mostraErrore("modificaError", "Il microchip deve contenere almeno 8 cifre numeriche.");
    return;
  }

  // Controlli per il codice fiscale (16 caratteri alfanumerici)
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
  })
  .catch(error => {
    console.error("Errore durante la modifica:", error);
  });
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
  .then(() => getVisite());
}

function annullaElimina(id) {
  getVisite(); // Ricarica per ripristinare le azioni
}



//funzione per mostrare il banner in alto a scomparsa quando si scrolla
let lastScrollTop = 0;
const header = document.querySelector('.header-banner');

window.addEventListener('scroll', function () {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScrollTop) {
    header.classList.add('hidden'); // scorrendo in basso
  } else {
    header.classList.remove('hidden'); // scorrendo in alto
  }
  lastScrollTop = currentScroll;
});


// Funzione per mostrare il modal di aggiunta veterinario

async function salvaVeterinario() {
  const alertBox = document.getElementById('vetAlert');

  // raccogli valori
  const dto = {
    nome:               document.getElementById('vet_nome').value.trim(),
    cognome:            document.getElementById('vet_cognome').value.trim(),
    telefono:           document.getElementById('vet_telefono').value.trim(),
    email:              document.getElementById('vet_email').value.trim(),
    dataNascita:         document.getElementById('vet_datanascita').value,
    codiceFiscale:      document.getElementById('vet_cf').value.trim().toUpperCase(),
    clinica:            document.getElementById('vet_clinica').value.trim(),
    specializzazione:   document.getElementById('vet_specializzazione').value.trim(),
    tipoContratto:      document.getElementById('vet_tipoContratto').value

  };

  // mini-validazione client
if (!dto.nome || !dto.cognome || !dto.telefono ||
    !dto.codiceFiscale || !dto.tipoContratto) {
    mostraMsg('Compila i campi obbligatori.', 'danger');
    return;
}

  try {
    const res = await fetch('/api/veterinari', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(dto)
    });

    if (res.ok) {
      mostraMsg('Veterinario salvato con successo!', 'success');
      // se vuoi chiudere subito:
      setTimeout(() => bootstrap.Modal.getOrCreateInstance(
                    document.getElementById('addVeterinarioModal')).hide(), 900);
    } else {
      const msg = await res.text();
      mostraMsg(msg || 'Errore salvataggio', 'danger');
    }
  } catch (e) {
    mostraMsg('Errore di rete: ' + e, 'danger');
  }

  function mostraMsg(txt, type) {
    alertBox.className = 'alert alert-' + type;
    alertBox.textContent = txt;
    alertBox.classList.remove('d-none');
  }
}

/* ---------- funzione di pulizia ---------- */
function clearVetForm() {
  document.getElementById('vet_nome').value              = '';
  document.getElementById('vet_cognome').value           = '';
  document.getElementById('vet_telefono').value          = '';
  document.getElementById('vet_email').value             = '';
  document.getElementById('vet_cf').value                = '';
  document.getElementById('vet_clinica').value           = '';
  document.getElementById('vet_specializzazione').value  = '';
  document.getElementById('vet_datanascita').value       = '';
  document.getElementById('vet_tipoContratto').value     = '';

  const alertBox = document.getElementById('vetAlert');
  if (alertBox) {
    alertBox.classList.add('d-none');
    alertBox.textContent = '';
  }
} 

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM caricato');
  getVisite();

  /* reset modale a ogni apertura */
  const modalEl = document.getElementById('addVeterinarioModal');
  if (modalEl) {
    modalEl.addEventListener('show.bs.modal', clearVetForm);
  }
});