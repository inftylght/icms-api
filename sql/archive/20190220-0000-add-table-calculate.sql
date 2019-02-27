create table calculate
(
	id int auto_increment,
	name int not null,
	create_date datetime default now() null,
	constraint calculate_pk
		primary key (id)
);

alter table calculate modify name nvarchar(200) not null;
