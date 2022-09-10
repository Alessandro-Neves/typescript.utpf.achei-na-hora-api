create schema `lost&found` default character set latin2;

create table `lost&found`.`User` (
  `id` integer unsigned not null auto_increment primary key,
  name varchar(255),
  email varchar(255) unique not null
);

create table `lost&found`.`Post` (
  `id` integer unsigned not null auto_increment primary key,
  title varchar(255) not null,
  `createdAt` timestamp not null default now(),
  content text,
  published boolean not null default false,
  `authorId` integer unsigned not null,
  foreign key (`authorId`) references `lost&found`.`User`(id)
);

create table `lost&found`.`Profile` (
  `id` integer unsigned not null auto_increment primary key,
  bio text,
  `userId` integer unsigned not null unique,
  foreign key (`userId`) references `lost&found`.`User`(id)
);

-- use `lost&found`;

insert into `lost&found`.`User` (name, email) values (
  "usuario1",
  "usuario1@email.com"
);

insert into `lost&found`.`User` (name, email) values (
  "usuario2",
  "usuario2@email.com"
);