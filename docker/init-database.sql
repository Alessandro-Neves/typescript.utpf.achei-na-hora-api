create schema `lost&found` default character set latin2;
ALTER DATABASE `lost&found` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; 

create table `lost&found`.`User` (
  `id` integer unsigned not null auto_increment primary key,
  `email` varchar(255) unique not null,
  `password` varchar(255) not null,
  `created_at` timestamp not null default now(),
  `updated_at` timestamp not null
);

create table `lost&found`.`Person` (
  `id` integer unsigned not null auto_increment primary key,
  `full_name` varchar(255) not null,
  `nickname` varchar(255) not null,
  `image` blob,
  `campus` varchar(45),
  `created_at` timestamp not null default now(),
  `updated_at` timestamp not null,
  `user_id` integer unsigned not null,
  foreign key (`user_id`) references `lost&found`.`User` (`id`)
);

create table `lost&found`.`Message` (
  `id` integer unsigned not null auto_increment primary key,
  `message` mediumtext not null,
  `created_at` timestamp not null default now(),
  `origin_id` integer unsigned not null,
  `destiny_id` integer unsigned not null,
  foreign key (`origin_id`) references `lost&found`.`User` (`id`),
  foreign key (`destiny_id`) references `lost&found`.`User` (`id`)
);

create table `lost&found`.`Object` (
  `id` integer unsigned not null auto_increment primary key,
  `title` varchar(255) not null,
  `description` mediumtext,
  `location` varchar(255),
  `type` ENUM('ACHADO', 'PERDIDO'),
  `tag` varchar(45),
  `image` blob,
  `created_at` timestamp not null default now(),
  `updated_at` timestamp not null,
  `owner_id` integer unsigned,
  `discoverer_id` integer unsigned,
  foreign key (`owner_id`) references `lost&found`.`User` (`id`),
  foreign key (`discoverer_id`) references `lost&found`.`User` (`id`)
);

create table `lost&found`.`Image` (
  `id` integer unsigned not null auto_increment primary key,
  `source` varchar(255) not null,
  `use` ENUM('GENERAL', 'OBJECT')
);

create table `lost&found`.`Object_Image` (
  `id_obj` integer unsigned not null,
  `id_img` integer unsigned not null,
  primary key(`id_obj`, `id_img`),
  foreign key (`id_obj`) references `lost&found`.`Object` (`id`),
  foreign key (`id_img`) references `lost&found`.`Image` (`id`)
);

