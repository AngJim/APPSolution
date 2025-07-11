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
          <td><input class="form-control" value="${animale.nome}" id="nome-${animale.id}"></td>
          <td><input class="form-control" value="${animale.specie}" id="specie-${animale.id}"></td>
          <td><input class="form-control" value="${animale.razza}" id="razza-${animale.id}"></td>
          <td><input class="form-control" value="${animale.genere}" id="genere-${animale.id}"></td>
          <td><input type="number" class="form-control" value="${animale.eta}" id="eta-${animale.id}"></td>
          <td><input class="form-control" value="${animale.taglia}" id="taglia-${animale.id}"></td>
          <td><input class="form-control" value="${animale.descrizione || ''}" id="descrizione-${animale.id}"></td>
          <td><input class="form-control" value="${animale.microchipAnimale}" id="microchip-${animale.id}"></td>
          <td>
            <select class="form-select" id="stato-${animale.id}">
              <option value="Disponibile" ${animale.statoAnimale === 'Disponibile' ? 'selected' : ''}>Disponibile</option>
              <option value="Adottato" ${animale.statoAnimale === 'Adottato' ? 'selected' : ''}>Adottato</option>
              <option value="In cura" ${animale.statoAnimale === 'In cura' ? 'selected' : ''}>In cura</option>
            </select>
          </td>
          <td>
            <div class="vaccination-container" style="min-height: 40px;">
              ${vaccinazioniHtml}
            </div>
              <input type="text" class="form-control" id="vaccinazioni-${animale.id}" value="${vaccinazioni}">
          </td>
          <td>
            <button class="btn btn-warning btn-sm me-1" onclick="updateAnimale(${animale.id})">Modifica</button>
            <button class="btn btn-danger btn-sm" onclick="deleteAnimale(${animale.id})">Elimina</button>
            <button class="btn btn-info btn-sm me-1" onclick="openAdozioneForm(${animale.id})">Registra Adozione</button>
          </td>
        `;

        tbody.appendChild(row);
      });
    });
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
  // Regex per microchip: almeno 10 caratteri numerici
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
  // Controllo età non negativa e non superiore a 50
  if (isNaN(eta) || eta < 0 || eta > 50) {
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



  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(animale)
  })
  .then(() => {
    clearForm();
    getAnimali();
  });


function updateAnimale(id) {
  const updated = {
    nome: document.getElementById(`nome-${id}`).value,
    specie: document.getElementById(`specie-${id}`).value,
    razza: document.getElementById(`razza-${id}`).value,
    genere: document.getElementById(`genere-${id}`).value,
    taglia: document.getElementById(`taglia-${id}`).value,
    eta: parseInt(document.getElementById(`eta-${id}`).value),
    microchipAnimale: document.getElementById(`microchip-${id}`).value,
    statoAnimale: document.getElementById(`stato-${id}`).value,
    descrizione: document.getElementById(`descrizione-${id}`).value,
    vaccinazioni: document.getElementById(`vaccinazioni-${id}`).value
  };

  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(animale => {
      const newAnimale = { ...animale, ...updated };
      return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnimale)
      });
    })
    .then(() => getAnimali());
}

function deleteAnimale(id) {
  if (confirm('Sei sicuro di voler eliminare questo animale?')) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => getAnimali());
  }
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
