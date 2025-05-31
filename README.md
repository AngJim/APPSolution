# Cuore a quattro zampe

## Perché scegliere la nostra soluzoine?

Verranno specificati tutti i motivi per cui scegliere la nostra soluzione è conveniente e vantaggioso per i nostri clienti.

---

# Analisi e progettazione

## Overview

Il cliente ci ha richiesto un gestionale per il suo rifugio di animali che permetta di:

### Gestione Anagrafica Animali
Questa funzionalità prevede la creazione di una tabella "Animali", contenente i dati anagrafici di ciascun animale (es. nome, specie, razza, età, sesso, stato di salute, data di ingresso, ecc. – dettagli ancora da definire). I dati contenuti in questa tabella saranno utilizzati per alimentare l'interfaccia utente, che mostrerà le informazioni aggiornate sugli animali presenti nel rifugio.

L’amministratore avrà la possibilità di:

- Aggiungere nuovi animali

- Aggiornare le informazioni esistenti

- Visualizzare animali

- Eliminare uno o più record

Inoltre, si prevede la realizzazione di una **sezione pubblica dedicata agli animali già adottati**, che valorizzi l’esperienza del rifugio mostrando una scheda per ciascun animale con la sua storia e altre informazioni rilevanti. Per gestire questa funzionalità, verrà creata una tabella separata "Animali Adottati", collegata alla tabella principale, che consentirà di archiviare e presentare in modo distinto i dati post-adozione.

### Gestione delle Adozioni
Per tracciare le adozioni sarà necessaria la creazione di una tabella associativa "Adozioni", che colleghi ciascun animale adottato al relativo adottante. Questa tabella includerà:

- I **dati anagrafici** dell’adottante (nome, cognome, contatti, indirizzo, ecc.),

- Una **chiave esterna** riferita alla chiave primaria della tabella "Animali",

- Altri eventuali dati rilevanti (data adozione, stato della pratica, note, ecc.).

Sarà inoltre predisposto un form dedicato all’adozione, accessibile agli utenti interessati, che potranno compilarlo in autonomia. Una volta inviato, il sistema provvederà a registrare le informazioni nella tabella "Adozioni", rendendole disponibili per la consultazione e la gestione da parte degli operatori del rifugio.

### Gestione donazioni
La funzione donazioni prevederà un form collegato ad una **tabella per tenere lo storico delle donazioni ricevute**. 

