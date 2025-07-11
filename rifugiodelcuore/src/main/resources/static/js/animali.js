const API_URL = '/api/animali';

// Carica animali all'avvio
window.onload = getAnimali;

// Sezione per rendere disponibili il menù a tendina delle razze in base alla specie selezionata
const razze = {
  Cane: [
    "Australian Shepherd", "Beauceron", "Belgian Malinois",
    "Border Collie", "Bouvier des Flandres", "Boxer",
    "Dobermann", "Golden Retriever", "German Shepherd Dog",
    "Labrador Retriever", "Rottweiler", "Siberian Husky",
    "Basenji", "Affenpinscher", "Akita", "Dalmatian", "Whippet",
    "Incrocio"
  ],
  Gatto: [
    "Europeo", "Siamese", "Persiano", "Maine Coon", "British Shorthair", "Ragdoll",
    "Sphynx", "Abissino", "Sacred of Birmania", "Norvegese delle Foreste", "Scottish Fold",
    "Orientale", "Bengala", "Devon Rex", "Cornish Rex", "American Curl", "American Shorthair",
    "Turco Van", "Siberiano", "Somalo", "Balinese", "Manx", "Tonkinese", "Ocicat", "Bombay",
    "Chartreux", "Havana Brown", "Peterbald", "Exotic Shorthair", "Russian Blue", "LaPerm",
    "Colorpoint Shorthair", "Incrocio"
  ]
};

// Gestione dropdown razze
document.getElementById("specie").addEventListener("change", function () {
  const specieSelezionata = this.value;
  const selectRazza = document.getElementById("razza");

  selectRazza.innerHTML = '';

  if (!specieSelezionata) {
    const option = document.createElement("option");
    option.textContent = "Seleziona la specie dell'animale";
    option.disabled = true;
    option.selected = true;
    selectRazza.appendChild(option);
    return;
  }

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Seleziona la razza";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectRazza.appendChild(defaultOption);

  razze[specieSelezionata].forEach(razza => {
    const option = document.createElement("option");
    option.value = razza;
    option.textContent = razza;
    selectRazza.appendChild(option);
  });
});

// === GESTIONE VACCINAZIONI MULTI-SELEZIONE ===
let selectedVaccinations = [];

