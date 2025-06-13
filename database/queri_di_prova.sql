-- queri di prova per db rifugio del cuore
-- ================================
-- 1. VISUALIZZAZIONE DI BASE
-- ================================

-- Mostra tutti gli animali registrati nel rifugio
SELECT * FROM animali;

-- Mostra solo gli animali disponibili per adozione
SELECT * FROM animali
WHERE stato_adozione = 'Disponibile';

-- Mostra tutte le visite veterinarie effettuate
SELECT * FROM visite;


-- mostra tutti gli admin 
select*from admin;

-- mostra tutte le donazioni 
SELECT * FROM rifugio_del_cuore.donazioni;

-- mostra tutti le adozioni
 select*from adozioni;	
-- ================================
-- 2. JOIN TRA TABELLE
-- ================================

-- Mostra tutte le visite con il nome dell’animale coinvolto
SELECT v.id_visita, a.nome AS animale, v.veterinario_clinica, v.data_visita, v.orario_visita, v.tipo_visita, v.urgenza
FROM visite v
JOIN animali a ON v.id_animale = a.id_animale
ORDER BY v.data_visita;

-- Mostra tutti gli appuntamenti per l’adozione con il nome dell’animale
SELECT ad.nome, ad.cognome, ad.email, ad.telefono, ad.data_appuntamento, ad.orario_appuntamento, a.nome AS animale
FROM adozioni ad
JOIN animali a ON ad.id_animale = a.id_animale
ORDER BY ad.data_appuntamento;


-- 1. Elenco visite con dati dell’animale e del veterinario
SELECT 
  v.id_visita,
  a.nome AS nome_animale,
  a.specie,
  vet.nome AS nome_veterinario,
  vet.cognome AS cognome_veterinario,
  v.data_visita,
  v.orario_visita,
  v.tipo_visita,
  v.urgenza
FROM visite v
JOIN animali a ON v.id_animale = a.id_animale
JOIN veterinari vet ON v.id_veterinario = vet.id_veterinario;
-- Mostra tutte le visite, includendo i dati dell’animale e del veterinario coinvolto.

-- --------------------------------------------------------------

-- 2. Animali adottati e dati dell’adottante
SELECT 
  ani.nome AS nome_animale,
  ani.specie,
  a.nome AS nome_adottante,
  a.cognome,
  a.data_appuntamento,
  a.orario_appuntamento
FROM adozioni a
JOIN animali ani ON a.id_animale = ani.id_animale
WHERE ani.stato_adozione = 'Adottato';
-- Elenca solo gli animali già adottati e i dati dell’adottante corrispondente.

-- --------------------------------------------------------------

-- 3. Totale donazioni per metodo di pagamento
SELECT 
  metodo_pagamento,
  COUNT(*) AS numero_donazioni,
  SUM(importo) AS totale_raccolto
FROM donazioni
GROUP BY metodo_pagamento;
-- Riepiloga quante donazioni sono state fatte per ciascun metodo e l’importo totale.

-- --------------------------------------------------------------

-- 4. Animali con almeno una visita effettuata
SELECT DISTINCT 
  a.id_animale,
  a.nome,
  a.specie,
  a.razza
FROM animali a
JOIN visite v ON a.id_animale = v.id_animale;
-- Mostra solo gli animali che hanno almeno una visita registrata.

-- --------------------------------------------------------------

-- 5. Veterinari che hanno effettuato più di una visita
SELECT 
  vet.id_veterinario,
  vet.nome,
  vet.cognome,
  COUNT(v.id_visita) AS numero_visite
FROM visite v
JOIN veterinari vet ON v.id_veterinario = vet.id_veterinario
GROUP BY vet.id_veterinario
HAVING COUNT(v.id_visita) > 1;
-- Elenca i veterinari che hanno visitato più di un animale.

-- --------------------------------------------------------------

-- 6. Animali disponibili ma senza prenotazioni di adozione
SELECT 
  a.id_animale,
  a.nome,
  a.specie,
  a.razza,
  a.stato_adozione
FROM animali a
LEFT JOIN adozioni ad ON a.id_animale = ad.id_animale
WHERE a.stato_adozione = 'Disponibile' AND ad.id_adozione IS NULL;
-- Mostra animali adottabili che non sono ancora stati prenotati da nessuno.

-- --------------------------------------------------------------

-- 7. Ultime 5 donazioni ricevute (più recenti)
SELECT 
  nome_donatore,
  importo,
  metodo_pagamento,
  data_donazione,
  note
FROM donazioni
ORDER BY data_donazione DESC
LIMIT 5;
-- Visualizza le ultime cinque donazioni in ordine dalla più recente.


-- ================================
-- 3. STATISTICHE E ANALISI
-- ================================

-- Conta quanti animali ci sono per ciascun stato di adozione
SELECT stato_adozione, COUNT(*) AS totale
FROM animali
GROUP BY stato_adozione;

-- Conta quante visite ci sono per ciascun livello di urgenza
SELECT urgenza, COUNT(*) AS numero_visite
FROM visite
GROUP BY urgenza;

-- ================================
-- 4. FILTRI E RICERCHE
-- ================================

-- Trova tutti gli animali femmine di taglia piccola
SELECT * FROM animali
WHERE taglia = 'Piccola' AND genere = 'Femmina';

-- Trova tutte le visite con urgenza alta
SELECT * FROM visite
WHERE urgenza = 'Alta';

-- Trova tutte le visite programmate dopo la data odierna
SELECT * FROM visite
WHERE data_visita > CURDATE()
ORDER BY data_visita;

-- ================================
-- 5. INSERIMENTO DI DATI DI PROVA
-- ================================

-- Aggiungi un nuovo animale al rifugio
INSERT INTO animali (nome, specie, razza, eta, genere, taglia, stato_adozione, descrizione)
VALUES ('Bruno', 'Cane', 'Terranova', 2, 'Maschio', 'Grande', 'Disponibile', 'Molto tranquillo e docile.');

-- Aggiungi una visita veterinaria per l’animale appena inserito (supponiamo abbia ID 11)
INSERT INTO visite (id_animale, veterinario_clinica, data_visita, orario_visita, tipo_visita, urgenza, note_aggiuntive)
VALUES (11, 'Veterinaria Dr.ssa Lupo', '2025-06-20', '11:00:00', 'Controllo denti', 'Media', 'Controllo per tartaro.');

-- ================================
-- 6. MODIFICA E CANCELLAZIONE
-- ================================

-- Aggiorna lo stato di adozione di un animale (es. ID 1)
UPDATE animali
SET stato_adozione = 'Adottato'
WHERE id_animale = 1;

-- Elimina una visita specifica (es. ID 5)
DELETE FROM visite
WHERE id_visita = 5;
