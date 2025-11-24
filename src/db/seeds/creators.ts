import { db } from '@/db';
import { user, creators } from '@/db/schema';

async function main() {
    const now = new Date();
    const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    // First, create user records
    const sampleUsers = [
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            name: 'Alex Chen',
            email: 'alex.chen@example.com',
            emailVerified: false,
            createdAt: new Date('2024-08-15T10:30:00Z'),
            updatedAt: new Date('2024-08-15T10:30:00Z'),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r5',
            name: 'Sofia Rodriguez',
            email: 'sofia.rodriguez@example.com',
            emailVerified: false,
            createdAt: new Date('2024-09-01T14:20:00Z'),
            updatedAt: new Date('2024-09-01T14:20:00Z'),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r6',
            name: 'James Park',
            email: 'james.park@example.com',
            emailVerified: false,
            createdAt: new Date('2024-09-20T09:15:00Z'),
            updatedAt: new Date('2024-09-20T09:15:00Z'),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            name: 'Maya Patel',
            email: 'maya.patel@example.com',
            emailVerified: false,
            createdAt: new Date('2024-07-10T16:45:00Z'),
            updatedAt: new Date('2024-07-10T16:45:00Z'),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r8',
            name: 'Carlos Martinez',
            email: 'carlos.martinez@example.com',
            emailVerified: false,
            createdAt: new Date('2024-10-05T11:30:00Z'),
            updatedAt: new Date('2024-10-05T11:30:00Z'),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r9',
            name: 'Emma Thompson',
            email: 'emma.thompson@example.com',
            emailVerified: false,
            createdAt: new Date('2024-08-28T13:00:00Z'),
            updatedAt: new Date('2024-08-28T13:00:00Z'),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w9r0',
            name: 'David Kim',
            email: 'david.kim@example.com',
            emailVerified: false,
            createdAt: new Date('2024-07-22T08:45:00Z'),
            updatedAt: new Date('2024-07-22T08:45:00Z'),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w9r1',
            name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            emailVerified: false,
            createdAt: new Date('2024-09-15T15:20:00Z'),
            updatedAt: new Date('2024-09-15T15:20:00Z'),
        },
    ];

    await db.insert(user).values(sampleUsers);

    // Then create creator records
    const sampleCreators = [
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            displayName: 'Alex Chen',
            bio: 'Music producer and sound engineer creating cinematic soundscapes. Specializing in ambient and electronic music with over 10 years of experience.',
            niche: 'Music',
            location: 'United States',
            city: 'Los Angeles',
            collabStatus: 'open',
            skillTags: JSON.stringify(['music production', 'mixing', 'sound design', 'vocals']),
            audienceSize: 2500000,
            socials: JSON.stringify({
                instagram: '@alexchenmusic',
                youtube: 'alexchenmusic',
                tiktok: '@alexchen'
            }),
            avatarUrl: null,
            inviterId: null,
            invitesRemaining: 3,
            inviteResetAt: oneMonthFromNow.toISOString(),
            timezone: 'America/Los_Angeles',
            profileMeta: null,
            reputationScore: 92,
            lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date('2024-08-15T10:30:00Z').toISOString(),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r5',
            displayName: 'Sofia Rodriguez',
            bio: 'Cinematographer and director crafting visual stories. Award-winning filmmaker passionate about documentary work and narrative storytelling.',
            niche: 'Film/Video',
            location: 'United States',
            city: 'New York',
            collabStatus: 'open',
            skillTags: JSON.stringify(['cinematography', 'editing', 'directing', 'color grading']),
            audienceSize: 1800000,
            socials: JSON.stringify({
                youtube: 'sofiarodriguez',
                instagram: '@sofiarodfilms'
            }),
            avatarUrl: null,
            inviterId: null,
            invitesRemaining: 3,
            inviteResetAt: oneMonthFromNow.toISOString(),
            timezone: 'America/New_York',
            profileMeta: null,
            reputationScore: 88,
            lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date('2024-09-01T14:20:00Z').toISOString(),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r6',
            displayName: 'James Park',
            bio: 'Fashion designer and creative director exploring sustainable fashion. Building a community around ethical style and conscious consumption.',
            niche: 'Fashion & Style',
            location: 'United States',
            city: 'San Francisco',
            collabStatus: 'busy',
            skillTags: JSON.stringify(['fashion design', 'styling', 'photography', 'branding']),
            audienceSize: 750000,
            socials: JSON.stringify({
                instagram: '@jamesparkstyle',
                tiktok: '@jamespark'
            }),
            avatarUrl: null,
            inviterId: null,
            invitesRemaining: 3,
            inviteResetAt: oneMonthFromNow.toISOString(),
            timezone: 'America/Los_Angeles',
            profileMeta: null,
            reputationScore: 85,
            lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date('2024-09-20T09:15:00Z').toISOString(),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            displayName: 'Maya Patel',
            bio: 'Tech reviewer and educator making technology accessible. Demystifying gadgets and software with clear, engaging content for everyday users.',
            niche: 'Technology & Gadgets',
            location: 'United States',
            city: 'Austin',
            collabStatus: 'open',
            skillTags: JSON.stringify(['tech reviews', 'video editing', 'scripting', 'animation']),
            audienceSize: 3200000,
            socials: JSON.stringify({
                youtube: 'mayatech',
                instagram: '@mayapateltech',
                tiktok: '@mayatech'
            }),
            avatarUrl: null,
            inviterId: null,
            invitesRemaining: 3,
            inviteResetAt: oneMonthFromNow.toISOString(),
            timezone: 'America/Chicago',
            profileMeta: null,
            reputationScore: 95,
            lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date('2024-07-10T16:45:00Z').toISOString(),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r8',
            displayName: 'Carlos Martinez',
            bio: 'Chef and food content creator celebrating Latin American cuisine. Sharing family recipes and modern interpretations of traditional dishes.',
            niche: 'Food & Cooking',
            location: 'United States',
            city: 'Miami',
            collabStatus: 'open',
            skillTags: JSON.stringify(['cooking', 'recipe development', 'food photography', 'videography']),
            audienceSize: 1200000,
            socials: JSON.stringify({
                instagram: '@carlosmartinezcooks',
                youtube: 'carlosmartinezcooks',
                tiktok: '@carloschef'
            }),
            avatarUrl: null,
            inviterId: null,
            invitesRemaining: 3,
            inviteResetAt: oneMonthFromNow.toISOString(),
            timezone: 'America/Chicago',
            profileMeta: null,
            reputationScore: 87,
            lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date('2024-10-05T11:30:00Z').toISOString(),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r9',
            displayName: 'Emma Thompson',
            bio: 'Wellness coach and lifestyle creator focused on holistic health. Inspiring balanced living through mindfulness, movement, and self-care practices.',
            niche: 'Lifestyle & Wellness',
            location: 'United States',
            city: 'Los Angeles',
            collabStatus: 'open',
            skillTags: JSON.stringify(['wellness coaching', 'content creation', 'photography', 'writing']),
            audienceSize: 980000,
            socials: JSON.stringify({
                instagram: '@emmathompsonwellness',
                tiktok: '@emmawellness'
            }),
            avatarUrl: null,
            inviterId: null,
            invitesRemaining: 3,
            inviteResetAt: oneMonthFromNow.toISOString(),
            timezone: 'America/Los_Angeles',
            profileMeta: null,
            reputationScore: 83,
            lastActive: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date('2024-08-28T13:00:00Z').toISOString(),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w9r0',
            displayName: 'David Kim',
            bio: 'Professional gamer and esports commentator. Streaming competitive gameplay and providing in-depth analysis of the latest gaming trends.',
            niche: 'Gaming & Esports',
            location: 'United States',
            city: 'Seattle',
            collabStatus: 'not_looking',
            skillTags: JSON.stringify(['gaming', 'streaming', 'video editing', 'commentary']),
            audienceSize: 5600000,
            socials: JSON.stringify({
                youtube: 'davidkimgaming',
                twitch: 'davidkim',
                instagram: '@davidkimgames'
            }),
            avatarUrl: null,
            inviterId: null,
            invitesRemaining: 3,
            inviteResetAt: oneMonthFromNow.toISOString(),
            timezone: 'America/Los_Angeles',
            profileMeta: null,
            reputationScore: 91,
            lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date('2024-07-22T08:45:00Z').toISOString(),
        },
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w9r1',
            displayName: 'Priya Sharma',
            bio: 'Educator and science communicator making learning fun. Breaking down complex topics into engaging, accessible content for curious minds.',
            niche: 'Education & Learning',
            location: 'United States',
            city: 'Boston',
            collabStatus: 'open',
            skillTags: JSON.stringify(['teaching', 'animation', 'scripting', 'research']),
            audienceSize: 650000,
            socials: JSON.stringify({
                youtube: 'priyasharmalearns',
                instagram: '@priyasharma_edu'
            }),
            avatarUrl: null,
            inviterId: null,
            invitesRemaining: 3,
            inviteResetAt: oneMonthFromNow.toISOString(),
            timezone: 'America/New_York',
            profileMeta: null,
            reputationScore: 89,
            lastActive: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date('2024-09-15T15:20:00Z').toISOString(),
        },
    ];

    await db.insert(creators).values(sampleCreators);
    
    console.log('✅ Creators seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});