function toggleVaccinationDropdown() {
  const dropdown = document.getElementById('vaccinazioniDropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// Chiudi dropdown quando si clicca fuori
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('vaccinazioniDropdown');
  const container = document.getElementById('vaccinazioniContainer');
  
  if (!container.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});

// Gestione selezione vaccinazioni
document.getElementById('vaccinazioniDropdown').addEventListener('change', function(event) {
  if (event.target.type === 'checkbox') {
    const vaccination = event.target.value;

    if (vaccination === 'Non vaccinato') {
      if (event.target.checked) {
        // Deseleziona tutte le altre
        selectedVaccinations = ['Non vaccinato'];
        document.querySelectorAll('#vaccinazioniDropdown input[type="checkbox"]').forEach(checkbox => {
          if (checkbox.value !== 'Non vaccinato') {
            checkbox.checked = false;
          }
        });
      } else {
        selectedVaccinations = [];
      }
    } else {
      // Se selezioni un'altra, deseleziona "Non vaccinato"
      document.querySelector('#vaccinazioniDropdown input[value="Non vaccinato"]').checked = false;
      selectedVaccinations = selectedVaccinations.filter(v => v !== 'Non vaccinato');

      if (event.target.checked) {
        if (!selectedVaccinations.includes(vaccination)) {
          selectedVaccinations.push(vaccination);
        }
      } else {
        selectedVaccinations = selectedVaccinations.filter(v => v !== vaccination);
      }
    }

    updateVaccinationDisplay();
  }
});


function updateVaccinationDisplay() {
  const selectedDiv = document.getElementById('vaccinazioniSelected');
  const placeholder = document.getElementById('vaccinazioniPlaceholder');
  
  if (selectedVaccinations.length === 0) {
    placeholder.style.display = 'block';
    selectedDiv.innerHTML = '';
  } else {
    placeholder.style.display = 'none';
    selectedDiv.innerHTML = selectedVaccinations.map(vacc => 
      `<span class="vaccination-item">${vacc}</span>`
    ).join(' ');
  }
}

// === FUNZIONI PRINCIPALI ===

function getAnimali() {
  fetch(API_URL)
    .then(res => res.json())
    .then(animali => {
      const tbody = document.getElementById('animaliBody');
      tbody.innerHTML = '';

      animali.forEach(animale => {
        const row = document.createElement('tr');
        
        // Formatta le vaccinazioni per la visualizzazione
        const vaccinazioni = animale.vaccinazioni || '';
        const vaccinazioniArray = vaccinazioni.split(',').map(v => v.trim()).filter(v => v);
        const vaccinazioniHtml = vaccinazioniArray.map(v => 
          `<span class="vaccination-item">${v}</span>`
        ).join(' ');

        row.innerHTML = `
          <td>${animale.id}</td>
          <td>${animale.nome}</td>
          <td>${animale.specie}</td>
          <td>${animale.razza}</td>
          <td>${animale.genere}</td>
          <td>${animale.eta}</td>
          <td>${animale.taglia}</td>
          <td>${animale.descrizione || ''}</td>
          <td>${animale.microchipAnimale}</td>
          <td>${animale.statoAnimale}</td>
          <td>
            <div class="vaccination-container" style="min-height: 40px;">
              ${vaccinazioniHtml}
            </div>
          </td>
          <td>
            <span id="conferma-${animale.id}">
              <button class="btn btn-danger btn-sm" onclick="chiediConfermaEliminazione(${animale.id})">Elimina</button>
            </span>
            <button class="btn btn-warning btn-sm me-1" onclick="apriModificaAnimale(${animale.id})">Modifica</button>
            <button class="btn btn-info btn-sm me-1" onclick="openAdozioneForm(${animale.id})">Registra Adozione</button>
          </td>
        `;


        tbody.appendChild(row);
      });
    });
}

// Funzione per confermare l'eliminazione
function chiediConfermaEliminazione(id) {
  const span = document.getElementById(`conferma-${id}`);

  span.innerHTML = `
    <div class="text-danger text-center small">
      Confermi?
      <button class="btn btn-danger btn-sm ms-1" onclick="confermaEliminazione(${id})">
        <i class="bi bi-check2"></i>
      </button>
      <button class="btn btn-secondary btn-sm" onclick="annullaConferma(${id})">
        <i class="bi bi-x"></i>
      </button>
    </div>
  `;
}

// Funzione per confermare l'eliminazione
function annullaConferma(id) {
  const span = document.getElementById(`conferma-${id}`);
  span.innerHTML = `
    <button class="btn btn-danger btn-sm" onclick="chiediConfermaEliminazione(${id})">Elimina</button>
  `;
}


function editVaccinations(id) {
  const currentVaccinations = document.getElementById(`vaccinazioni-${id}`).value;
  const vaccinazioniArray = currentVaccinations.split(',').map(v => v.trim()).filter(v => v);
  
  // Crea un prompt semplice per ora - puoi migliorare con un modal
  const newVaccinations = prompt('Modifica vaccinazioni (separate da virgola):', currentVaccinations);
  
  if (newVaccinations !== null) {
    document.getElementById(`vaccinazioni-${id}`).value = newVaccinations;
    // Aggiorna la visualizzazione
    const vaccinazioniArray = newVaccinations.split(',').map(v => v.trim()).filter(v => v);
    const vaccinazioniHtml = vaccinazioniArray.map(v => 
      `<span class="vaccination-item">${v}</span>`
    ).join(' ');
    
    const container = document.querySelector(`#animaliBody tr:nth-child(${Array.from(document.querySelectorAll('#animaliBody tr')).findIndex(row => row.innerHTML.includes(`id="vaccinazioni-${id}"`)) + 1}) .vaccination-container`);
    if (container) {
      container.innerHTML = vaccinazioniHtml;
    }
  }
}

function createAnimale() {
  const microchipEl = document.getElementById("microchipAnimale");
  const specieEl = document.getElementById("specie");
  const statoEl = document.getElementById("statoAnimale");
  const etaEl = document.getElementById("eta");
  const eta = parseInt(etaEl.value.trim());
  const microchip = microchipEl.value.trim();
  const specie = specieEl.value.trim();
  const stato = statoEl.value.trim();
  const vaccinazioni = selectedVaccinations;

  const erroreForm = document.getElementById("erroreForm");

  // Reset validazione
  [microchipEl, specieEl, statoEl, etaEl].forEach(el => el.classList.remove("is-invalid"));

  let valid = true;
  // Validazione campi obbligatori
  // Regex per microchip: almeno 15 caratteri numerici
  const microchipRegex = /^[a-zA-Z0-9]{15,}$/;
  if (!microchip || !microchipRegex.test(microchip)) {
    microchipEl.classList.add("is-invalid");
    valid = false;
  }
  // Controllo specie e stato 
  if (!specie) {
    specieEl.classList.add("is-invalid");
    valid = false;
  }
  // Controllo stato
  if (!stato) {
    statoEl.classList.add("is-invalid");
    valid = false;
  }
  // Controllo età non negativa e non superiore a 20
  if (isNaN(eta) || eta < 0 || eta > 20) {
  etaEl.classList.add("is-invalid");
  valid = false;
  }
  // Controllo vaccinazioni altre a "Non vaccinato" almeno una selezionata
  if (vaccinazioni.length === 0) {
    document.getElementById("vaccinazioniContainer").classList.add("is-invalid");
    valid = false;
  } else {
    document.getElementById("vaccinazioniContainer").classList.remove("is-invalid");
  }
  if (!valid) {
  erroreForm.textContent = "Compila correttamente tutti i campi obbligatori.";
  erroreForm.classList.remove("d-none");
  return;
}

// Controllo microchip duplicato
fetch(API_URL)
  .then(res => res.json())
  .then(animali => {
    const duplicato = animali.some(a => a.microchipAnimale === microchip);
    if (duplicato) {
      erroreForm.textContent = "Microchip già presente nel sistema.";
      erroreForm.classList.remove("d-none");
      microchipEl.classList.add("is-invalid");
      return;
    }

    erroreForm.classList.add("d-none");

    const animale = {
      nome: document.getElementById("nome").value,
      specie,
      razza: document.getElementById("razza").value,
      genere: document.getElementById("genere").value,
      taglia: document.getElementById("taglia").value,
      eta,
      descrizione: document.getElementById("descrizione").value,
      microchipAnimale: microchip,
      statoAnimale: stato,
      vaccinazioni: vaccinazioni.join(', ')
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animale)
    })
    .then(() => {
      clearForm();
      getAnimali();
    });
  });

  
}








