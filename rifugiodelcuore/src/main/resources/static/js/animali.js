const API_URL = '/api/animali';

    // Carica animali all’avvio
    window.onload = getAnimali;



// sezione per rendere sisponibili il menù a tendina delle razze in base alla specie selezionata
  const razze = {
  Cane: [
    "Australian Shepherd", "Beauceron", "Belgian Malinois",
    "Border Collie", "Bouvier des Flandres", "Boxer",
    "Dobermann", "Golden Retriever", "German Shepherd Dog",
    "Labrador Retriever", "Rottweiler", "Siberian Husky",
    "Basenji", "Affenpinscher", "Akita", "Dalmatian", "Whippet",
    "Incrocio", // ...ecc.
    
  ],
  Gatto: [
    "Europeo", "Siamese", "Persiano", "Maine Coon", "British Shorthair", "Ragdoll",
    "Sphynx", "Abissino", "Sacred of Birmania", "Norvegese delle Foreste", "Scottish Fold",
    "Orientale", "Bengala", "Devon Rex", "Cornish Rex", "American Curl", "American Shorthair",
    "Turco Van", "Siberiano", "Somalo", "Balinese", "Manx", "Tonkinese", "Ocicat", "Bombay",
    "Chartreux", "Havana Brown", "Peterbald", "Exotic Shorthair", "Russian Blue", "LaPerm",
    "Colorpoint Shorthair","Incrocio" // ...ecc.
  ]
};

document.getElementById("specie").addEventListener("change", function () {
  const specieSelezionata = this.value;
  const selectRazza = document.getElementById("razza");

  // Svuota e imposta messaggio iniziale
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









    function getAnimali() {
      fetch(API_URL)
        .then(res => res.json())
        .then(animali => {
          const tbody = document.getElementById('animaliBody');
          tbody.innerHTML = '';

          animali.forEach(animale => {
            const row = document.createElement('tr');

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
              <td><input class="form-control" value="${animale.vaccinazioni || ''}" id="vaccinazioni-${animale.id}"></td>
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

    function createAnimale() {
      const animale = {
      nome: document.getElementById("nome").value,
      specie: document.getElementById("specie").value,
      razza: document.getElementById("razza").value,
      genere: document.getElementById("genere").value,
      taglia: document.getElementById("taglia").value,
      eta: parseInt(document.getElementById("eta").value),
      descrizione: document.getElementById("descrizione").value,
      microchipAnimale: document.getElementById("microchipAnimale").value,
      statoAnimale: document.getElementById("statoAnimale").value,
      vaccinazioni: document.getElementById("vaccinazioni").value

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
    }

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
    }

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
        window.location.href = "adozioni.html"; // Redirect
      });
    }
