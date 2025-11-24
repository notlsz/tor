import { db } from '@/db';
import { badges } from '@/db/schema';

async function main() {
    const sampleBadges = [
        {
            id: 'badge_early_adopter',
            name: 'Early Adopter',
            description: 'Joined during launch week and helped build the community from day one',
            icon: '🌟',
            tier: 'bronze',
            points: 50,
            criteria: JSON.stringify({ type: 'time_based', threshold: '2024-01-01' }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            id: 'badge_super_connector',
            name: 'Super Connector',
            description: 'Connected 10+ creators to the platform through invites',
            icon: '🤝',
            tier: 'gold',
            points: 200,
            criteria: JSON.stringify({ type: 'invites_sent', threshold: 10 }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            id: 'badge_collaboration_master',
            name: 'Collaboration Master',
            description: 'Completed 20+ successful collaborations with fellow creators',
            icon: '🏆',
            tier: 'platinum',
            points: 500,
            criteria: JSON.stringify({ type: 'collabs_completed', threshold: 20 }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            id: 'badge_networker',
            name: 'Networker',
            description: 'Sent 5+ invites to help grow the creator community',
            icon: '🌐',
            tier: 'silver',
            points: 100,
            criteria: JSON.stringify({ type: 'invites_sent', threshold: 5 }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            id: 'badge_rising_star',
            name: 'Rising Star',
            description: 'Reached 100k audience across all platforms',
            icon: '📈',
            tier: 'bronze',
            points: 75,
            criteria: JSON.stringify({ type: 'audience_size', threshold: 100000 }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            id: 'badge_influencer',
            name: 'Influencer',
            description: 'Reached 1M audience milestone across all platforms',
            icon: '💫',
            tier: 'gold',
            points: 250,
            criteria: JSON.stringify({ type: 'audience_size', threshold: 1000000 }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            id: 'badge_community_builder',
            name: 'Community Builder',
            description: 'Created 5+ collaboration opportunities for other creators',
            icon: '🎯',
            tier: 'silver',
            points: 150,
            criteria: JSON.stringify({ type: 'collabs_created', threshold: 5 }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            id: 'badge_conversation_starter',
            name: 'Conversation Starter',
            description: 'Sent 100+ messages building meaningful connections',
            icon: '💬',
            tier: 'bronze',
            points: 50,
            criteria: JSON.stringify({ type: 'messages_sent', threshold: 100 }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            id: 'badge_active_member',
            name: 'Active Member',
            description: 'Active for 30+ days consistently engaging with the community',
            icon: '⚡',
            tier: 'silver',
            points: 100,
            criteria: JSON.stringify({ type: 'days_active', threshold: 30 }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            id: 'badge_top_performer',
            name: 'Top Performer',
            description: 'Reached rank #1 on the leaderboard through exceptional engagement',
            icon: '👑',
            tier: 'platinum',
            points: 1000,
            criteria: JSON.stringify({ type: 'leaderboard_rank', threshold: 1 }),
            createdAt: new Date('2024-01-01').toISOString(),
        },
    ];

    await db.insert(badges).values(sampleBadges);
    
    console.log('✅ Badges seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});