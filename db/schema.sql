-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INTEGER NOT NULL ,
  `Name` VARCHAR(255) NULL ,
  `Slogan` VARCHAR(500) NULL ,
  `description` VARCHAR(1000) ,
  `category` VARCHAR(255) NOT NULL DEFAULT 'NULL',
  `default_price` INTEGER NOT NULL,
  UNIQUE KEY (`id`)
);

-- ---
-- Table 'categories'
--
-- ---

DROP TABLE IF EXISTS `categories`;

-- ---
-- Table 'Style'
--
-- ---

DROP TABLE IF EXISTS `styles`;

CREATE TABLE `styles` (
  `id` INTEGER NOT NULL ,
  `id_products` INTEGER NOT NULL ,
  `name` VARCHAR(255) NULL ,
  `sale_price` VARCHAR(255) ,
  `original_price` INTEGER NOT NULL ,
  `default_style` INTEGER NOT NULL ,
  UNIQUE KEY (`id`)
);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS `skus`;

CREATE TABLE `skus` (
  `sku` INTEGER NOT NULL ,
  `styleId` INTEGER NOT NULL ,
  `size` VARCHAR(255) ,
  `quantity` INTEGER NOT NULL ,

  UNIQUE KEY (`sku`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER NOT NULL,
  `styleId` INTEGER NOT NULL,
  `url` TEXT,
  `thumbnail_url` TEXT,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'features'
--
-- ---

DROP TABLE IF EXISTS `features`;

CREATE TABLE `features` (
  `id` INTEGER NOT NULL ,
  `product_id` INTEGER NULL,
  `feature` VARCHAR(255) NULL,
  `value` VARCHAR(255) NULL,
  UNIQUE KEY (`id`)
);
-- ---
-- Table 'related products'
--
-- ---

DROP TABLE IF EXISTS `related products`;

CREATE TABLE `related` (
  `id` INTEGER NOT NULL  ,
  `id_products` INTEGER NULL,
  `related_product_id` INTEGER NULL,
  UNIQUE KEY (`id`)
);

-- ---
-- Table 'values'
--
-- ---


-- ---
-- Foreign Keys
-- ---

ALTER TABLE `products` ADD FOREIGN KEY (id_Category) REFERENCES `categories` (`id`);
ALTER TABLE `styles` ADD FOREIGN KEY (id_products) REFERENCES `products` (`id`);
ALTER TABLE `skus` ADD FOREIGN KEY (styleId) REFERENCES `styles` (`id`);
ALTER TABLE `photos` ADD FOREIGN KEY (styleId) REFERENCES `styles` (`id`);
ALTER TABLE `features` ADD FOREIGN KEY (id_products) REFERENCES `products` (`id`);
ALTER TABLE `related products` ADD FOREIGN KEY (id_products) REFERENCES `products` (`id`);
ALTER TABLE `values` ADD FOREIGN KEY (id_features) REFERENCES `features` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Style` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `related products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `values` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
