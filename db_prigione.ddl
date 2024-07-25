-- *********************************************
-- * SQL PostgreSQL generation                 
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Fri Jul 19 16:38:38 2024 
-- * LUN file: C:\Moje stvari\Universita\Database\db-prigione\db_prigione.lun 
-- * Schema: schema_logico_finale/1-1-1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database schema_logico_finale;


-- Tables Section
-- _____________ 
create table PERSONALE (
     badge char(4) not null,
     nome char(35) not null,
     cognome char(35) not null,
     codice_fiscale char(16) not null,
     sesso char(1) not null,
     constraint ID_PERSONALE primary key (badge));

create table AMMINISTRATORE (
     badge char(4) not null,
     password char(12) not null,
     constraint FK_amministratore_personale_badge primary key (badge));

create table GUARDIA (
     badge char(4) not null,
     constraint FK_guardia_personale_badge primary key (badge));

create table BLOCCO (
     id_blocco char(1) not null,
     constraint ID_BLOCCO primary key (id_blocco));

create table TURNO (
     ora_inizio date not null,
     ora_fine date not null,
     constraint ID_TURNO primary key (ora_inizio));

create table ORARIO (
     ora_inizio date not null,
     giorno date not null,
     constraint ID_ORARIO primary key (giorno, ora_inizio));

CREATE TYPE tipo_cella AS ENUM ('letto', 'medica', 'solitaria');
create table CELLA (
     id_piano numeric(1) not null,
     id_blocco char(1) not null,
     id_cella numeric(2) not null,
     tipo tipo_cella not null,
     num_letti numeric(1) not null,
     posti_occupati numeric(1) not null,
     constraint ID_CELLA primary key (id_cella, id_piano, id_blocco));

create table DETENUTO (
     nome char(35) not null,
     cognome char(35) not null,
     data_di_nascita date not null,
     carta_di_identita char(9) not null,
     altezza numeric(3) not null,
     deceduto char not null,
     constraint ID_DETENUTO_ID primary key (carta_di_identita));



create table ISOLAMENTO (
     id_cella numeric(2) not null,
     id_piano numeric(1) not null,
     id_blocco char(1) not null,
     inizio_detenzione date not null,
     carta_di_identita char(9) not null,
     data_inizio date not null,
     data_fine date not null,
     motivo varchar(900) not null,
     constraint ID_ISOLAMENTO primary key (data_inizio, inizio_detenzione, carta_di_identita, id_cella, id_piano, id_blocco));



create table PIANO (
     id_blocco char(1) not null,
     id_piano numeric(1) not null,
     constraint ID_PIANO primary key (id_piano, id_blocco));

create table REGISTRO_DETENZIONE (
     carta_di_identita char(9) not null,
     inizio_detenzione date not null,
     fine_detenzione date not null,
     constraint ID_REGISTRO_DETENZIONE_ID primary key (inizio_detenzione, carta_di_identita));

create table REGISTRO_ORARI (
     badge char(4) not null,
     data_fine date,
     data_inizio date not null,
     giorno date not null,
     ora_inizio date not null,
     id_piano numeric(1) not null,
     id_blocco char(1) not null,
     constraint ID_REGISTRO_ORARI primary key (data_inizio, badge));

create table RICOVERO (
     inizio_detenzione date not null,
     carta_di_identita char(9) not null,
     id_cella numeric(2) not null,
     id_piano numeric(1) not null,
     id_blocco char(1) not null,
     data_inizio date not null,
     data_fine date not null,
     dettaglio varchar(900) not null,
     constraint ID_RICOVERO primary key (data_inizio, inizio_detenzione, carta_di_identita, id_cella, id_piano, id_blocco));

create table TRASFERIMENTO_LETTO (
     inizio_detenzione date not null,
     carta_di_identita char(9) not null,
     id_cella numeric(2) not null,
     id_piano numeric(1) not null,
     id_blocco char(1) not null,
     data_uscita date,
     data_entrata date not null,
     constraint ID_TRASFERIMENTO_LETTO primary key (data_entrata, inizio_detenzione, carta_di_identita, id_cella, id_piano, id_blocco));



-- Constraints Section
-- ___________________ 

