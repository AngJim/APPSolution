const API_VET = '/api/veterinari';

/*  carica elenco all’avvio */
document.addEventListener('DOMContentLoaded', () => caricaVets());

/* ------- GET semplice ------- */
function caricaVets(query = '') {
  fetch(`${API_VET}${query}`)
    .then(r => r.json())
    .then(popolaTabella)
    .catch(e => console.error('Errore caricamento veterinari', e));
}

/* ------- riempi tbody ------- */
function popolaTabella(array) {
  const tbody = document.getElementById('vetsBody');
  tbody.innerHTML = '';

  array.forEach(v => {
    const u = v.utente ?? {};          // anagrafica collegata

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.codiceFiscale  || ''}</td>
      <td>${u.nome           || ''}</td>
      <td>${u.cognome        || ''}</td>
      <td>${u.telefono       || ''}</td>
      <td>${u.email          || ''}</td>
      <td>${u.dataNascita    || ''}</td>
      <td>${v.clinica        || ''}</td>
      <td>${v.specializzazione || ''}</td>
      <td>${v.tipoContratto  || ''}</td>`;
    tbody.appendChild(tr);
  });
}


/* ------- filtri ------- */
function filtraVets() {
  const params = new URLSearchParams();

  const nome   = document.getElementById('f_nome').value.trim();
  const cogn   = document.getElementById('f_cognome').value.trim();
  const cf     = document.getElementById('f_cf').value.trim();
  const clin   = document.getElementById('f_clinica').value.trim();
  const spec   = document.getElementById('f_special').value.trim();

  if (nome) params.append('nome',   nome);
  if (cogn) params.append('cognome',cogn);
  if (cf)   params.append('cf',     cf);
  if (clin) params.append('clinica',clin);
  if (spec) params.append('specializzazione', spec);

  const q = params.toString();
  caricaVets(q ? '/search?' + q : '');
}

function resetFiltri() {

  // azzera tutti i campi input
  ['f_nome', 'f_cognome', 'f_cf', 'f_clinica', 'f_special']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });

  // ricarica l'intera lista (nessun filtro)
  caricaVets();        // equivale a caricaVets('');
}