function confermaEliminazione(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => getAnimali());
}

function clearForm() {
  document.getElementById("nome").value = '';
  document.getElementById("specie").value = '';
  document.getElementById("razza").value = '';
  document.getElementById("genere").value = '';
  document.getElementById("taglia").value = '';
  document.getElementById("eta").value = '';
  document.getElementById("microchipAnimale").value = '';
  document.getElementById("statoAnimale").value = '';
  document.getElementById("descrizione").value = '';
  
  // Reset vaccinazioni
  selectedVaccinations = [];
  document.querySelectorAll('#vaccinazioniDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });
  updateVaccinationDisplay();
}

// === GESTIONE ADOZIONI ===

let adozioneModal;

function openAdozioneForm(idAnimale) {
  document.getElementById('idAnimaleAdozione').value = idAnimale;
  document.getElementById('adozioneForm').reset();

  if (!adozioneModal) {
    adozioneModal = new bootstrap.Modal(document.getElementById('adozioneModal'));
  }
  adozioneModal.show();
}

function submitAdozione() {
  const adozione = {
    idAnimale: parseInt(document.getElementById("idAnimaleAdozione").value),
    nomeAdottante: document.getElementById("nomeAdottante").value,
    cognomeAdottante: document.getElementById("cognomeAdottante").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    dataAdozione: document.getElementById("dataAdozione").value,
    noteAggiuntive: document.getElementById("noteAggiuntive").value
  };

  fetch("/api/adozioni", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adozione)
  })
  .then(() => {
    adozioneModal.hide();
    window.location.href = "adozioni";
  });
}






