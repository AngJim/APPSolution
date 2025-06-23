CREATE TABLE IF NOT EXISTS animali (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  specie VARCHAR(100) NOT NULL,
  razza VARCHAR(100) NOT NULL,
  eta INT NOT NULL,
  mese INT NOT NULL CHECK (mese BETWEEN 1 AND 12),
  genere VARCHAR(20) NOT NULL CHECK (genere IN ('Maschio', 'Femmina')),
  taglia VARCHAR(50) NOT NULL,
  stato VARCHAR(20) NOT NULL CHECK (stato IN ('Disponibile', 'In_corso', 'Adottato')),
  descrizione CLOB
);
