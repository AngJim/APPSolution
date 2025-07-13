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

                const btnModifica = document.createElement("button");
                btnModifica.className = "btn btn-sm btn-warning me-2";
                btnModifica.textContent = "Modifica";
                btnModifica.addEventListener("click", () => {
                    mostraFormModifica(admin);
                });
                azioniTd.appendChild(btnModifica);
                
                // Bottone "Elimina"
                const btnElimina = document.createElement("button");
                btnElimina.className = "btn btn-sm btn-danger";
                btnElimina.textContent = "Elimina";
                btnElimina.addEventListener("click", () => {
                    eliminaAdmin(admin.idAdmin);
                });

                
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




function mostraFormModifica(admin) {
    document.getElementById("modificaId").value = admin.idAdmin;
    document.getElementById("modificaNome").value = admin.nome;
    document.getElementById("modificaCognome").value = admin.cognome;
    document.getElementById("modificaEmail").value = admin.email;
    document.getElementById("modificaPassword").value = "";

    const modal = new bootstrap.Modal(document.getElementById("modificaModal"));
    modal.show();
}




function salvaModificaAdmin() {
    const id = document.getElementById("modificaId");
    const nome = document.getElementById("modificaNome");
    const cognome = document.getElementById("modificaCognome");
    const email = document.getElementById("modificaEmail");
    const password = document.getElementById("modificaPassword");
    const erroreForm = document.getElementById("erroreModificaForm");

    // Pulisce validazioni precedenti
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

    // Password: se presente, deve essere valida
    if (password.value.trim() && !isStrongPassword(password.value.trim())) {
        password.classList.add("is-invalid");
        valid = false;
    }

    if (!valid) {
        erroreForm.classList.remove("d-none");
        return;
    }

    const adminModificato = {
        nome: nome.value.trim(),
        cognome: cognome.value.trim(),
        email: email.value.trim()
    };

    if (password.value.trim()) {
        adminModificato.password = password.value.trim();
    }

    fetch(`/api/admin/${id.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminModificato)
    })
    .then(response => {
        if (!response.ok) throw new Error("Errore nella modifica admin");
        return response.json();
    })
    .then(() => {
        caricaAdmins();
        const modal = bootstrap.Modal.getInstance(document.getElementById("modificaModal"));
        modal.hide();
    })
    .catch(error => console.error("Errore modifica:", error));
}

