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
  `type` varchar(45),
  `tag` varchar(45),
  `image` blob,
  `created_at` timestamp not null default now(),
  `updated_at` timestamp not null,
  `owner_id` integer unsigned not null,
  `discoverer_id` integer unsigned not null,
  foreign key (`owner_id`) references `lost&found`.`User` (`id`),
  foreign key (`discoverer_id`) references `lost&found`.`User` (`id`)
);


-- ALTER DATABASE `lost&found` CHARSET = Latin1 COLLATE = utf8_swedish_ci;

-- insert into `lost&found`.`User` (email, password, updated_at) values (
--   "ale@gmail.com",
--   "ale123",
--   now()
-- );

-- insert into `lost&found`.`User` (email, password, updated_at) values (
--   "asuarioêê2@email.com",
--   "usuario2",
--   now()
-- );

-- insert into `lost&found`.`Person` (full_name, nickname, image, campus, updated_at, user_id) values (
--   "Alessandro Neves dos Santos",
--   "Alê",
--   null,
--   "Campo-Mourão",
--   now(),
--   3
-- );

-- update `lost&found`.`User` as U 
-- set password = "usuario2"
-- where U.email = "usuario2@email.com";

