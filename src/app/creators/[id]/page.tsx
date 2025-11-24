"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Mail, ExternalLink, ArrowLeft, Award, TrendingUp, MessageSquare, UserPlus } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: string;
  points: number;
  earnedAt: string;
}

interface Stats {
  totalPoints: number;
  invitesSent: number;
  collabsCompleted: number;
  messagesSent: number;
  rank: number | null;
}

interface Creator {
  id: string;
  displayName: string;
  bio: string;
  niche: string;
  location: string;
  city: string;
  collabStatus: string;
  skillTags: string[];
  audienceSize: number;
  socials: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    xiaohongshu?: string;
    bilibili?: string;
    douyin?: string;
    website?: string;
  };
  avatarUrl: string | null;
  reputationScore: number;
  lastActive: string;
  badges?: Badge[];
  stats?: Stats;
}

interface InviteLineage {
  inviter: {
    id: string;
    displayName: string;
    avatarUrl: string | null;
  } | null;
  invitees: Array<{
    id: string;
    displayName: string;
    avatarUrl: string | null;
    usedAt: string;
  }>;
}

export default function CreatorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [inviteLineage, setInviteLineage] = useState<InviteLineage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (params.id && session) {
      fetchCreator();
      fetchInviteLineage();
    }
  }, [params.id, session]);

  const fetchCreator = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/profile/${params.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCreator(data);
      } else {
        toast.error("Failed to load creator profile");
      }
    } catch (error) {
      console.error("Error fetching creator:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInviteLineage = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/invites/lineage/${params.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInviteLineage(data);
      }
    } catch (error) {
      console.error("Error fetching invite lineage:", error);
    }
  };

  const handleMessage = async () => {
    if (!creator) return;

    try {
      const token = localStorage.getItem("bearer_token");
      
      const threadResponse = await fetch("/api/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          participantIds: [session?.user?.id, creator.id],
        }),
      });

      if (threadResponse.ok) {
        const { thread } = await threadResponse.json();
        router.push(`/messages?thread=${thread.id}`);
      } else {
        toast.error("Failed to start conversation");
      }
    } catch (error) {
      console.error("Error creating thread:", error);
      toast.error("Something went wrong");
    }
  };

  const formatAudienceSize = (size: number) => {
    if (size >= 1000000) {
      return `${(size / 1000000).toFixed(1)}M`;
    } else if (size >= 1000) {
      return `${(size / 1000).toFixed(0)}K`;
    }
    return size.toString();
  };

  const getSocialLink = (platform: string, value: string) => {
    if (value.startsWith("http")) {
      return value;
    }

    const cleanValue = value.replace("@", "");

    const platformUrls: Record<string, string> = {
      instagram: `https://instagram.com/${cleanValue}`,
      tiktok: `https://tiktok.com/@${cleanValue}`,
      youtube: `https://youtube.com/@${cleanValue}`,
      xiaohongshu: `https://xiaohongshu.com/user/profile/${cleanValue}`,
      bilibili: `https://space.bilibili.com/${cleanValue}`,
      douyin: `https://douyin.com/@${cleanValue}`,
    };

    return platformUrls[platform] || value;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'silver': return 'bg-gray-200 text-gray-800 border-gray-300';
      case 'bronze': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Creator Not Found</h2>
          <p className="text-gray-600 mb-4">This profile doesn't exist or has been removed</p>
          <Button onClick={() => router.push("/discover")}>
            Back to Discovery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Link href="/discover">
                <h1 className="text-2xl font-bold">Directory</h1>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
              {/* Header Section */}
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  {creator.avatarUrl ? (
                    <img
                      src={creator.avatarUrl}
                      alt={creator.displayName}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-gray-600">
                      {creator.displayName.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{creator.displayName}</h1>
                      <p className="text-lg text-gray-600 mb-2">{creator.niche}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{creator.city ? `${creator.city}, ${creator.location}` : creator.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{formatAudienceSize(creator.audienceSize)} fans</span>
                        </div>
                      </div>
                    </div>

                    {creator.collabStatus === "open" && (
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                        OPEN TO COLLAB
                      </span>
                    )}
                  </div>

                  {session?.user?.id !== creator.id && creator.collabStatus === "open" && (
                    <div className="mt-4">
                      <Button
                        onClick={handleMessage}
                        className="flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Message
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">About</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{creator.bio}</p>
              </div>

              {/* Skills */}
              {creator.skillTags && creator.skillTags.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {creator.skillTags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div>
                <h2 className="text-lg font-bold mb-3">Social Media</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {creator.socials.instagram && (
                    <a
                      href={getSocialLink("instagram", creator.socials.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Instagram</span>
                    </a>
                  )}
                  {creator.socials.tiktok && (
                    <a
                      href={getSocialLink("tiktok", creator.socials.tiktok)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">TikTok</span>
                    </a>
                  )}
                  {creator.socials.youtube && (
                    <a
                      href={getSocialLink("youtube", creator.socials.youtube)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">YouTube</span>
                    </a>
                  )}
                  {creator.socials.xiaohongshu && (
                    <a
                      href={getSocialLink("xiaohongshu", creator.socials.xiaohongshu)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">小红书</span>
                    </a>
                  )}
                  {creator.socials.bilibili && (
                    <a
                      href={getSocialLink("bilibili", creator.socials.bilibili)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Bilibili</span>
                    </a>
                  )}
                  {creator.socials.douyin && (
                    <a
                      href={getSocialLink("douyin", creator.socials.douyin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">抖音 (Douyin)</span>
                    </a>
                  )}
                  {creator.socials.website && (
                    <a
                      href={creator.socials.website.startsWith("http") ? creator.socials.website : `https://${creator.socials.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Invite Network */}
            {inviteLineage && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Invite Network
                </h2>

                {inviteLineage.inviter && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Invited by:</p>
                    <div 
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => router.push(`/creators/${inviteLineage.inviter?.id}`)}
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {inviteLineage.inviter.avatarUrl ? (
                          <img src={inviteLineage.inviter.avatarUrl} alt={inviteLineage.inviter.displayName} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <span className="text-lg font-bold text-gray-600">
                            {inviteLineage.inviter.displayName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className="font-medium">{inviteLineage.inviter.displayName}</span>
                    </div>
                  </div>
                )}

                {inviteLineage.invitees.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Invited {inviteLineage.invitees.length} creator{inviteLineage.invitees.length !== 1 ? 's' : ''}:
                    </p>
                    <div className="space-y-2">
                      {inviteLineage.invitees.map((invitee) => (
                        <div 
                          key={invitee.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                          onClick={() => router.push(`/creators/${invitee.id}`)}
                        >
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {invitee.avatarUrl ? (
                              <img src={invitee.avatarUrl} alt={invitee.displayName} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                              <span className="text-lg font-bold text-gray-600">
                                {invitee.displayName.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="font-medium">{invitee.displayName}</span>
                            <p className="text-xs text-gray-500">
                              Joined {new Date(invitee.usedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!inviteLineage.inviter && inviteLineage.invitees.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No invite connections yet</p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            {creator.stats && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Stats
                </h2>
                <div className="space-y-4">
                  {creator.stats.rank && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Leaderboard Rank</span>
                      <span className="text-2xl font-bold">#{creator.stats.rank}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Points</span>
                    <span className="font-bold">{creator.stats.totalPoints}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Collaborations</span>
                    <span className="font-bold">{creator.stats.collabsCompleted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Invites Sent</span>
                    <span className="font-bold">{creator.stats.invitesSent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Messages</span>
                    <span className="font-bold">{creator.stats.messagesSent}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Badges */}
            {creator.badges && creator.badges.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Badges ({creator.badges.length})
                </h2>
                <div className="space-y-3">
                  {creator.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-3 border rounded-lg ${getTierColor(badge.tier)}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{badge.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm">{badge.name}</h3>
                          <p className="text-xs opacity-80">{badge.points} points</p>
                        </div>
                      </div>
                      <p className="text-xs opacity-75 mt-1">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}