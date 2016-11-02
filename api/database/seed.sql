
INSERT INTO `events` (`id`, `professionals_id`, `users_id`, `services_id`, `startAt`, `endsAt`, `realStartAt`, `realEndsAt`, `status_id`)
VALUES
	(4,2,5,1,'2016-06-21 10:00:00','2016-06-21 11:00:00',NULL,NULL,1);


INSERT INTO `professionals` (`id`, `users_id`, `professions_id`, `email`, `password`)
VALUES
	(2,4,1,'daniel@teste.com','$2a$10$i6w6xjwrBcLDojA2.kRWhO.KQb6yI5RqeI5HeWSve0tRujOoDzC72');


INSERT INTO `professions` (`id`, `name`)
VALUES
	(1,'Cabelereiro');


INSERT INTO `properties` (`id`, `name`, `firstPhone`, `secondPhone`, `bucketName`, `photoPath`)
VALUES
	(1,'Salao7','1144278861','11964919680','salao7','adsafafa');


INSERT INTO `roles` (`id`, `name`)
VALUES
	(1,'SuperAdmin'),
	(2,'Admin'),
	(3,'Professional'),
	(4,'Secretary'),
	(5,'Client');


INSERT INTO `services` (`id`, `name`)
VALUES
	(1,'Corte Masculino');


INSERT INTO `status` (`id`, `name`)
VALUES
	(1,'Pending');


INSERT INTO `users` (`id`, `deviceToken`, `name`, `phone`, `sex`, `bucketName`, `photoPath`)
VALUES
	(4,NULL,'Daniel Lessa','11964919680','M','bucket','photo'),
	(5,NULL,'Roseli Lessa','11832386642','F','bucket','photo');


INSERT INTO `usersHasRoles` (`user`, `role`)
VALUES
	(4,3);


