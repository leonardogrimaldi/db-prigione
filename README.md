# db-prigione
Sito di gestione di una prigione

L'obiettivo del progetto è realizzare un sistema di gestione di una prigione che consenta al personale di gestire i prigionieri e le guardie.

Il **personale** della prigione è formato da **guardie** e **amministratori**.
Gli amministratori possono essere anche guardie e possono registrare ulteriori amministratori, guardie e spostare i **detenuti** da una **cella** all'altra. 

Le **celle** hanno una capacità massima e un numero identificativo e sono divise in tre tipi: Solitaria, Medica e Letto. Esse appartengono a dei **blocchi** identificati da una lettera che usata assieme al numero della cella consente di localizzarla.

Dei **detenuti** si vuole memorizzare la data di entrata e uscita, nel caso vi sia. Un detenuto può dopo essere uscito, ritornare ancora nella prigione. Ad esso gli è assegnata una cella **Letto**, ma può risiedere temporaneamente nelle celle **Solitarie** e **Mediche**  
