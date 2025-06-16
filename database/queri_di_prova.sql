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
 
-- mostra tutte le prenotazioni adozione 
SELECT * FROM rifugio_del_cuore.prenotazioni_adozione;
-- ==========================================
-- 🐾 SEZIONE 1: QUERY SUGLI ANIMALI
-- ==========================================

-- 1. Elenco degli animali attualmente disponibili per l'adozione
SELECT * 
FROM animali
WHERE stato_adozione = 'Disponibile';

-- 2. Elenco degli animali che necessitano cure veterinarie
SELECT nome, specie, razza, stato_salute
FROM animali
WHERE stato_salute = 'Bisogno cure';

-- 3. Numero di animali per taglia (piccola, media, grande)
SELECT taglia, COUNT(*) AS numero_animali
FROM animali
GROUP BY taglia;

-- ==========================================
-- 🏥 SEZIONE 2: VISITE VETERINARIE
-- ==========================================

-- 4. Tutte le visite registrate per un animale specifico (es. ID = 3)
SELECT v.*, vet.nome AS nome_veterinario, vet.cognome AS cognome_veterinario
FROM visite v
JOIN veterinari vet ON v.id_veterinario = vet.id_veterinario
WHERE v.id_animale = 3;

-- 5. Visite con urgenza 'Alta' (emergenze)
SELECT a.nome AS nome_animale, v.*
FROM visite v
JOIN animali a ON v.id_animale = a.id_animale
WHERE v.urgenza = 'Alta';

-- ==========================================
-- 👨‍⚕️ SEZIONE 3: VETERINARI
-- ==========================================

-- 6. Elenco dei veterinari con la clinica e la specializzazione
SELECT nome, cognome, clinica, specializzazione
FROM veterinari;

-- ==========================================
-- 🐶 SEZIONE 4: ADOZIONI
-- ==========================================

-- 7. Adozioni effettuate nell'ultima settimana
SELECT *
FROM adozioni
WHERE data_adozione >= CURDATE() - INTERVAL 7 DAY;

-- 8. Numero di animali adottati per specie
SELECT a.specie, COUNT(*) AS totale_adottati
FROM animali a
JOIN adozioni ad ON a.id_animale = ad.id_animale
GROUP BY a.specie;

-- ==========================================
-- 📅 SEZIONE 5: PRENOTAZIONI ADOZIONE
-- ==========================================

-- 9. Prenotazioni che sono ancora in attesa di approvazione
SELECT *
FROM prenotazioni_adozione
WHERE stato = 'In attesa';

-- 10. Prossime prenotazioni non archiviate, ordinate per data/orario
SELECT *
FROM prenotazioni_adozione
WHERE archiviato = FALSE
ORDER BY data_appuntamento, orario_appuntamento;

-- ==========================================
-- 💰 SEZIONE 6: DONAZIONI
-- ==========================================

-- 11. Totale complessivo delle donazioni ricevute
SELECT SUM(importo) AS totale_donazioni
FROM donazioni;

-- 12. Donazioni suddivise per metodo di pagamento
SELECT metodo_pagamento, COUNT(*) AS numero_donazioni, SUM(importo) AS totale_raccolto
FROM donazioni
GROUP BY metodo_pagamento;

-- ==========================================
-- 📋 SEZIONE 7: JOIN MULTITABELLA
-- ==========================================

-- 13. Dettagli adozioni: nome animale + adottante + data adozione
SELECT 
  a.nome AS animale,
  a.specie,
  ad.nome_adottante,
  ad.cognome_adottante,
  ad.data_adozione
FROM adozioni ad
JOIN animali a ON ad.id_animale = a.id_animale
ORDER BY ad.data_adozione DESC;


-- ##################################################################
-- # QUERY 1 - Animali adottati con informazioni sull’adottante
-- ##################################################################
SELECT 
  a.nome AS nome_animale,
  a.specie,
  a.razza,
  ad.nome_adottante,
  ad.cognome_adottante,
  ad.data_adozione
FROM animali a
JOIN adozioni ad ON a.id_animale = ad.id_animale
ORDER BY ad.data_adozione DESC;

-- Spiegazione:
-- Questa query unisce la tabella animali con quella delle adozioni
-- per mostrare i dati degli animali che sono stati adottati,
-- insieme ai dati dell’adottante e la data dell’adozione.