["microchipAnimale","specie","statoAnimale"].forEach(id => {
  document.getElementById(id).addEventListener("input", e => {
    if (e.target.value.trim()) {
      e.target.classList.remove("is-invalid");
      if (!document.querySelector("#vaccinazioniContainer").classList.contains("is-invalid")) {
        document.getElementById("erroreForm").classList.add("d-none");
      }
    }
  });
});

document.getElementById("vaccinazioniDropdown").addEventListener("change", () => {
  const container = document.getElementById("vaccinazioniContainer");
  if (selectedVaccinations.length > 0) {
    container.classList.remove("is-invalid");
    document.getElementById("erroreForm").classList.add("d-none");
  }
});




let animaleCorrenteId = null;

function apriModificaAnimale(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(animale => {
      animaleCorrenteId = id;

      document.getElementById("mod-nome").value = animale.nome || '';
      document.getElementById("mod-specie").value = animale.specie || '';
      document.getElementById("mod-razza").value = animale.razza || '';
      document.getElementById("mod-genere").value = animale.genere || '';
      document.getElementById("mod-taglia").value = animale.taglia || '';
      document.getElementById("mod-eta").value = animale.eta || '';
      document.getElementById("mod-microchip").value = animale.microchipAnimale || '';
      document.getElementById("mod-stato").value = animale.statoAnimale || '';
      document.getElementById("mod-descrizione").value = animale.descrizione || '';
      document.getElementById("mod-vaccinazioni").value = animale.vaccinazioni || '';

      new bootstrap.Modal(document.getElementById('modificaAnimaleModal')).show();
    });
}




function salvaModificaAnimale() {
  const errore = document.getElementById("erroreModifica");
  errore.classList.add("d-none");

  // Raccolta dati
  const animale = {
    nome: document.getElementById("mod-nome").value.trim(),
    specie: document.getElementById("mod-specie").value.trim(),
    razza: document.getElementById("mod-razza").value.trim(),
    genere: document.getElementById("mod-genere").value.trim(),
    taglia: document.getElementById("mod-taglia").value.trim(),
    eta: parseInt(document.getElementById("mod-eta").value.trim()),
    microchipAnimale: document.getElementById("mod-microchip").value.trim(),
    statoAnimale: document.getElementById("mod-stato").value.trim(),
    vaccinazioni: document.getElementById("mod-vaccinazioni").value.trim(),
    descrizione: document.getElementById("mod-descrizione").value.trim()
  };

  // Reset classi invalid
  ["mod-specie", "mod-stato", "mod-eta", "mod-microchip", "mod-vaccinazioni"].forEach(id => {
    document.getElementById(id).classList.remove("is-invalid");
  });

  // === VALIDAZIONE ===
  let valid = true;
  const microchipRegex = /^[a-zA-Z0-9]{15,}$/;

  if (!animale.microchipAnimale || !microchipRegex.test(animale.microchipAnimale)) {
    document.getElementById("mod-microchip").classList.add("is-invalid");
    errore.textContent = "Il microchip deve avere almeno 15 caratteri alfanumerici.";
    valid = false;
  }

  if (!animale.specie) {
    document.getElementById("mod-specie").classList.add("is-invalid");
    errore.textContent = "La specie è obbligatoria.";
    valid = false;
  }

  if (!animale.statoAnimale) {
    document.getElementById("mod-stato").classList.add("is-invalid");
    errore.textContent = "Lo stato dell'animale è obbligatorio.";
    valid = false;
  }

  if (isNaN(animale.eta) || animale.eta < 0 || animale.eta > 20) {
    document.getElementById("mod-eta").classList.add("is-invalid");
    errore.textContent = "L'età deve essere un numero tra 0 e 20.";
    valid = false;
  }

  if (!animale.vaccinazioni) {
    document.getElementById("mod-vaccinazioni").classList.add("is-invalid");
    errore.textContent = "Inserisci almeno una vaccinazione o 'Non vaccinato'.";
    valid = false;
  }

  if (!valid) {
    errore.classList.remove("d-none");
    return;
  }

  // TUTTO OK → aggiorna
  fetch(`${API_URL}/${animaleCorrenteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(animale)
  })
  .then(() => {
    bootstrap.Modal.getInstance(document.getElementById("modificaAnimaleModal")).hide();
    getAnimali();
  });
}

