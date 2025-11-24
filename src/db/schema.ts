import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';



// Auth tables for better-auth
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

// Recreate creators table with correct structure
export const creators = sqliteTable('creators', {
  id: text('id').primaryKey().references(() => user.id, { onDelete: 'cascade' }),
  displayName: text('display_name').notNull(),
  bio: text('bio'),
  niche: text('niche').notNull(),
  location: text('location'),
  city: text('city'),
  collabStatus: text('collab_status').notNull().default('open'),
  skillTags: text('skill_tags', { mode: 'json' }),
  audienceSize: integer('audience_size'),
  socials: text('socials', { mode: 'json' }),
  avatarUrl: text('avatar_url'),
  inviterId: text('inviter_id').references(() => creators.id),
  invitesRemaining: integer('invites_remaining').default(3),
  inviteResetAt: text('invite_reset_at'),
  timezone: text('timezone').default('America/Los_Angeles'),
  profileMeta: text('profile_meta', { mode: 'json' }),
  reputationScore: integer('reputation_score').default(0),
  lastActive: text('last_active'),
  createdAt: text('created_at').notNull(),
});

// Invites table - tracks invite codes
export const invites = sqliteTable('invites', {
  id: text('id').primaryKey(),
  code: text('code').notNull().unique(), // 6-digit code
  inviterId: text('inviter_id').notNull().references(() => creators.id, { onDelete: 'cascade' }),
  usedBy: text('used_by').references(() => creators.id),
  usedAt: text('used_at'), // ISO timestamp
  expiresAt: text('expires_at').notNull(), // ISO timestamp
  createdAt: text('created_at').notNull(),
});

// Waitlist table - stores users who tried invalid codes
export const waitlist = sqliteTable('waitlist', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  failedCode: text('failed_code'), // The code they tried
  createdAt: text('created_at').notNull(),
});

// Threads table - conversation threads between creators
export const threads = sqliteTable('threads', {
  id: text('id').primaryKey(),
  participantIds: text('participant_ids', { mode: 'json' }).notNull(), // Array of creator IDs
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Messages table - individual messages in threads
export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  threadId: text('thread_id').notNull().references(() => threads.id, { onDelete: 'cascade' }),
  senderId: text('sender_id').notNull().references(() => creators.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  generatedByAi: integer('generated_by_ai', { mode: 'boolean' }).default(false),
  read: integer('read', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
});

// Creator connections - tracks relationships between creators
export const creatorConnections = sqliteTable('creator_connections', {
  id: text('id').primaryKey(),
  creatorA: text('creator_a').notNull().references(() => creators.id, { onDelete: 'cascade' }),
  creatorB: text('creator_b').notNull().references(() => creators.id, { onDelete: 'cascade' }),
  weight: integer('weight').default(1), // Dynamic score (stored as integer, divide by 10 for decimal)
  lastInteraction: text('last_interaction'), // ISO timestamp
  interactionsCount: integer('interactions_count').default(0),
  createdAt: text('created_at').notNull(),
});

// Collabs table - collaboration projects
export const collabs = sqliteTable('collabs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  participantIds: text('participant_ids', { mode: 'json' }).notNull(), // Array of creator IDs
  status: text('status').notNull().default('ongoing'), // 'ongoing', 'completed', 'cancelled'
  deliverables: text('deliverables', { mode: 'json' }), // Project deliverables
  createdAt: text('created_at').notNull(),
  completedAt: text('completed_at'), // ISO timestamp
});

// Featured creators table - weekly featured creators
export const featuredCreators = sqliteTable('featured_creators', {
  id: text('id').primaryKey(),
  creatorId: text('creator_id').notNull().unique().references(() => creators.id, { onDelete: 'cascade' }),
  weekStartDate: text('week_start_date').notNull(), // ISO date
  weekEndDate: text('week_end_date').notNull(), // ISO date
  blurb: text('blurb'),
  curatorId: text('curator_id').references(() => creators.id),
  createdAt: text('created_at').notNull(),
});

// Badges table - achievement badges that creators can earn
export const badges = sqliteTable('badges', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  icon: text('icon'),
  criteria: text('criteria', { mode: 'json' }),
  tier: text('tier').notNull(), // 'bronze', 'silver', 'gold', 'platinum'
  points: integer('points').notNull(),
  createdAt: text('created_at').notNull(),
});

// Creator badges table - junction table for creators and badges
export const creatorBadges = sqliteTable('creator_badges', {
  id: text('id').primaryKey(),
  creatorId: text('creator_id').notNull().references(() => creators.id, { onDelete: 'cascade' }),
  badgeId: text('badge_id').notNull().references(() => badges.id, { onDelete: 'cascade' }),
  earnedAt: text('earned_at').notNull(),
});

// Leaderboard entries table - tracks creator rankings and stats
export const leaderboardEntries = sqliteTable('leaderboard_entries', {
  id: text('id').primaryKey(),
  creatorId: text('creator_id').notNull().unique().references(() => creators.id, { onDelete: 'cascade' }),
  totalPoints: integer('total_points').default(0),
  invitesSent: integer('invites_sent').default(0),
  collabsCompleted: integer('collabs_completed').default(0),
  messagesSent: integer('messages_sent').default(0),
  rank: integer('rank'),
  updatedAt: text('updated_at').notNull(),
});

// Jarvis activity events - tracks AI assistant activities
export const jarvisActivityEvents = sqliteTable('jarvis_activity_events', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => creators.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(), // 'match_generated', 'intro_sent', 'scan_completed', etc.
  payload: text('payload', { mode: 'json' }), // Event-specific data
  sourceId: text('source_id'), // Reference to related entity
  createdAt: text('created_at').notNull(),
  acknowledged: integer('acknowledged', { mode: 'boolean' }).default(false),
});