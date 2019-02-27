create or replace table if not exists calculate
(
	id int auto_increment
		primary key,
	name varchar(200) charset utf8 not null,
	nameEN varchar(200) null,
	create_date datetime default CURRENT_TIMESTAMP null
);

alter table calculate_detail
	add calculate_id int not null after type;
