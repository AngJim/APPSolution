-- 1. Elenco completo degli animali
SELECT * FROM animali;

-- 2. Animali attualmente disponibili all’adozione
SELECT nome, specie, razza, genere, stato_adozione
FROM animali
WHERE stato_adozione = 'Disponibile';

-- 3. Adozioni effettuate nel mese di giugno 2025
SELECT a.nome AS animale, ad.nome_adottante, ad.cognome_adottante, ad.data_adozione
FROM adozioni ad
JOIN animali a ON ad.id_animale = a.id_animale
WHERE MONTH(ad.data_adozione) = 6 AND YEAR(ad.data_adozione) = 2025;

-- 4. Visite veterinarie urgenti (urgenza = 'Alta')
SELECT v.data_visita, v.orario_visita, a.nome AS animale, vet.nome AS veterinario, v.tipo_visita
FROM visite v
JOIN animali a ON v.id_animale = a.id_animale
JOIN veterinari vet ON v.id_veterinario = vet.id_veterinario
WHERE v.urgenza = 'Alta';

-- 5. Donazioni ricevute tramite bonifico
SELECT nome_donatore, importo, data_donazione
FROM donazioni
WHERE metodo_pagamento = 'bonifico';

-- 6. Totale donazioni ricevute nel mese corrente
SELECT SUM(importo) AS totale_donazioni_mese_corrente
FROM donazioni
WHERE MONTH(data_donazione) = MONTH(CURDATE()) AND YEAR(data_donazione) = YEAR(CURDATE());

-- 7. Prenotazioni in attesa per animali già adottati
SELECT p.nome, p.cognome, a.nome AS animale, p.data_appuntamento, p.stato
FROM prenotazioni_adozione p
JOIN animali a ON p.id_animale = a.id_animale
WHERE p.stato = 'In attesa' AND a.stato_adozione = 'Adottato';

-- 8. Elenco veterinari ordinati per cognome
SELECT nome, cognome, clinica, specializzazione
FROM veterinari
ORDER BY cognome;

-- 9. Numero di animali adottati per specie
SELECT specie, COUNT(*) AS numero_adottati
FROM animali
WHERE stato_adozione = 'Adottato'
GROUP BY specie;

-- 10. Animali senza note (campo note NULL o vuoto)
SELECT nome, specie, razza
FROM animali
WHERE note IS NULL OR note = '';

-- 11. Media dell’importo delle donazioni
SELECT AVG(importo) AS media_donazioni
FROM donazioni;

-- 12. Veterinario che ha effettuato più visite
SELECT v.id_veterinario, vet.nome, vet.cognome, COUNT(*) AS numero_visite
FROM visite v
JOIN veterinari vet ON v.id_veterinario = vet.id_veterinario
GROUP BY v.id_veterinario
ORDER BY numero_visite DESC
LIMIT 1;

-- 13. Ultima visita effettuata da ciascun veterinario
SELECT vet.nome, vet.cognome, MAX(v.data_visita) AS ultima_visita
FROM visite v
JOIN veterinari vet ON v.id_veterinario = vet.id_veterinario
GROUP BY vet.id_veterinario;

-- 14. Elenco di adozioni con animali e note, anche se vuote
SELECT a.nome AS animale, ad.nome_adottante, ad.note_aggiuntive
FROM adozioni ad
JOIN animali a ON ad.id_animale = a.id_animale;

-- 15. Elenco delle prenotazioni archiviate
SELECT p.nome, p.cognome, a.nome AS animale, p.data_appuntamento
FROM prenotazioni_adozione p
JOIN animali a ON p.id_animale = a.id_animale
WHERE p.archiviato = TRUE;
