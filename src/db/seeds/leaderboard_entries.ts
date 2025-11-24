import { db } from '@/db';
import { leaderboardEntries } from '@/db/schema';

async function main() {
    const sampleLeaderboardEntries = [
        {
            id: 'leaderboard_01h4kxt2e8z9y3b1n7m6q5w8r4',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            totalPoints: 850,
            invitesSent: 12,
            collabsCompleted: 15,
            messagesSent: 245,
            rank: 1,
            updatedAt: new Date('2024-03-15T14:30:00Z').toISOString(),
        },
        {
            id: 'leaderboard_01h4kxt2e8z9y3b1n7m6q5w8r5',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            totalPoints: 720,
            invitesSent: 10,
            collabsCompleted: 12,
            messagesSent: 198,
            rank: 2,
            updatedAt: new Date('2024-03-15T14:30:00Z').toISOString(),
        },
        {
            id: 'leaderboard_01h4kxt2e8z9y3b1n7m6q5w8r6',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w9r0',
            totalPoints: 680,
            invitesSent: 8,
            collabsCompleted: 11,
            messagesSent: 176,
            rank: 3,
            updatedAt: new Date('2024-03-15T14:30:00Z').toISOString(),
        },
        {
            id: 'leaderboard_01h4kxt2e8z9y3b1n7m6q5w8r7',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r5',
            totalPoints: 590,
            invitesSent: 9,
            collabsCompleted: 9,
            messagesSent: 154,
            rank: 4,
            updatedAt: new Date('2024-03-15T14:30:00Z').toISOString(),
        },
        {
            id: 'leaderboard_01h4kxt2e8z9y3b1n7m6q5w8r8',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r8',
            totalPoints: 510,
            invitesSent: 7,
            collabsCompleted: 8,
            messagesSent: 132,
            rank: 5,
            updatedAt: new Date('2024-03-15T14:30:00Z').toISOString(),
        },
        {
            id: 'leaderboard_01h4kxt2e8z9y3b1n7m6q5w8r9',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w9r1',
            totalPoints: 480,
            invitesSent: 6,
            collabsCompleted: 7,
            messagesSent: 118,
            rank: 6,
            updatedAt: new Date('2024-03-15T14:30:00Z').toISOString(),
        },
        {
            id: 'leaderboard_01h4kxt2e8z9y3b1n7m6q5w9r0',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r9',
            totalPoints: 420,
            invitesSent: 5,
            collabsCompleted: 6,
            messagesSent: 95,
            rank: 7,
            updatedAt: new Date('2024-03-15T14:30:00Z').toISOString(),
        },
        {
            id: 'leaderboard_01h4kxt2e8z9y3b1n7m6q5w9r1',
            creatorId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r6',
            totalPoints: 350,
            invitesSent: 4,
            collabsCompleted: 5,
            messagesSent: 78,
            rank: 8,
            updatedAt: new Date('2024-03-15T14:30:00Z').toISOString(),
        },
    ];

    await db.insert(leaderboardEntries).values(sampleLeaderboardEntries);
    
    console.log('✅ Leaderboard entries seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});