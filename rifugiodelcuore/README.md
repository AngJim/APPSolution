# Informazioni per il progetto

In questo documento verranno forniti le regole e le linee guida generali per la riuscita effettiva del progetto con una spiegazione del nostro approccio con **RESTful API**.

## Nomenclatura cartelle e file

Per la **nomeclatura cartelle e dei package** utilizzeremo camelCase: vale a dire la prima parola in minuscolo e la prima lettera della seconda parola in maiuscolo.

> ESEMPIO: gestioneAnimali, ciaoComeStai, ecc...

Per i **nomi dei file e dei file java** è importante ricordare che dovranno cominciare con la prima lettera maiuscola e poi seguiranno la regola generale del camelCase. Oltre a ciò la prima parola dovrà rappresentare l'oggetto che stiamo definendo e la seconda il suo ruolo all'interno del progetto come vedete nell'esempio di sotto.

> ESEMPIO: CiaoComeStai, Animale, AnimaleController, AnimaleService e così via.

---

## Spiegazione RESTful API

Con l'approccio RESTful il nostro obbiettivo sarà restituire dati in formato JSON dal backend e il frontend tramite chiamate fetch(). 

> [!IMPORTANT]
> Di seguito trovate i vari ruoli dei packages configurati.

### MODEL

In questo package verranno rappresentati gli oggetti del nostro progetto con i getters e setters.

> AD ESEMPIO: abbiamo l'animale che avrà nome - specie - razza - ecc...

### REPOSITORY

Comunica direttamente col database e inseriremo metodi personalizzati per eventuali operazioni extra al di fuori delle semplici CRUD.

### SERIVCE

Contiene la logica, la validazione, e operazioni intermedie tra repository e controller

### CONTROLLER

Permette di mappare le richieste HTTP overro GET - POST - DELETE - PUT e inoltre parla con il client