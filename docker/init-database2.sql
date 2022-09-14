create schema `lost&found` default character set latin2;

create table `lost&found`.`User` (
  `id` integer unsigned not null auto_increment primary key,
  `email` varchar(255) unique not null,
  `password` varchar(255) not null,
  `created_at` timestamp not null default now()
  `updated_at` timestamp not null
);

create table `lost&found`.`Person` (
  `id` integer unsigned not null auto_increment primary key,
  `full_name` varchar(255),
  `nickname` varchar(255),
  `image` blob,
  `campus` varchar(45),
  `created_at` timestamp not not null default now(),
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
  `created_at` timestamp not not null default now(),
  `updated_at` timestamp not null,

  `owner_id` integer unsigned not null,
  `discoverer_id` integer unsigned not null,

  foreign key (`owner_id`) references `lost&found`.`User` (`id`),
  foreign key (`discoverer_id`) references `lost&found`.`User` (`id`)
);

-- create table `lost&found`.`Post` (
--   `id` integer unsigned not null auto_increment primary key,
--   title varchar(255) not null,
--   `createdAt` timestamp not null default now(),
--   content text,
--   published boolean not null default false,
--   `authorId` integer unsigned not null,
--   foreign key (`authorId`) references `lost&found`.`User`(id)
-- );

-- create table `lost&found`.`Profile` (
--   `id` integer unsigned not null auto_increment primary key,
--   bio text,
--   `userId` integer unsigned not null unique,
--   foreign key (`userId`) references `lost&found`.`User`(id)
-- );

-- -- use `lost&found`;

-- insert into `lost&found`.`User` (name, email) values (
--   "usuario1",
--   "usuario1@email.com"
-- );

-- insert into `lost&found`.`User` (name, email) values (
--   "usuario2",
--   "usuario2@email.com"
-- );