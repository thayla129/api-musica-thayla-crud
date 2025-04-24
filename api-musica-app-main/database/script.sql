create database db_controle_musicas_ba;

use db_controle_musicas_ba;

create table tbl_musica(
  id int primary key auto_increment,
  nome varchar(80) not null,
  link varchar(200) not null,
  duracao time not null,
  data_lancamento date not null,
  foto_capa varchar(200),
  letra text
);

show tables;
desc tbl_musica;
select * from tbl_musica;