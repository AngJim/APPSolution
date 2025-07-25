
-- Creazione database
DROP DATABASE IF EXISTS `rifugio_del_cuore`;
CREATE DATABASE `rifugio_del_cuore`;
USE `rifugio_del_cuore`;

-- Permessi (esegui da root o utente con GRANT OPTION)
GRANT ALL ON `rifugio_del_cuore`.* TO 'ITS_2025'@'localhost';

-- Tabella admin
-- DROP TABLE IF EXISTS `admin`;
CREATE TABLE if not exists `admin` (
  `id_admin` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `cognome` VARCHAR(60) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `admin` VALUES 
(1,'Luca','Rossi','password_hash_1','luca.rossi@example.com'),
(2,'Maria','Bianchi','password_hash_2','maria.bianchi@example.com'),
(3,'Giovanni','Verdi','password_hash_3','giovanni.verdi@example.com'),
(4,'Elisa','Neri','password_hash_4','elisa.neri@example.com'),
(5,'Francesco','Ferrari','password_hash_5','francesco.ferrari@example.com');

-- Tabella animali
-- DROP TABLE IF EXISTS `animali`;
CREATE TABLE if not exists `animali` (
  `id_animale` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `specie` VARCHAR(50) NOT NULL,
  `razza` VARCHAR(50) NOT NULL,
  `genere` ENUM('Maschio','Femmina') NOT NULL,
  `taglia` ENUM('piccola','media','grande') NOT NULL,
  `eta` varchar (10) DEFAULT ('non conosciuta'),
  `stato_salute` ENUM('Ottimo', 'Buono', 'Bisogno cure', 'Critico') NOT NULL,
  `stato_adozione` ENUM('Disponibile','In corso','Adottato') DEFAULT NULL,
  `data_ingresso` date not null,
  `immagine_url` VARCHAR(255),
  `note` TEXT DEFAULT NULL,
  PRIMARY KEY (`id_animale`)
  -- CONSTRAINT `animali_chk_1` CHECK ((`anni` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*
note utili
- L’età sarà calcolata a runtime in base a `data_nascita`
- lo stato di salute è gestito con un campo `ENUM` semplice
- Le immagini saranno salvate in locale e solo il percorso sarà memorizzato in
`immagine_url`
*/
INSERT INTO `animali` (`nome`, `specie`, `razza`, `genere`, `taglia`, `eta`, `stato_salute`, `stato_adozione`, `data_ingresso`, `immagine_url`, `note`) VALUES
('Leo', 'Cane', 'Labrador', 'Maschio', 'grande', '10', 'Ottimo', 'Adottato', '2024-03-01', 'https://example.com/leo.jpg', 'Molto socievole e giocherellone.'),
('Maya', 'Gatto', 'Europeo', 'Femmina', 'piccola', '2', 'Buono', 'Adottato', '2024-04-12', 'https://example.com/maya.jpg', 'Ama stare in braccio e farsi coccolare.'),
('Rocky', 'Cane', 'Meticcio', 'Maschio', 'media', '4', 'Bisogno cure', 'Adottato', '2024-01-20', 'https://example.com/rocky.jpg', 'Ha bisogno di medicine quotidiane.'),
('Luna', 'Coniglio', 'Nano', 'Femmina', 'piccola', '6', 'Ottimo', 'Adottato', '2024-05-01', 'https://example.com/luna.jpg', 'Molto tranquilla, adatta ai bambini.'),
('Zoe', 'Cane', 'Beagle', 'Femmina', 'media', '1', 'Ottimo', 'Adottato', '2024-05-25', 'https://example.com/zoe.jpg', 'Curiosa e affettuosa, ama correre.');

-- Tabella adozioni
-- DROP TABLE IF EXISTS `adozioni`;
CREATE TABLE if not exists `adozioni` (
  `id_adozione` INT NOT NULL AUTO_INCREMENT,
  `id_animale` INT NOT NULL,
  `nome_adottante` VARCHAR(60) NOT NULL,
  `cognome_adottante` VARCHAR(60) NOT NULL,
  `email` VARCHAR(100) NULL,
  `telefono` VARCHAR(30) NOT NULL,
  `data_adozione` DATE NOT NULL,
  `note_aggiuntive` TEXT DEFAULT NULL,
  
  PRIMARY KEY (`id_adozione`),
  KEY `fk_adozioni_animale` (`id_animale`),
  CONSTRAINT `fk_adozioni_animale` FOREIGN KEY (`id_animale`) REFERENCES `animali` (`id_animale`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- insert 
INSERT INTO `adozioni` (`id_animale`, `nome_adottante`, `cognome_adottante`, `email`, `telefono`, `data_adozione`, `note_aggiuntive`) VALUES
(1, 'Luca', 'Rossi', 'luca.rossi@email.com', '3451234567', '2025-06-10', 'Adottato con entusiasmo. Ambiente idoneo.'),
(2, 'Giulia', 'Bianchi', 'giulia.bianchi@email.com', '3927654321', '2025-06-12', 'Ha già avuto animali in passato.'),
(3, 'Marco', 'Verdi', 'marco.verdi@email.com', '3319988776', '2025-06-14', NULL),
(4, 'Anna', 'Neri', 'anna.neri@email.com', '3476543210', '2025-06-15', 'Abita in campagna, spazio aperto disponibile.'),
(5, 'Federica', 'Moretti', 'federica.moretti@email.com', '3397788990', '2025-06-16', 'Controllo post-adozione programmato.');



-- tabella veterinari 
-- DROP TABLE IF EXISTS `veterinari`;
CREATE TABLE if not exists `veterinari` (
  `id_veterinario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `cognome` VARCHAR(60) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `telefono` VARCHAR(30) UNIQUE NOT NULL,
  `clinica` VARCHAR(100) NOT NULL,
  `specializzazione` VARCHAR(100) DEFAULT NULL,
  `tipo_contratto` ENUM('Volontaria','Chiamata','Altro') DEFAULT 'Altro',
  PRIMARY KEY (`id_veterinario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- insert 
INSERT INTO `veterinari` (`nome`, `cognome`, `email`, `telefono`, `clinica`, `specializzazione`) VALUES
('Laura', 'Bianchi', 'laura.bianchi@vetmilano.it', '+390211234567', 'VetMilano', 'Vaccinazioni e medicina preventiva'),
('Paolo', 'Rossi', 'paolo.rossi@vetroma.it', '+390612345678', 'Clinica Vet Roma', 'Controlli generali e chirurgia'),
('Francesca', 'Verdi', 'francesca.verdi@vetfirenze.it', '+390552345678', 'Centro Veterinario Firenze', 'Post-operatorio e riabilitazione'),
('Giorgio', 'Conti', 'giorgio.conti@sanpet.it', '+390712345678', 'Clinica San Pet', 'Emergenze e pronto soccorso'),
('Sara', 'Moretti', 'sara.moretti@animalifelici.it', '+390331234567', 'Ambulatorio Animali Felici', 'Esami diagnostici e analisi');


-- tabella visite 
-- Rimozione tabella esistente
-- DROP TABLE IF EXISTS `visite`;

-- creazione tabella visite
CREATE TABLE if not exists `visite` (
  `id_visita` INT NOT NULL AUTO_INCREMENT,
  `id_animale` INT NOT NULL,
  `id_veterinario` INT not NULL,
  `data_visita` DATE NOT NULL,
  `orario_visita` TIME NOT NULL,
  `tipo_visita` VARCHAR(100) NOT NULL,
  `urgenza` ENUM('Bassa','Media','Alta') NOT NULL DEFAULT 'Media',
  `note_aggiuntive` TEXT DEFAULT NULL,
  PRIMARY KEY (`id_visita`),
  KEY `fk_visite_animale` (`id_animale`),
  KEY `fk_visite_veterinario` (`id_veterinario`),
  CONSTRAINT `fk_visite_animale` FOREIGN KEY (`id_animale`) REFERENCES `animali` (`id_animale`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_visite_veterinario` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinari` (`id_veterinario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `visite` (`id_animale`, `id_veterinario`, `data_visita`, `orario_visita`, `tipo_visita`, `urgenza`, `note_aggiuntive`) VALUES
(1, 2, '2025-06-10', '09:30:00', 'Controllo annuale', 'Media', 'Animale in buona salute, solo controllo di routine.'),
(3, 1, '2025-06-11', '14:00:00', 'Vaccinazione', 'Bassa', 'Vaccino esavalente, richiamo annuale.'),
(2, 3, '2025-06-12', '16:15:00', 'Visita post-operatoria', 'Alta', 'Controllo ferita chirurgica, presenza di infiammazione.'),
(5, 5, '2025-06-13', '10:45:00', 'Esami del sangue', 'Media', 'Analisi di controllo per sospetto diabete.'),
(4, 4, '2025-06-14', '08:00:00', 'Emergenza respiratoria', 'Alta', 'Presentato con difficoltà respiratorie, ricoverato subito.');




-- Tabella donazioni
-- DROP TABLE IF EXISTS `donazioni`;
CREATE TABLE if not exists `donazioni` (
  `id_donazione` INT NOT NULL AUTO_INCREMENT,
  `nome_donatore` VARCHAR(100) NOT NULL,
  `importo` DECIMAL(10,2) NOT NULL,
  `metodo_pagamento` enum ('contanti','bancomat','bonifico','crowfounding','paypal','assegno') not null,
  `data_donazione` DATE NOT NULL,
  `note` TEXT DEFAULT NULL,
  PRIMARY KEY (`id_donazione`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- campi scartati
-- `email` VARCHAR(100) DEFAULT NULL,
-- `telefono` VARCHAR(30) DEFAULT NULL,
-- insert


/*sezzione dei pacchi che abbiamo deciso di non mettere, al messimo come implemantazione futur
DROP TABLE IF EXISTS `categoria_prodotto`;
CREATE TABLE `categoria_prodotto` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nome_categoria` ENUM('Cibo', 'Prodotti_salute', 'Giochi', 'Oggetti_vari', 'Altro') NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categoria_prodotto` (`nome_categoria`) VALUES
('Cibo'),
('Prodotti_salute'),
('Giochi'),
('Oggetti_vari'),
('Altro');


a 
DROP TABLE IF EXISTS `donazioni_prodotti`;
CREATE TABLE `donazioni_prodotti` (
  `id_donazione` INT NOT NULL AUTO_INCREMENT,
  `id_categoria` INT DEFAULT NULL,
  `nome_donatore` VARCHAR(100) DEFAULT NULL,
  `numero_pacchi` INT NOT NULL DEFAULT 1,
  `data_donazione` DATE NOT NULL,
  `note` TEXT DEFAULT NULL,
  PRIMARY KEY (`id_donazione`),
  FOREIGN KEY (`id_categoria`) REFERENCES `categoria_prodotto`(`id_categoria`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `donazioni_prodotti` (`id_categoria`, `nome_donatore`, `numero_pacchi`, `data_donazione`, `note`) VALUES
(1, 'Mario Bianchi', 3, '2025-06-10', 'Scatole di croccantini e scatolette umide.'),
(2, 'Luca Verdi', 1, '2025-06-11', 'Kit di primo soccorso per animali.'),
(3, 'Elisa Neri', 2, '2025-06-12', 'Palline, corde e giochi interattivi.'),
(4, 'Marco Rossi', 4, '2025-06-13', 'Coperte e cucce invernali.'),
(5, 'Anonimo', 1, '2025-06-14', 'Pacco vario non specificato.');
*/
INSERT INTO `donazioni` (`nome_donatore`, `importo`, `metodo_pagamento`, `data_donazione`, `note`) VALUES
('Mario Rossi', 50.00, 'contanti', '2025-06-10', 'Donazione mensile'),
('Giulia Bianchi', 100.00, 'bonifico', '2025-06-01', 'In memoria di un caro amico'),
('Luca Verdi', 25.50, 'bancomat', '2025-05-28', NULL),
('Anna Neri', 75.00, 'crowfounding', '2025-06-12', 'Parte della campagna “Un tetto per tutti”'),
('Francesco Gallo', 150.00, 'bonifico', '2025-06-05', 'Donazione una tantum'),
('Elena Russo', 30.00, 'contanti', '2025-06-11', NULL),
('Stefano Marchetti', 200.00, 'bonifico', '2025-06-09', 'Per sostenere le cure veterinarie'),
('Ilaria Fontana', 45.00, 'bancomat', '2025-06-13', 'Grazie per quello che fate'),
('Giorgio Neri', 60.00, 'crowfounding', '2025-06-08', NULL),
('Claudia Moretti', 80.00, 'bancomat', '2025-06-02', 'Per gli animali anziani');


-- Tabella prenotazioni_adozione
-- DROP TABLE IF EXISTS `prenotazioni_adozione`;
CREATE TABLE if not exists `prenotazioni_adozione` (
`id_prenotazione` INT AUTO_INCREMENT PRIMARY KEY,
`id_animale` INT NOT NULL,
`nome` VARCHAR(50) NOT NULL,
`cognome` VARCHAR(50) NOT NULL,
`telefono` VARCHAR(20) NOT NULL,
`email` VARCHAR(100) NULL,
`data_appuntamento` DATE NOT NULL,
`orario_appuntamento` TIME NOT NULL,
`note` TEXT,
`stato` ENUM('In attesa', 'Approvata', 'Rifiutata') DEFAULT 'In attesa',
`archiviato` BOOLEAN DEFAULT FALSE,
FOREIGN KEY (id_animale) REFERENCES animali(id_animale)
ON DELETE CASCADE
ON UPDATE CASCADE
);

-- insert 
INSERT INTO `prenotazioni_adozione` (`id_animale`, `nome`, `cognome`, `telefono`, `email`, `data_appuntamento`, `orario_appuntamento`, `note`, `stato`, `archiviato`) VALUES
(1, 'Luca', 'Rossi', '3451234567', 'luca.rossi@email.com', '2025-06-20', '10:30:00', 'Vorrei conoscere il cane prima di adottarlo.', 'In attesa', FALSE),
(2, 'Giulia', 'Bianchi', '3927654321', 'giulia.bianchi@email.com', '2025-06-21', '14:00:00', '', 'Approvata', FALSE),
(3, 'Marco', 'Verdi', '3319988776', 'marco.verdi@email.com', '2025-06-22', '09:00:00', 'Ho già esperienza con animali.', 'Rifiutata', TRUE),
(4, 'Anna', 'Neri', '3476543210', 'anna.neri@email.com', '2025-06-23', '11:15:00', NULL, 'In attesa', FALSE),
(1, 'Sara', 'Conti', '3204455667', 'sara.conti@email.com', '2025-06-24', '16:45:00', 'Famiglia con bambini, ambiente tranquillo.', 'Approvata', FALSE);
