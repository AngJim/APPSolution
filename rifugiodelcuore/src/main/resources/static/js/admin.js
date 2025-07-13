document.addEventListener("DOMContentLoaded", function() {
    caricaAdmins();
});

function caricaAdmins() {
    fetch("/api/admin")
        .then(response => response.json())
        .then(admins => {
            const adminBody = document.getElementById("adminBody");
            adminBody.innerHTML = "";
            admins.forEach(admin => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${admin.idAdmin}</td>
                    <td>${admin.nome}</td>
                    <td>${admin.cognome}</td>
                    <td>${admin.email}</td>
                    <td></td>
                `;

                const azioniTd = row.querySelector("td:last-child");

                // Bottone "Modifica"
                const btnModifica = document.createElement("button");
                btnModifica.className = "btn btn-sm btn-warning me-1";
                btnModifica.textContent = "Modifica";
                btnModifica.addEventListener("click", () => {
                    apriModifica(admin.idAdmin, admin.nome, admin.cognome, admin.email);
                });

                // Bottone "Elimina"
                const btnElimina = document.createElement("button");
                btnElimina.className = "btn btn-sm btn-danger";
                btnElimina.textContent = "Elimina";
                btnElimina.addEventListener("click", () => {
                    eliminaAdmin(admin.idAdmin);
                });

                azioniTd.appendChild(btnModifica);
                azioniTd.appendChild(btnElimina);

                adminBody.appendChild(row);
            });
        })
        .catch(error => console.error("Errore nel caricamento admin:", error));
}

function isValidEmail(email) {
  // Controllo semplice ma efficace
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(pwd) {
  // Minimo 8 caratteri, almeno una lettera e un numero
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pwd);
}

function createAdmin() {
  const nome = document.getElementById("nome");
  const cognome = document.getElementById("cognome");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const erroreForm = document.getElementById("erroreForm");

  // Pulisci eventuali errori visivi precedenti
  [nome, cognome, email, password].forEach(el => el.classList.remove("is-invalid"));
  erroreForm.classList.add("d-none");

  let valid = true;

  if (!nome.value.trim()) {
    nome.classList.add("is-invalid");
    valid = false;
  }

  if (!cognome.value.trim()) {
    cognome.classList.add("is-invalid");
    valid = false;
  }

  if (!isValidEmail(email.value.trim())) {
    email.classList.add("is-invalid");
    valid = false;
  }

  if (!isStrongPassword(password.value.trim())) {
    password.classList.add("is-invalid");
    valid = false;
  }

  if (!valid) {
    erroreForm.classList.remove("d-none");
    return;
  }

  // Se tutto è valido, invia
  const admin = {
    nome: nome.value.trim(),
    cognome: cognome.value.trim(),
    email: email.value.trim(),
    password: password.value.trim()
  };

  fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(admin)
  })
    .then(response => {
      if (!response.ok) throw new Error("Errore nella creazione admin");
      return response.json();
    })
    .then(() => {
      caricaAdmins();
      [nome, cognome, email, password].forEach(el => el.value = "");
    })
    .catch(error => console.error("Errore:", error));
}



function eliminaAdmin(idAdmin) {
    if (!confirm("Sei sicuro di voler eliminare questo admin?")) return;

    fetch(`/api/admin/${idAdmin}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error("Errore nell'eliminazione");
            caricaAdmins();
        })
        .catch(error => console.error("Errore:", error));
}

function apriModifica(id, nome, cognome, email) {
    document.getElementById("modifica_idAdmin").value = id;
    document.getElementById("modifica_nome").value = nome;
    document.getElementById("modifica_cognome").value = cognome;
    document.getElementById("modifica_email").value = email;
    document.getElementById("modifica_password").value = "";

    const modalElement = document.getElementById('modificaModal');
    let modal = bootstrap.Modal.getInstance(modalElement);

    // Se il modale non esiste ancora, crealo
    if (!modal) {
        modal = new bootstrap.Modal(modalElement);
    }

    modal.show();
}

function salvaModifica() {
    const idAdmin = document.getElementById("modifica_idAdmin").value;
    const nome = document.getElementById("modifica_nome").value.trim();
    const cognome = document.getElementById("modifica_cognome").value.trim();
    const email = document.getElementById("modifica_email").value.trim();
    const password = document.getElementById("modifica_password").value.trim();

    const admin = { nome, cognome, email };
    if (password) admin.password = password;

    fetch(`/api/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idAdmin, ...admin })
    })
    .then(response => {
        if (!response.ok) throw new Error("Errore nella modifica admin");
        return response.json();
    })
    .then(() => {
        var modal = bootstrap.Modal.getInstance(document.getElementById('modificaModal'));
        modal.hide();
        caricaAdmins();
    })
    .catch(error => console.error("Errore:", error));
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