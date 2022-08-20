/*
 Navicat Premium Data Transfer

 Source Server         : Vocavulary
 Source Server Type    : MySQL
 Source Server Version : 50738
 Source Host           : localhost:3306
 Source Schema         : vocabulary

 Target Server Type    : MySQL
 Target Server Version : 50738
 File Encoding         : 65001

 Date: 20/08/2022 17:22:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for log_detail
-- ----------------------------
DROP TABLE IF EXISTS `log_detail`;
CREATE TABLE `log_detail`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `log_id` int(10) UNSIGNED NOT NULL,
  `vocabulary_id` int(6) UNSIGNED NOT NULL,
  `correct` int(4) NOT NULL,
  `incorrect` int(4) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `log_id`(`log_id`) USING BTREE,
  INDEX `vocabulary_id`(`vocabulary_id`) USING BTREE,
  CONSTRAINT `log_detail_ibfk_1` FOREIGN KEY (`log_id`) REFERENCES `log` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `log_detail_ibfk_2` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3416 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