-- ##################################################################
-- # QUERY 2 - Elenco delle visite veterinarie con nome veterinario
-- ##################################################################
SELECT 
  v.id_visita,
  a.nome AS nome_animale,
  vet.nome AS nome_veterinario,
  vet.cognome AS cognome_veterinario,
  v.data_visita,
  v.orario_visita,
  v.tipo_visita,
  v.urgenza
FROM visite v
JOIN animali a ON v.id_animale = a.id_animale
JOIN veterinari vet ON v.id_veterinario = vet.id_veterinario
ORDER BY v.data_visita DESC;

-- Spiegazione:
-- Questa query mostra tutte le visite con i nomi degli animali
-- e i dettagli del veterinario che ha effettuato la visita.

-- ##################################################################
-- # QUERY 3 - Prenotazioni per adozione con info animale
-- ##################################################################
SELECT 
  pa.id_prenotazione,
  pa.nome AS nome_prenotante,
  pa.cognome AS cognome_prenotante,
  a.nome AS nome_animale,
  pa.data_appuntamento,
  pa.orario_appuntamento,
  pa.stato
FROM prenotazioni_adozione pa
JOIN animali a ON pa.id_animale = a.id_animale
ORDER BY pa.data_appuntamento;

-- Spiegazione:
-- La query unisce le prenotazioni alle informazioni sugli animali
-- per sapere chi ha richiesto un appuntamento e per quale animale.

-- ##################################################################
-- # QUERY 4 - Dettagli adozione con ultima visita prima dell’adozione
-- ##################################################################
SELECT 
  a.nome AS animale,
  ad.nome_adottante,
  ad.data_adozione,
  v.data_visita,
  v.tipo_visita AS tipo_visita_precedente
FROM adozioni ad
JOIN animali a ON ad.id_animale = a.id_animale
LEFT JOIN visite v 
  ON v.id_animale = a.id_animale 
  AND v.data_visita <= ad.data_adozione
ORDER BY ad.data_adozione DESC, v.data_visita DESC;

-- Spiegazione:
-- Query avanzata che mostra per ogni animale adottato
-- anche l’ultima visita effettuata prima della data di adozione.
-- Usiamo LEFT JOIN perché non tutti gli animali potrebbero aver fatto visite.

-- ##################################################################
-- # QUERY 5 - Veterinari e tutti gli animali visitati
-- ##################################################################
SELECT 
  vet.nome AS nome_veterinario,
  vet.cognome AS cognome_veterinario,
  a.nome AS nome_animale,
  v.data_visita,
  v.tipo_visita,
  v.urgenza
FROM visite v
JOIN veterinari vet ON v.id_veterinario = vet.id_veterinario
JOIN animali a ON v.id_animale = a.id_animale
ORDER BY vet.cognome, v.data_visita;

-- Spiegazione:
-- Questa query consente di sapere per ogni veterinario
-- quali animali ha visitato e con quale tipo di intervento.

-- ##################################################################
-- # QUERY 6 - Numero visite per ogni animale
-- ##################################################################
SELECT 
  a.nome,
  a.specie,
  COUNT(v.id_visita) AS numero_visite
FROM animali a
LEFT JOIN visite v ON a.id_animale = v.id_animale
GROUP BY a.id_animale
ORDER BY numero_visite DESC;

-- Spiegazione:
-- Elenca ogni animale con il numero totale di visite ricevute.
-- Anche gli animali senza visite (0) vengono mostrati grazie al LEFT JOIN.

-- ##################################################################
-- # QUERY 7 - Donazioni superiori a 50€, ordinate per importo
-- ##################################################################
SELECT 
  nome_donatore,
  importo,
  metodo_pagamento,
  data_donazione,
  note
FROM donazioni
WHERE importo > 50
ORDER BY importo DESC;

-- Spiegazione:
-- Query semplice senza JOIN, ma utile per analizzare i maggiori donatori.

-- ##################################################################
-- # QUERY 8 - Animali con più prenotazioni di adozione
-- ##################################################################
SELECT 
  a.nome AS animale,
  COUNT(pa.id_prenotazione) AS numero_prenotazioni
FROM animali a
LEFT JOIN prenotazioni_adozione pa ON a.id_animale = pa.id_animale
GROUP BY a.id_animale
HAVING numero_prenotazioni > 1
ORDER BY numero_prenotazioni DESC;

-- Spiegazione:
-- Utile per sapere quali animali ricevono più richieste di adozione.

