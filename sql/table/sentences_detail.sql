/*
 Navicat Premium Data Transfer

 Source Server         : Vocavulary
 Source Server Type    : MySQL
 Source Server Version : 50739
 Source Host           : localhost:3306
 Source Schema         : vocabulary

 Target Server Type    : MySQL
 Target Server Version : 50739
 File Encoding         : 65001

 Date: 26/10/2022 13:57:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sentences_detail
-- ----------------------------
DROP TABLE IF EXISTS `sentences_detail`;
CREATE TABLE `sentences_detail`  (
  `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sentence_id` int(6) UNSIGNED NOT NULL,
  `vocabulary_id` int(6) UNSIGNED NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sentence_id`(`sentence_id`) USING BTREE,
  INDEX `vocabulary_id`(`vocabulary_id`) USING BTREE,
  CONSTRAINT `sentences_detail_ibfk_1` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sentences_detail_ibfk_2` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
