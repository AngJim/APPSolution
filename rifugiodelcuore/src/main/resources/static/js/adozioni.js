const API_URL = '/api/adozioni';

    // Carica Adozioni all’avvio
    window.onload = getAdozioni;

    function getAdozioni() {
  fetch(API_URL)
    .then(res => res.json())
    .then(adozioni => {
      const tbody = document.getElementById('adozioniBody');
      tbody.innerHTML = '';

      adozioni.forEach(adozione => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${adozione.idAdozione}</td>
          <td>${adozione.nomeAdottante}</td>
          <td>${adozione.cognomeAdottante}</td>
          <td>${adozione.email ?? ''}</td>
          <td>${adozione.telefono}</td>
          <td>${adozione.dataAdozione}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1" onclick="updateAdozione(${adozione.id})">Modifica</button>
            <button class="btn btn-danger btn-sm" onclick="deleteAdozione(${adozione.id})">Elimina</button>
          </td>
        `;

        tbody.appendChild(row);
      });
    });
}


    function createadozione() {
        const adozione = {
          nomeAdottante: document.getElementById("nomeAdottante").value,
          cognomeAdottante: document.getElementById("cognomeAdottante").value,
          email: document.getElementById("email").value,
          telefono: document.getElementById("telefono").value,
          dataAdozione: document.getElementById("dataAdozione").value,
          noteAggiuntive: document.getElementById("noteAggiuntive").value
        };

      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adozione)
      })
      .then(() => {
        clearForm();
        getAdozioni();
      });
    }

    function updateAdozione(id) {
      const updated = {
        nomeAdottante: document.getElementById(`nomeAdottante-${id}`).value,
        cognomeAdottante: document.getElementById(`cognomeAdottante-${id}`).value,
        email: document.getElementById(`email-${id}`).value,
        telefono: document.getElementById(`telefono-${id}`).value,
        dataAdozione: document.getElementById(`dataAdozione-${id}`).value,
        noteAggiuntive: document.getElementById(`noteAggiuntive-${id}`).value
      };

      fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(adozione => {
          const newAdozione = { ...adozione, ...updated };
          return fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAdozione)
          });
        })
        .then(() => getAdozioni());
    }

    function deleteAdozione(id) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => getAdozioni());
    }

    function clearForm() {
      document.getElementById("nomeAdottante").value = '';
      document.getElementById("cognomeAdottante").value = '';
      document.getElementById("email").value = '';
      document.getElementById("telefono").value = '';
      document.getElementById("dataAdozione").value = '';
      document.getElementById("noteAggiuntive").value = '';
    }