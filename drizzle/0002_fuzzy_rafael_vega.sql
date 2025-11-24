CREATE TABLE `badges` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`icon` text,
	`criteria` text,
	`tier` text NOT NULL,
	`points` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `creator_badges` (
	`id` text PRIMARY KEY NOT NULL,
	`creator_id` text NOT NULL,
	`badge_id` text NOT NULL,
	`earned_at` text NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`badge_id`) REFERENCES `badges`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `leaderboard_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`creator_id` text NOT NULL,
	`total_points` integer DEFAULT 0,
	`invites_sent` integer DEFAULT 0,
	`collabs_completed` integer DEFAULT 0,
	`messages_sent` integer DEFAULT 0,
	`rank` integer,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leaderboard_entries_creator_id_unique` ON `leaderboard_entries` (`creator_id`);