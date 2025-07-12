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
                    <td>
                        <button class="btn btn-sm btn-warning me-1" onclick="apriModifica(${admin.idAdmin}, '${admin.nome}', '${admin.cognome}', '${admin.email}')">Modifica</button>
                        <button class="btn btn-sm btn-danger" onclick="eliminaAdmin(${admin.idAdmin})">Elimina</button>
                    </td>
                `;
                adminBody.appendChild(row);
            });
        })
        .catch(error => console.error("Errore nel caricamento admin:", error));
}

function createAdmin() {
    const nome = document.getElementById("nome").value.trim();
    const cognome = document.getElementById("cognome").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!nome || !cognome || !email || !password) {
        alert("Compila tutti i campi");
        return;
    }

    const admin = { nome, cognome, email, password };

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
        // pulisci form
        document.getElementById("nome").value = "";
        document.getElementById("cognome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
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

    var modal = new bootstrap.Modal(document.getElementById('modificaModal'));
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
