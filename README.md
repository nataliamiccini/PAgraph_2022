# Project PA crowd sourcing
  Miccini, Pesaresi
  
## Obiettivo del progetto
Back-end per la realizzazione di un servizio che consente digestire la creazione e valutazione di modelli di ottimizzazione su grafo.
Il progetto simula un modello crownd sourcing, che consente a un insieme di utenti di contribuire all'aggiornamento di uno o più modelli.

In particolare, il sistema prevede la possibilità di:
* Creare una nuovo modello ( in particolare vengono decrementati 0,25 token per ogni nodo e 0,01 token per ogni arco del grafo)
* Eseguire il modello, e quindi calcolare il costo di un percorso, specificando il nodo di partenza, il nodo di arrivo e il passo di incremento
* Eseguire operazioni di aggiornamento, su uno o più archi, utilizzando una media esponenziale
* Nel caso in cui un utente non sia autenticato la richiesta di aggiornamento viene messa in lista. L'utente che ha creato il modello sarà poi in grado di accettare o rifiutare le richieste di update.
* Visualizzare l'elenco delle revisioni dei pesi di un dato modello eventualmente filtrando per:
    -	Data modifica
    -	Arco
* Visualizzare l’elenco dei modelli filtrando per:
    -	Numero di nodi
    -	Numero di archi
* Ricaricare un dato utente da parte di un utente Admin
* SImulare l'esecuzione di un modello, specificando punto di inizio, di fine e passo di incremento di uno o più archi

## Progettazione

### Diagrammi UML 
#### Diagramma dei casi d'uso

Tramite un diagramma "Use case" sono rappresente le relazioni tra gli utenti e le sue richieste.
Esistono 2 tipi di utenti:
* Admin, che può ricaricare il portafoglio di un dato utente
* User, che può creare o modificare un modello.


#### Schema ER

<img src = "img_src/ER.drawio.png">
Il database è composto da 3 tabelle:
* USER: contiente tutte le informazioni relative all'utente ed ha come chiave primaria l'id dell'utente.
* EDGE : contiene tutte le informazioni relative agli archi di ogni grafo ed ha come chiama primaria l'id dell'edge, mentre le chiavi esterna (che riguardano il creatore del modello e al grafo di appartenenza di ogni arco) fanno rispettivamente riferimento allo id_user nella tabella User e id_graph in Graph.
* GRAPH: contiene informazioni relative ai modelli.

