-- Creazione database
DROP DATABASE IF EXISTS `rifugio_del_cuore`;
CREATE DATABASE `rifugio_del_cuore`;
USE `rifugio_del_cuore`;

-- Permessi (esegui da root o utente con GRANT OPTION)
GRANT ALL ON `rifugio_del_cuore`.* TO 'ITS_2025'@'localhost';

-- Tabella admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
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
DROP TABLE IF EXISTS `animali`;
CREATE TABLE `animali` (
  `id_animale` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(40) NOT NULL,
  `specie` VARCHAR(40) NOT NULL,
  `razza` VARCHAR(40) NOT NULL,
  `anni` INT NOT NULL,
  `genere` ENUM('Maschio','Femmina') NOT NULL,
  `taglia` VARCHAR(30) NOT NULL,
  `stato_adozione` ENUM('Disponibile','In corso','Adottato') DEFAULT NULL,
  `descrizione` TEXT DEFAULT NULL,
  `data_ingresso` date not null,
  PRIMARY KEY (`id_animale`),
  CONSTRAINT `animali_chk_1` CHECK ((`anni` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `animali` 
(`nome`, `specie`, `razza`, `anni`, `genere`, `taglia`, `stato_adozione`, `descrizione`,`data_ingresso`)
VALUES
('Fido', 'Cane', 'Labrador', 3, 'Maschio', 'Grande', 'Disponibile', 'Cane energico e affettuoso, ama giocare all\'aperto.','2025-05-01'),
('Micia', 'Gatto', 'Europeo', 2, 'Femmina', 'Piccola', 'Adottato', 'Gattina tranquilla, adora essere coccolata.','2025-05-01'),
('Rex', 'Cane', 'Pastore Tedesco', 5, 'Maschio', 'Grande', 'In corso', 'Intelligente e protettivo, ideale per la guardia.','2025-05-01'),
('Luna', 'Gatto', 'Siamese', 1, 'Femmina', 'Media', 'Disponibile', 'Vivace e curiosa, perfetta per famiglie.','2025-05-01'),
('Birba', 'Cane', 'Barboncino', 4, 'Maschio', 'Piccola', 'Disponibile', 'Molto socievole e ama stare con i bambini.','2025-05-01'),
('Leo', 'Cane', 'Bulldog Francese', 2, 'Maschio', 'Media', 'Adottato', 'Adora le passeggiate e stare in compagnia.','2025-05-01'),
('Stella', 'Gatto', 'Persiano', 6, 'Femmina', 'Media', 'Disponibile', 'Molto dolce e indipendente, pelo lungo.','2025-05-01'),
('Jack', 'Cane', 'Jack Russell', 3, 'Maschio', 'Piccola', 'In corso', 'Vivace e giocoso, perfetto per persone attive.','2025-05-01'),
('Maya', 'Gatto', 'Maine Coon', 5, 'Femmina', 'Grande', 'Disponibile', 'Elegante e affettuosa, ama la compagnia.','2025-05-01'),
('Toby', 'Cane', 'Golden Retriever', 4, 'Maschio', 'Grande', 'Disponibile', 'Molto intelligente e facilmente addestrabile.','2025-05-01');

-- Tabella adozioni
DROP TABLE IF EXISTS `adozioni`;
CREATE TABLE `adozioni` (
  `id_adozione` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `cognome` VARCHAR(60) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `telefono` VARCHAR(30) UNIQUE NOT NULL,
  `data_appuntamento` DATE NOT NULL,
  `orario_appuntamento` TIME NOT NULL,
  `id_animale` INT NOT NULL,
  PRIMARY KEY (`id_adozione`),
  KEY `fk_adozioni_animale` (`id_animale`),
  CONSTRAINT `fk_adozioni_animale` FOREIGN KEY (`id_animale`) REFERENCES `animali` (`id_animale`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `adozioni` (`nome`, `cognome`, `email`, `telefono`, `data_appuntamento`, `orario_appuntamento`, `id_animale`) 
VALUES
('Giulia', 'Moretti', 'giulia.moretti@email.com', '+390123456701', '2025-06-15', '10:30:00', 1),
('Lorenzo', 'Esposito', 'lorenzo.esposito@email.com', '+390123456702', '2025-06-16', '11:00:00', 2),
('Alessia', 'Russo', 'alessia.russo@email.com', '+390123456703', '2025-06-17', '09:45:00', 3),
('Marco', 'Conti', 'marco.conti@email.com', '+390123456704', '2025-06-18', '14:15:00', 4),
('Sara', 'Romano', 'sara.romano@email.com', '+390123456705', '2025-06-19', '15:00:00', 5);


-- tabella veterinari 
DROP TABLE IF EXISTS `veterinari`;
CREATE TABLE `veterinari` (
  `id_veterinario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `cognome` VARCHAR(60) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `telefono` VARCHAR(30) UNIQUE NOT NULL,
  `clinica` VARCHAR(100) NOT NULL,
  `specializzazione` VARCHAR(100) DEFAULT NULL,
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
DROP TABLE IF EXISTS `visite`;

-- creazione tabella visite
CREATE TABLE `visite` (
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
DROP TABLE IF EXISTS `donazioni`;
CREATE TABLE `donazioni` (
  `id_donazione` INT NOT NULL AUTO_INCREMENT,
  `nome_donatore` VARCHAR(100) NOT NULL,
  `importo` DECIMAL(10,2) NOT NULL,
  `metodo_pagamento` enum ('contanti','bancomat','bonifico','crowfounding') not null,
  `data_donazione` DATE NOT NULL,
  `note` TEXT DEFAULT NULL,
  PRIMARY KEY (`id_donazione`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- campi scartati
-- `email` VARCHAR(100) DEFAULT NULL,
-- `telefono` VARCHAR(30) DEFAULT NULL,
-- insert
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