Ci appoggieremo a enti di crowfounding come [Gofoundme](https://www.gofundme.com/it-it) oppure fornire ai nostri donors una lista di prodotti di cui il rifugio ha bisogno e loro avranno la possibilità di donare interamente o parzialmente per sostenerlo.

### Gestione delle visite veterinarie
Per ottimizzare la gestione delle attività veterinarie, abbiamo previsto una sezione amministrativa dedicata alla gestione autonoma degli appuntamenti, sia di routine che straordinari. Questa funzionalità integrerà una tabella strutturata con i campi informativi (es. data visita, orario previsto, motivasione visita, veterinaio responsabile, ecc...)

Questa impostazione consentirà un tracciamento efficiente e dettagliato di tutte le visite veterinarie.

## Requisiti funzionali (o “features”)

In questo paragrafo verranno descritte e dettagliate tutte le funzionalità che il programma dovrà soddisfare.

Ognuna di esse dovrà rispondere alle domande:

- *“Cosa farà questa feature?”*
- *“Come verrà realizzata?”*
- *“Come si dovrà comportare?”*
- *“A quali dipendenze è collegata?”*

## Requisiti non funzionali (NFR)

In questo paragrafo verranno riportati in forma di elenco tutti i **requisiti non funzionali** e la loro **implementazione** nel sistema.

[Definizione e Differenze tra requisiti funzionali e requisiti non funzionali | Informatica e Ingegneria Online](https://vitolavecchia.altervista.org/definizione-differenze-requisiti-funzionali-requisiti-non-funzionali/)

## Requisiti di sistema

- Quali saranno i **sistemi operativi supportati**. (oppure **cross-OS**)
    - La cui scelta influenzerà le decisioni prese in merito all’[Architettura globale](#Architettura-globale).
- Quali saranno i **requisiti minimi - sufficienti - ottimali** per il funzionamento.

## Diagramma di alto livello

In questa sezione verrà mostrato un diagramma rappresentativo della struttura generale del sistema, delle interconnessioni e delle intraconnessioni.

## Modello architetturale

Definizione della scelta relativa al **design pattern** a cui conformarsi.

## Architettura globale

In questo paragrafo verranno definite e specificate le caratteristiche delle componenti da usare e come dovranno comunicare fra loro. (front end, back end, database, API, ecc…)

## Tecnologie utilizzate

### Linguaggi utilizzati e framework

Quali linguaggi e framework verranno utilizzati e il loro versionamento.

### Database e Clouding

Scelta delle soluzioni da implementare per la gestione dei dati.

### Analisi delle vulnerabilità e cybertesting

Verrà redatta un’analisi in merito alle vulnerabilità a cui si potrebbe andare in contro e verranno effettuati dei test per verificare la robustezza e integrità del sistema.

### Ambienti di sviluppo

Quali ambienti di sviluppo [developing, testing e debugging, production] scegliere e perché.

Sezioni dedicate per la fase di **configurazione e settings**.

## Dipendenze esterne e diagrammi UML

In questo paragrafo verrà mostrato un **modello grafico delle dipendenze** dei vari sorgenti, delle loro funzionalità e le relazioni che vi sono tra essi e quelle che ci potrebbero essere con l’esterno.

[Directory Tree Generator | Create Folder Structure Diagrams Online](https://www.sickrate.com/folder-structure-generator)

[WBS (Work Breakdown Structure): cos’è e come si utilizza](https://biblus.acca.it/wbs-work-breakdown-structure-cose-si-utilizza/)

[Diagramma UML: Cos'è? Come Farlo? A Cosa Serve? | Miro](https://miro.com/it/diagramma/cosa-e-diagramma-uml/)

## Analisi compatibilità

In questa sezione verranno presi in esame tutti i moduli dell’[Analisi e progettazione](#Architettura-globale) e verrà effettuata un’analisi per verificare l’effettiva riuscita di realizzazione, riportando anche nel dettaglio **stime dei costi, possibili imprevisti e vincoli strutturali.**

---

# Per i collaboratori e il team

## Principi e linee guida

In questa sezione verrà fornita una prospettiva generica dei **principi e delle linee guida** che i vari collaboratori o il team dovranno **attenersi** al fine creare un’univoca metodologia di lavoro applicabile in più contesti.

Quest’ultimi rifletteranno anche quali sono i **valori aziendali**. 

[Valori aziendali: la lista dei 22 principali con esempi e come comunicarli con un software](https://factorial.it/blog/valori-aziendali-esempi/)

## Reparti operativi e collaboratori

### Livello di responsabilità

Verrà definito l’indice del livello di responsabilità dei collaboratori all’interno di un team o a livello aziendale generico.

### Separazione delle responsabilità

Verranno inoltre determinati ed elencati i criteri per la separazione delle responsabilità dei collaboratori o del team.

### Avvisi e notifiche

Questa sezione definisce le modalità generali per la gestione di avvisi, comunicazioni e-mail e notifiche relative a eventuali problematiche, richieste di chiarimento o riscontri. Sono inoltre indicati i referenti da contattare in base alle diverse casistiche.

### Task e scadenze

Questa sezione definisce il modello generale a cui devono conformarsi le attività, specificando le regole di scadenza e i diversi livelli di priorità.

[Che cos'è Scrum e perché funziona così bene [2025] • Asana](https://asana.com/it/resources/what-is-scrum)

[Cos'è un diagramma di Gantt e perché dovresti conoscerne l’utilità?](https://www.teamleader.eu/it/blog/diagramma-di-gantt)

## Strumenti utilizzati

Elenco dei vari strumenti collaborativi utilizzati all’interno del team e del complesso aziendale.

## Per il progetto

### Settings e configurazioni

### Nominazione file e cartelle

### Versioning e branching

### Roadmap di sviluppo

## Sostegno per i collaboratori

> [!NOTE]
> Verranno forniti tutti i mezzi necessari ai collaboratori (es. tutorial, documentazione, supporter dedicato, ecc…) per allinearsi con il team e procedere con regolarità e semplicità.

### Spring Boot

> [!IMPORTANT]
> Importante da leggere tutta la documentazione e vedere i vari settings e configurazioni per riuscire a completare il progetto.

- [Documentazione Spring Boot](https://docs.spring.io/spring-boot/documentation.html).
- [Video tutorial per Spring Boot](https://www.youtube.com/watch?v=gJrjgg1KVL4).
- [Tutorial Spring Boot](https://www.tutorialspoint.com/spring_boot/index.htm).
- [Tutorial completo per Java](https://www.youtube.com/watch?v=xTtL8E4LzTQ)

---

# Per gli utenti finali

Verrà fornita tutta la documentazione necessaria per una corretta installazione, manuale d’uso e tutorial, FAQ e una sezione dedicata per l’avviso di eventuali bug nel software.

## Installazione del software e dipendenze esterne

## Manuale d’uso e tutorial

## FAQ

## Bug report e contatti

---
