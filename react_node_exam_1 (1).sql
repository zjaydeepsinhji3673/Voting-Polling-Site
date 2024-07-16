-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2024 at 09:30 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_node_exam_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_answers`
--

CREATE TABLE `tbl_answers` (
  `id` bigint(21) NOT NULL,
  `poll_id` bigint(21) NOT NULL,
  `question_id` bigint(21) NOT NULL,
  `answer` varchar(128) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_answers`
--

INSERT INTO `tbl_answers` (`id`, `poll_id`, `question_id`, `answer`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 5, 3, 'Yes', 1, '2024-06-03 09:31:20', '2024-06-03 09:31:20'),
(4, 5, 3, 'No', 1, '2024-06-03 09:31:20', '2024-06-03 09:31:20'),
(5, 6, 4, 'Haa', 1, '2024-06-03 12:54:19', '2024-06-03 12:54:19'),
(6, 6, 4, 'Naa', 1, '2024-06-03 12:54:19', '2024-06-03 12:54:19'),
(7, 7, 5, 'No', 1, '2024-06-04 06:05:46', '2024-06-04 06:05:46'),
(8, 7, 5, 'Yes', 1, '2024-06-04 06:05:46', '2024-06-04 06:05:46'),
(9, 8, 6, 'Yes - 100%', 1, '2024-06-05 04:10:02', '2024-06-05 04:10:02'),
(10, 8, 6, 'No - 0%', 1, '2024-06-05 04:10:02', '2024-06-05 04:10:02'),
(11, 8, 6, 'Half - 50%', 1, '2024-06-05 04:10:02', '2024-06-05 04:10:02'),
(12, 9, 7, 'No', 1, '2024-06-05 04:16:06', '2024-06-05 04:16:06'),
(13, 9, 7, 'Yes', 1, '2024-06-05 04:16:06', '2024-06-05 04:16:06'),
(16, 11, 9, 'BJP', 1, '2024-06-05 05:46:44', '2024-06-05 05:46:44'),
(17, 11, 9, 'CON', 1, '2024-06-05 05:46:44', '2024-06-05 05:46:44');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_poll`
--

CREATE TABLE `tbl_poll` (
  `id` bigint(21) NOT NULL,
  `user_id` bigint(21) NOT NULL,
  `name` varchar(128) NOT NULL,
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_poll`
--

INSERT INTO `tbl_poll` (`id`, `user_id`, `name`, `start_time`, `end_time`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 5, 'Rain', '2024-06-03', '2024-06-05', 1, '2024-06-03 09:31:20', '2024-06-03 12:20:46'),
(6, 1, 'Task', '2024-06-02', '2024-06-03', 2, '2024-06-03 12:54:19', '2024-06-04 12:49:01'),
(7, 7, 'Task', '2024-06-04', '2024-06-12', 1, '2024-06-04 06:05:46', '2024-06-04 06:05:46'),
(8, 1, 'Evalution', '2024-06-04', '2024-06-07', 1, '2024-06-05 04:10:02', '2024-06-05 04:13:33'),
(9, 1, 'Exam', '2024-06-04', '2024-06-04', 1, '2024-06-05 04:16:06', '2024-06-05 04:16:06'),
(11, 1, 'Election', '2024-06-05', '2024-06-05', 1, '2024-06-05 05:46:44', '2024-06-05 07:35:44');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_questions`
--

CREATE TABLE `tbl_questions` (
  `id` bigint(21) NOT NULL,
  `poll_id` bigint(21) NOT NULL,
  `question` varchar(256) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_questions`
--

INSERT INTO `tbl_questions` (`id`, `poll_id`, `question`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 5, 'What do you Think It will rain or not?', 1, '2024-06-03 09:31:20', '2024-06-03 09:31:20'),
(4, 6, 'task completed?', 1, '2024-06-03 12:54:19', '2024-06-03 12:54:19'),
(5, 7, 'task completed?', 1, '2024-06-04 06:05:46', '2024-06-04 06:05:46'),
(6, 8, 'Evaluation Done or Not', 1, '2024-06-05 04:10:02', '2024-06-05 04:10:02'),
(7, 9, 'Exam Done or Not?', 1, '2024-06-05 04:16:06', '2024-06-05 04:16:06'),
(9, 11, 'BJP or CONG?', 1, '2024-06-05 05:46:44', '2024-06-05 05:46:44');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_results`
--

CREATE TABLE `tbl_results` (
  `id` bigint(21) NOT NULL,
  `user_id` bigint(21) NOT NULL,
  `poll_id` bigint(21) NOT NULL,
  `question_id` bigint(21) NOT NULL,
  `answer_id` bigint(21) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_results`
