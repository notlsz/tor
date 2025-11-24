CREATE TABLE `collabs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`participant_ids` text NOT NULL,
	`status` text DEFAULT 'ongoing' NOT NULL,
	`deliverables` text,
	`created_at` text NOT NULL,
	`completed_at` text
);
--> statement-breakpoint
CREATE TABLE `creator_connections` (
	`id` text PRIMARY KEY NOT NULL,
	`creator_a` text NOT NULL,
	`creator_b` text NOT NULL,
	`weight` integer DEFAULT 1,
	`last_interaction` text,
	`interactions_count` integer DEFAULT 0,
	`created_at` text NOT NULL,
	FOREIGN KEY (`creator_a`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`creator_b`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `creators` (
	`id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`bio` text,
	`niche` text NOT NULL,
	`location` text,
	`city` text,
	`collab_status` text DEFAULT 'open' NOT NULL,
	`skill_tags` text,
	`audience_size` integer,
	`socials` text,
	`avatar_url` text,
	`inviter_id` text,
	`invites_remaining` integer DEFAULT 3,
	`invite_reset_at` text,
	`timezone` text DEFAULT 'America/Los_Angeles',
	`profile_meta` text,
	`reputation_score` integer DEFAULT 0,
	`last_active` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`inviter_id`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `featured_creators` (
	`id` text PRIMARY KEY NOT NULL,
	`creator_id` text NOT NULL,
	`week_start_date` text NOT NULL,
	`week_end_date` text NOT NULL,
	`blurb` text,
	`curator_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`curator_id`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `featured_creators_creator_id_unique` ON `featured_creators` (`creator_id`);--> statement-breakpoint
CREATE TABLE `invites` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`inviter_id` text NOT NULL,
	`used_by` text,
	`used_at` text,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`inviter_id`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`used_by`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invites_code_unique` ON `invites` (`code`);--> statement-breakpoint
CREATE TABLE `jarvis_activity_events` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`event_type` text NOT NULL,
	`payload` text,
	`source_id` text,
	`created_at` text NOT NULL,
	`acknowledged` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`thread_id` text NOT NULL,
	`sender_id` text NOT NULL,
	`content` text NOT NULL,
	`generated_by_ai` integer DEFAULT false,
	`read` integer DEFAULT false,
	`created_at` text NOT NULL,
	FOREIGN KEY (`thread_id`) REFERENCES `threads`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`sender_id`) REFERENCES `creators`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `threads` (
	`id` text PRIMARY KEY NOT NULL,
	`participant_ids` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `waitlist` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`failed_code` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);