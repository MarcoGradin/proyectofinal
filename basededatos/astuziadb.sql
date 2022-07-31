
create database astuzia;

use astuzia;

create table iniciasesion(
idusuario int unsigned not null auto_increment,
usuario varchar (50),
contraseña varchar (50),
primary key (idusuario)
);

create table registrate(
nombre varchar(50),
apellido varchar (50),
nuevousuario varchar(50),
nuevacontraseña varchar(50),
primary key (nombre)
);
