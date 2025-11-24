import { db } from '@/db';
import { invites } from '@/db/schema';

async function main() {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const sampleInvites = [
        // Alex Chen's invites
        {
            id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
            code: '123456',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            usedBy: null,
            usedAt: null,
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
            code: '234567',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            usedBy: 'user_01h4kxt2e8z9y3b1n7m6q5w8r5',
            usedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
        
        // Maya Patel's invites
        {
            id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
            code: '345678',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            usedBy: null,
            usedAt: null,
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
            code: '456789',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            usedBy: 'user_01h4kxt2e8z9y3b1n7m6q5w8r8',
            usedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
            code: '567890',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r7',
            usedBy: null,
            usedAt: null,
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        
        // Sofia Rodriguez's invites
        {
            id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
            code: '678901',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r5',
            usedBy: null,
            usedAt: null,
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
            code: '789012',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r5',
            usedBy: 'user_01h4kxt2e8z9y3b1n7m6q5w8r9',
            usedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        },
        
        // Carlos Martinez's invites
        {
            id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
            code: '890123',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r8',
            usedBy: null,
            usedAt: null,
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
            code: '901234',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r8',
            usedBy: 'user_01h4kxt2e8z9y3b1n7m6q5w9r1',
            usedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        },
        
        // Emma Thompson's invite
        {
            id: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
            code: '012345',
            inviterId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r9',
            usedBy: null,
            usedAt: null,
            expiresAt: thirtyDaysFromNow.toISOString(),
            createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];

    await db.insert(invites).values(sampleInvites);
    
    console.log('✅ Invites seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});