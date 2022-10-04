-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` MEDIUMTEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `origin_id` INTEGER UNSIGNED NOT NULL,
    `destiny_id` INTEGER UNSIGNED NOT NULL,

    INDEX `destiny_id`(`destiny_id`),
    INDEX `origin_id`(`origin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Object` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NULL,
    `location` VARCHAR(255) NULL,
    `type` ENUM('ACHADO', 'PERDIDO') NULL,
    `tag` VARCHAR(45) NULL,
    `image` BLOB NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `owner_id` INTEGER UNSIGNED NULL,
    `discoverer_id` INTEGER UNSIGNED NULL,

    INDEX `discoverer_id`(`discoverer_id`),
    INDEX `owner_id`(`owner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(255) NOT NULL,
    `image` BLOB NULL,
    `campus` VARCHAR(45) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `source` VARCHAR(255) NOT NULL,
    `use` ENUM('GENERAL', 'OBJECT') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Object_Image` (
    `id_obj` INTEGER UNSIGNED NOT NULL,
    `id_img` INTEGER UNSIGNED NOT NULL,

    INDEX `id_img`(`id_img`),
    PRIMARY KEY (`id_obj`, `id_img`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_ibfk_1` FOREIGN KEY (`origin_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_ibfk_2` FOREIGN KEY (`destiny_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Object` ADD CONSTRAINT `Object_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Object` ADD CONSTRAINT `Object_ibfk_2` FOREIGN KEY (`discoverer_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Object_Image` ADD CONSTRAINT `Object_Image_ibfk_1` FOREIGN KEY (`id_obj`) REFERENCES `Object`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Object_Image` ADD CONSTRAINT `Object_Image_ibfk_2` FOREIGN KEY (`id_img`) REFERENCES `Image`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
