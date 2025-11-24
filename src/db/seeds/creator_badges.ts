import { db } from '@/db';
import { creatorBadges } from '@/db/schema';

async function main() {
    const sampleCreatorBadges = [
        // Maya Patel - Top performer (5 badges)
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w8r4',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            badgeId: 'badge_early_adopter',
            earnedAt: new Date('2024-01-15').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w8r5',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            badgeId: 'badge_rising_star',
            earnedAt: new Date('2024-02-10').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w8r6',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            badgeId: 'badge_influencer',
            earnedAt: new Date('2024-03-05').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w8r7',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            badgeId: 'badge_collaboration_master',
            earnedAt: new Date('2024-03-20').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w8r8',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            badgeId: 'badge_conversation_starter',
            earnedAt: new Date('2024-04-01').toISOString(),
        },

        // Alex Chen - Top performer (5 badges)
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w8r9',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            badgeId: 'badge_early_adopter',
            earnedAt: new Date('2024-01-10').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r0',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            badgeId: 'badge_super_connector',
            earnedAt: new Date('2024-02-15').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r1',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            badgeId: 'badge_rising_star',
            earnedAt: new Date('2024-02-28').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r2',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            badgeId: 'badge_influencer',
            earnedAt: new Date('2024-03-15').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r3',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            badgeId: 'badge_networker',
            earnedAt: new Date('2024-04-05').toISOString(),
        },

        // David Kim - Top performer (4 badges)
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r4',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w9r0',
            badgeId: 'badge_early_adopter',
            earnedAt: new Date('2024-01-12').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r5',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w9r0',
            badgeId: 'badge_rising_star',
            earnedAt: new Date('2024-02-20').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r6',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w9r0',
            badgeId: 'badge_influencer',
            earnedAt: new Date('2024-03-10').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r7',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w9r0',
            badgeId: 'badge_community_builder',
            earnedAt: new Date('2024-04-02').toISOString(),
        },

        // Sofia Rodriguez - Mid-tier (3 badges)
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r8',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r5',
            badgeId: 'badge_early_adopter',
            earnedAt: new Date('2024-01-18').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9r9',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r5',
            badgeId: 'badge_rising_star',
            earnedAt: new Date('2024-03-01').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9s0',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r5',
            badgeId: 'badge_networker',
            earnedAt: new Date('2024-03-25').toISOString(),
        },

        // Carlos Martinez - Mid-tier (3 badges)
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9s1',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r8',
            badgeId: 'badge_early_adopter',
            earnedAt: new Date('2024-01-20').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9s2',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r8',
            badgeId: 'badge_rising_star',
            earnedAt: new Date('2024-02-25').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9s3',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r8',
            badgeId: 'badge_conversation_starter',
            earnedAt: new Date('2024-03-18').toISOString(),
        },

        // Priya Sharma - Mid-tier (2 badges)
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9s4',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w9r1',
            badgeId: 'badge_early_adopter',
            earnedAt: new Date('2024-01-25').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9s5',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w9r1',
            badgeId: 'badge_conversation_starter',
            earnedAt: new Date('2024-03-12').toISOString(),
        },

        // Emma Thompson - Lower tier (2 badges)
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9s6',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r9',
            badgeId: 'badge_early_adopter',
            earnedAt: new Date('2024-02-05').toISOString(),
        },
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9s7',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r9',
            badgeId: 'badge_community_builder',
            earnedAt: new Date('2024-03-28').toISOString(),
        },

        // James Park - Lower tier (1 badge)
        {
            id: 'cb_01h4kxt2e8z9y3b1n7m6q5w9s8',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r6',
            badgeId: 'badge_early_adopter',
            earnedAt: new Date('2024-02-10').toISOString(),
        },
    ];

    await db.insert(creatorBadges).values(sampleCreatorBadges);
    
    console.log('✅ Creator badges seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});