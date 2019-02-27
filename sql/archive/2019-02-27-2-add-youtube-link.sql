alter table article
	add youtube_link text null after textEN;

alter table article
	add youtube text null after textEN;

alter table article drop column youtube_link;

