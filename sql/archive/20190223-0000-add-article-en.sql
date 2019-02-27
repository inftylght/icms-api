alter table article
	add titleEN varchar(250) null after text;

alter table article
	add textEN varchar(4000) null after titleEN;
