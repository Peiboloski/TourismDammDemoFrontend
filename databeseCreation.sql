create database tourismDamme;
use tourismDamme;

create table monuments
(
	monumentId int not null primary key AUTO_INCREMENT,
	monumentName char(50) not null,

	description TEXT not null,
	normalPrice FLOAT(6) not null,
	reducedPrice FLOAT(6) not null
);

create table qr
(  
  
    /*Check the length of the qrCode when the hash is defined*/
	qrCodeId char(100) not null primary key,
    monumentId char(9) not null,
    usesLeft tinyint not null
	
);

create table ligth
(  
  
    /*Check the length of the qrCode when the hash is defined*/
	ligthId char(20) not null primary key,
	monumentId char(9) not null,
    on_off boolean not null,
	time_on FLOAT(10) not null
	
);

create table purchase
(
	purchaseId bigint not null primary key AUTO_INCREMENT,
	monumentId char(9) not null
);

create table person
(
	personId bigint not null primary key AUTO_INCREMENT,
	purchaseId bigint not null,
	/* we store (m) for male and (f) for female*/
	gender char(1) not null,
	age tinyint not null,
	nationality char(36) not null
);



 INSERT INTO  monuments (monumentName,description,normalPrice,reducedPrice)
VALUES ('Church of Saint-Martin','This neogothic church (1890-1892) was constructed under the management of the architect Verbeke. The church replaces the medieval Roman church.',6.00,3.00);

 INSERT INTO  monuments (monumentName,description,normalPrice,reducedPrice)
VALUES ('Church of Our Lady','The oldest part, between the tower and the present-day church, dates back to 1225.
 The present church was built in the 14th century because of the increase in the population.
  In 1725 the nave, the aisles and the transept were pulled down.',5.00,2.00);

 INSERT INTO  monuments (monumentName,description,normalPrice,reducedPrice)
VALUES ('Church of Saint-Jacob-the-Superior','The church dates from the end of the 13th century, 
when Hoeke was the centre of the German trade in the Zwin. The charming one-naved church has a barrel-vault.',5.00,2.00);









