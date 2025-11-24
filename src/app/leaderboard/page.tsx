"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Trophy, Award, TrendingUp, Users, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface LeaderboardEntry {
  rank: number | null;
  creator: {
    id: string;
    displayName: string;
    avatarUrl: string | null;
    niche: string;
    location: string;
  };
  totalPoints: number;
  invitesSent: number;
  collabsCompleted: number;
  messagesSent: number;
  updatedAt: string;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetchLeaderboard();
    }
  }, [session]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/leaderboard?limit=50", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries || []);
      } else {
        toast.error("Failed to load leaderboard");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (rank: number | null) => {
    if (!rank) return null;
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-6 h-6 text-orange-600" />;
    return null;
  };

  if (isPending) {
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
              <Link href="/leaderboard" className="text-sm font-medium hover:underline">
                Leaderboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-gray-600">
            Top creators ranked by activity, invites, and collaborations
          </p>
        </div>

        {/* Top 3 Podium */}
        {!isLoading && entries.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-12">
            {/* 2nd Place */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 text-center flex flex-col items-center justify-end">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-gray-400">
                {entries[1].creator.avatarUrl ? (
                  <img
                    src={entries[1].creator.avatarUrl}
                    alt={entries[1].creator.displayName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-600">
                    {entries[1].creator.displayName.charAt(0)}
                  </span>
                )}
              </div>
              <Trophy className="w-8 h-8 text-gray-400 mb-2" />
              <h3 className="font-bold text-lg mb-1">{entries[1].creator.displayName}</h3>
              <p className="text-sm text-gray-600 mb-2">{entries[1].creator.niche}</p>
              <p className="text-2xl font-bold">{entries[1].totalPoints} pts</p>
            </div>

            {/* 1st Place */}
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 text-center flex flex-col items-center justify-end transform scale-105">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-yellow-500">
                {entries[0].creator.avatarUrl ? (
                  <img
                    src={entries[0].creator.avatarUrl}
                    alt={entries[0].creator.displayName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-600">
                    {entries[0].creator.displayName.charAt(0)}
                  </span>
                )}
              </div>
              <Trophy className="w-10 h-10 text-yellow-500 mb-2" />
              <h3 className="font-bold text-xl mb-1">{entries[0].creator.displayName}</h3>
              <p className="text-sm text-gray-600 mb-2">{entries[0].creator.niche}</p>
              <p className="text-3xl font-bold">{entries[0].totalPoints} pts</p>
            </div>

            {/* 3rd Place */}
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 text-center flex flex-col items-center justify-end">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-orange-600">
                {entries[2].creator.avatarUrl ? (
                  <img
                    src={entries[2].creator.avatarUrl}
                    alt={entries[2].creator.displayName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-600">
                    {entries[2].creator.displayName.charAt(0)}
                  </span>
                )}
              </div>
              <Trophy className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-bold text-lg mb-1">{entries[2].creator.displayName}</h3>
              <p className="text-sm text-gray-600 mb-2">{entries[2].creator.niche}</p>
              <p className="text-2xl font-bold">{entries[2].totalPoints} pts</p>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No leaderboard entries yet</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Creator</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Points</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Invites</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Collabs</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Messages</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr
                      key={entry.creator.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(entry.rank)}
                          <span className="font-bold text-lg">
                            {entry.rank || index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {entry.creator.avatarUrl ? (
                              <img
                                src={entry.creator.avatarUrl}
                                alt={entry.creator.displayName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-bold text-gray-600">
                                {entry.creator.displayName.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold">{entry.creator.displayName}</p>
                            <p className="text-sm text-gray-600">{entry.creator.niche}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="font-bold">{entry.totalPoints}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        {entry.invitesSent}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        {entry.collabsCompleted}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        {entry.messagesSent}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/creators/${entry.creator.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