alter table AMMINISTRATORE add constraint FKpersonale_amministratore_FK
     foreign key (badge)
     references PERSONALE;

alter table CELLA add constraint FKcella_piano_FK
     foreign key (id_piano, id_blocco)
     references PIANO;

--Not implemented
--alter table DETENUTO add constraint ID_DETENUTO_CHK
--     check(exists(select * from REGISTRO_DETENZIONE
--                  where REGISTRO_DETENZIONE.carta_di_identita = carta_di_identita)); 

alter table GUARDIA add constraint FKpersonale_guardia_FK
     foreign key (badge)
     references PERSONALE;

alter table ISOLAMENTO add constraint FKisolamento_detenuto_FK
     foreign key (inizio_detenzione, carta_di_identita)
     references REGISTRO_DETENZIONE;

alter table ISOLAMENTO add constraint FKspostamento_solitaria_FK
     foreign key (id_cella, id_piano, id_blocco)
     references CELLA;

alter table ORARIO add constraint FKorario_turno_FK
     foreign key (ora_inizio)
     references TURNO;

alter table PIANO add constraint FKpiano_blocco_FK
     foreign key (id_blocco)
     references BLOCCO;

--Not implemented
--alter table REGISTRO_DETENZIONE add constraint ID_REGISTRO_DETENZIONE_CHK
--     check(exists(select * from TRASFERIMENTO_LETTO
--                  where TRASFERIMENTO_LETTO.inizio_detenzione = inizio_detenzione and TRASFERIMENTO_LETTO.carta_di_identita = carta_di_identita)); 

alter table REGISTRO_DETENZIONE add constraint FKregistro_detenuto_FK
     foreign key (carta_di_identita)
     references DETENUTO;

alter table REGISTRO_ORARI add constraint FKorario_controllo_FK
     foreign key (giorno, ora_inizio)
     references ORARIO;

alter table REGISTRO_ORARI add constraint FKcontrollo_piano_FK
     foreign key (id_piano, id_blocco)
     references PIANO;

alter table REGISTRO_ORARI add constraint FKcontrollo_guardia_FK
     foreign key (badge)
     references GUARDIA;

alter table RICOVERO add constraint FKspostamento_medica_FK
     foreign key (id_cella, id_piano, id_blocco)
     references CELLA;

alter table RICOVERO add constraint FKricovero_detenuto_FK
     foreign key (inizio_detenzione, carta_di_identita)
     references REGISTRO_DETENZIONE;

alter table TRASFERIMENTO_LETTO add constraint FKassegnazione_letto_FK
     foreign key (id_cella, id_piano, id_blocco)
     references CELLA;

alter table TRASFERIMENTO_LETTO add constraint FKtrasf_detenuto_FK
     foreign key (inizio_detenzione, carta_di_identita)
     references REGISTRO_DETENZIONE;


-- Index Section
-- _____________ 

create index FKcella_piano_IND
     on CELLA (id_piano, id_blocco);

create index FKisolamento_detenuto_IND
     on ISOLAMENTO (inizio_detenzione, carta_di_identita);

create index FKspostamento_solitaria_IND
     on ISOLAMENTO (id_cella, id_piano, id_blocco);

create index FKorario_turno_IND
     on ORARIO (ora_inizio);

create index FKpiano_blocco_IND
     on PIANO (id_blocco);

create index FKregistro_detenuto_IND
     on REGISTRO_DETENZIONE (carta_di_identita);

create index FKorario_controllo_IND
     on REGISTRO_ORARI (giorno, ora_inizio);

create index FKcontrollo_piano_IND
     on REGISTRO_ORARI (id_piano, id_blocco);

create index FKcontrollo_guardia_IND
     on REGISTRO_ORARI (badge);

create index FKspostamento_medica_IND
     on RICOVERO (id_cella, id_piano, id_blocco);

create index FKricovero_detenuto_IND
     on RICOVERO (inizio_detenzione, carta_di_identita);

create index FKassegnazione_letto_IND
     on TRASFERIMENTO_LETTO (id_cella, id_piano, id_blocco);

create index FKtrasf_detenuto_IND
     on TRASFERIMENTO_LETTO (inizio_detenzione, carta_di_identita);