--

INSERT INTO `tbl_results` (`id`, `user_id`, `poll_id`, `question_id`, `answer_id`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 5, 3, 3, 1, '2024-06-03 11:45:41', '2024-06-03 13:11:32'),
(2, 1, 6, 4, 5, 1, '2024-06-03 12:54:40', '2024-06-03 13:11:36'),
(3, 5, 5, 3, 3, 1, '2024-06-03 13:48:23', '2024-06-05 10:27:24'),
(4, 6, 5, 3, 3, 1, '2024-06-04 04:40:03', '2024-06-04 04:40:03'),
(5, 7, 5, 3, 3, 1, '2024-06-04 06:07:06', '2024-06-04 06:07:20'),
(6, 7, 7, 5, 8, 1, '2024-06-04 06:07:45', '2024-06-04 06:07:45'),
(7, 5, 7, 5, 8, 1, '2024-06-04 06:09:26', '2024-06-04 06:17:32'),
(8, 1, 8, 6, 9, 1, '2024-06-05 04:14:17', '2024-06-05 09:16:41');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(21) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `token` varchar(128) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `first_name`, `last_name`, `email`, `password`, `token`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Jaydeepsinh', 'Zala', 'jaydeep@gmail.com', '3c4e2cc3ad9ff9473a53ed4825ed5a90', '', 1, '2024-05-28 06:12:16', '2024-07-06 02:12:41'),
(2, 'Vatsal', 'Patel', 'vatsal@gmail.com', 'fd5f6a349ebe4ae7cf7e16a4e02754f3', '', 1, '2024-05-29 07:47:27', '2024-06-02 08:02:08'),
(5, 'Akhil', 'Gohel', 'akhil@gmail.com', '67eab3371215e0bfd39d5b7111b1e031', 'PodwAr7GQd', 1, '2024-06-03 06:27:46', '2024-06-05 10:25:49'),
(6, 'Aditya', 'Patel', 'aditya@gmail.com', 'a61a2c6020554f873338fd2e9aa1f030', '', 1, '2024-06-04 04:30:33', '2024-06-04 04:40:10'),
(7, 'Jaydeesinh', 'Zala', 'jaydeep1@gmail.com', '3c4e2cc3ad9ff9473a53ed4825ed5a90', '', 1, '2024-06-04 06:01:52', '2024-06-04 07:01:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_answers`
--
ALTER TABLE `tbl_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poll_id` (`poll_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `tbl_poll`
--
ALTER TABLE `tbl_poll`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `tbl_questions`
--
ALTER TABLE `tbl_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poll_id` (`poll_id`);

--
-- Indexes for table `tbl_results`
--
ALTER TABLE `tbl_results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `poll_id` (`poll_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `answer_id` (`answer_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_answers`
--
ALTER TABLE `tbl_answers`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_poll`
--
ALTER TABLE `tbl_poll`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_questions`
--
ALTER TABLE `tbl_questions`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_results`
--
ALTER TABLE `tbl_results`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_answers`
--
ALTER TABLE `tbl_answers`
  ADD CONSTRAINT `tbl_answers_ibfk_1` FOREIGN KEY (`poll_id`) REFERENCES `tbl_poll` (`id`),
  ADD CONSTRAINT `tbl_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `tbl_questions` (`id`);

--
-- Constraints for table `tbl_poll`
--
ALTER TABLE `tbl_poll`
  ADD CONSTRAINT `tbl_poll_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`);

--
-- Constraints for table `tbl_questions`
--
ALTER TABLE `tbl_questions`
  ADD CONSTRAINT `tbl_questions_ibfk_1` FOREIGN KEY (`poll_id`) REFERENCES `tbl_poll` (`id`);

--
-- Constraints for table `tbl_results`
--
ALTER TABLE `tbl_results`
  ADD CONSTRAINT `tbl_results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`),
  ADD CONSTRAINT `tbl_results_ibfk_2` FOREIGN KEY (`poll_id`) REFERENCES `tbl_poll` (`id`),
  ADD CONSTRAINT `tbl_results_ibfk_3` FOREIGN KEY (`question_id`) REFERENCES `tbl_questions` (`id`),
  ADD CONSTRAINT `tbl_results_ibfk_4` FOREIGN KEY (`answer_id`) REFERENCES `tbl_answers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
