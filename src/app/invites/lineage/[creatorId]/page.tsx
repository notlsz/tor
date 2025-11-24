"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Creator {
  id: string;
  displayName: string;
  avatarUrl: string | null;
}

interface LineageData {
  inviter: Creator | null;
  invitees: Array<Creator & { inviteCode: string; usedAt: string }>;
}

export default function InviteLineagePage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, isPending } = useSession();
  const [lineage, setLineage] = useState<LineageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session && params.creatorId) {
      fetchLineage();
    }
  }, [session, params.creatorId]);

  const fetchLineage = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/invites/lineage/${params.creatorId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLineage(data);
      } else {
        toast.error("Failed to load invite lineage");
      }
    } catch (error) {
      console.error("Error fetching lineage:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/discover">
              <h1 className="text-2xl font-bold">Directory</h1>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/discover" className="text-sm font-medium text-gray-600 hover:underline">
                Discover
              </Link>
              <Link href="/messages" className="text-sm font-medium text-gray-600 hover:underline">
                Messages
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium text-gray-600 hover:underline">
                Leaderboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          ← Back
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Invite Network</h1>
          <p className="text-gray-600">
            See who invited whom—building trust through transparent connections
          </p>
        </div>

        {!lineage ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No lineage data available</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Inviter */}
            {lineage.inviter && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Invited By</h2>
                <div
                  onClick={() => router.push(`/creators/${lineage.inviter!.id}`)}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    {lineage.inviter.avatarUrl ? (
                      <img
                        src={lineage.inviter.avatarUrl}
                        alt={lineage.inviter.displayName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-600">
                        {lineage.inviter.displayName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{lineage.inviter.displayName}</h3>
                    <p className="text-sm text-gray-600">View Profile →</p>
                  </div>
                </div>
              </div>
            )}

            {/* Invitees */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Creators Invited ({lineage.invitees.length})
              </h2>

              {lineage.invitees.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No invites sent yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lineage.invitees.map((invitee) => (
                    <div
                      key={invitee.id}
                      onClick={() => router.push(`/creators/${invitee.id}`)}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                        {invitee.avatarUrl ? (
                          <img
                            src={invitee.avatarUrl}
                            alt={invitee.displayName}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-bold text-gray-600">
                            {invitee.displayName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{invitee.displayName}</h3>
                        <p className="text-sm text-gray-600">
                          Joined {new Date(invitee.usedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Network Visualization Placeholder */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-12 text-center">
              <Users className="h-20 w-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Network Graph Coming Soon</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're building an interactive visualization to show the full invite network and how creators are connected.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
