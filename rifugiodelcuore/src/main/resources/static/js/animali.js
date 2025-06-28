const API_URL = '/api/animali';

    // Carica animali all’avvio
    window.onload = getAnimali;

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
              <td>
                <button class="btn btn-warning btn-sm me-1" onclick="updateAnimale(${animale.id})">Modifica</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAnimale(${animale.id})">Elimina</button>
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
        immagineUrl: document.getElementById("immagineUrl").value,
        descrizione: document.getElementById("descrizione").value
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
        eta: parseInt(document.getElementById(`eta-${id}`).value)
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
      document.getElementById("immagineUrl").value = '';
      document.getElementById("descrizione").value = '';
    }