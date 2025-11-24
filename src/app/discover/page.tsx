"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const NICHES = [
  "Music", "Art", "Film/Video", "Photography", "Writing/Literature",
  "Design", "Fashion & Style", "Dance", "Comedy & Skits",
  "Technology & Gadgets", "Lifestyle & Wellness", "Gaming & Esports",
  "Fitness & Sports", "Food & Cooking", "Beauty & Makeup",
  "Education & Learning", "Entrepreneurship & Finance", "Family & Parenting",
  "DIY & Home Improvement", "Travel & Adventure", "Science & Explainers",
  "Sustainability & Eco Living", "Pets & Animals", "Business & Marketing",
  "Personal Development & Motivation"
];

const AUDIENCE_RANGES = [
  { label: "All Sizes", min: null, max: null },
  { label: "0-100K", min: 0, max: 100000 },
  { label: "100K-1M", min: 100000, max: 1000000 },
  { label: "1M-10M", min: 1000000, max: 10000000 },
  { label: "10M+", min: 10000000, max: null },
];

interface Creator {
  id: string;
  displayName: string;
  bio: string;
  niche: string;
  location: string;
  city: string;
  collabStatus: string;
  audienceSize: number;
  avatarUrl: string | null;
  reputationScore: number;
}

export default function DiscoverPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    search: "",
    niche: "",
    location: "",
    audienceMin: null as number | null,
    audienceMax: null as number | null,
    collabStatus: "open",
  });

  // New: AI-assisted matching state
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecs, setAiRecs] = useState<Creator[]>([]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetchCreators();
    }
  }, [session, filters]);

  const fetchCreators = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const params = new URLSearchParams();
      
      if (filters.search) params.append("q", filters.search);
      if (filters.niche) params.append("niche", filters.niche);
      if (filters.location) params.append("location", filters.location);
      if (filters.audienceMin !== null) params.append("min_audience", filters.audienceMin.toString());
      if (filters.audienceMax !== null) params.append("max_audience", filters.audienceMax.toString());
      if (filters.collabStatus) params.append("collab_status", filters.collabStatus);

      const response = await fetch(`/api/discover?${params.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCreators(data.creators || []);
      } else {
        toast.error("Failed to load creators");
      }
    } catch (error) {
      console.error("Error fetching creators:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // New: fetch AI recommendations using prompt
  const fetchAIRecommendations = async () => {
    if (!aiQuery.trim()) {
      toast.message("Describe your collab idea first");
      return;
    }
    setAiLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const res = await fetch(`/api/recommendations?q=${encodeURIComponent(aiQuery)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Could not get recommendations");
        return;
      }
      const data = await res.json();
      setAiRecs((data.recommendations || []) as Creator[]);
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch recommendations");
    } finally {
      setAiLoading(false);
    }
  };

  const handleRequestCollab = async (e: React.MouseEvent, creatorId: string, creatorName: string) => {
    e.stopPropagation();
    
    try {
      const token = localStorage.getItem("bearer_token");
      // Updated: API expects participantIds array including current user
      const me = session?.user?.id as string | undefined;
      if (!me) {
        toast.error("You must be signed in");
        return;
      }
      const response = await fetch("/api/collabs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: `Collaboration Request`,
          description: `Hi! I'd love to collaborate with you.`,
          participantIds: [me, creatorId],
        }),
      });

      if (response.ok) {
        toast.success(`Collaboration request sent to ${creatorName}!`);
        // Optionally redirect to messages
        setTimeout(() => router.push("/messages"), 1500);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to send request");
      }
    } catch (error) {
      console.error("Error requesting collab:", error);
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

  const handleLogout = async () => {
    const { authClient } = await import("@/lib/auth-client");
    await authClient.signOut();
    localStorage.removeItem("bearer_token");
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
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
            <Link href="/discover">
              <h1 className="text-2xl font-bold">Directory</h1>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/discover" className="text-sm font-medium hover:underline">
                Discover
              </Link>
              <Link href="/messages" className="text-sm font-medium text-gray-600 hover:underline">
                Messages
              </Link>
              <Link href="/invites" className="text-sm font-medium text-gray-600 hover:underline">
                Invites
              </Link>
              <Link href="/profile" className="text-sm font-medium text-gray-600 hover:underline">
                Profile
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Discover Creators</h2>
          <p className="text-gray-600">
            Connect with verified creators for authentic collaborations
          </p>
        </div>

        {/* New: AI prompt bar */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Describe your collab idea (e.g., flamethrower product launch, rooftop stunt, cinematic short)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
            />
            <Button onClick={fetchAIRecommendations} disabled={aiLoading} className="px-6 bg-black text-white hover:bg-gray-900">
              {aiLoading ? "Finding..." : "Find with AI"}
            </Button>
          </div>
          {aiRecs.length > 0 && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">AI Recommendations</h3>
                <span className="text-xs text-gray-500">Based on: "{aiQuery}"</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiRecs.map((creator) => (
                  <div key={`ai-${creator.id}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div 
                      className="cursor-pointer"
                      onClick={() => router.push(`/creators/${creator.id}`)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {creator.avatarUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={creator.avatarUrl} alt={creator.displayName} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                              <span className="text-base font-bold text-gray-600">{creator.displayName.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{creator.displayName}</h4>
                            <p className="text-xs text-gray-600">{creator.niche}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{creator.bio}</p>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{creator.city || creator.location}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" />{formatAudienceSize(creator.audienceSize)}</span>
                      </div>
                    </div>
                    <Button
                      onClick={(e) => handleRequestCollab(e, creator.id, creator.displayName)}
                      className="w-full mt-4 bg-black text-white hover:bg-gray-900"
                      disabled={creator.collabStatus !== "open"}
                    >
                      {creator.collabStatus === "open" ? "Request Collab" : "Not Available"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search creators..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niche
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={filters.niche}
                    onChange={(e) => setFilters({ ...filters, niche: e.target.value })}
                  >
                    <option value="">All Niches</option>
                    {NICHES.map((niche) => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., United States"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audience Size
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={(e) => {
                      const range = AUDIENCE_RANGES.find(r => r.label === e.target.value);
                      setFilters({
                        ...filters,
                        audienceMin: range?.min || null,
                        audienceMax: range?.max || null,
                      });
                    }}
                  >
                    {AUDIENCE_RANGES.map((range) => (
                      <option key={range.label} value={range.label}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="collabStatus"
                    checked={filters.collabStatus === ""}
                    onChange={() => setFilters({ ...filters, collabStatus: "" })}
                  />
                  <span className="text-sm">All</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="collabStatus"
                    checked={filters.collabStatus === "open"}
                    onChange={() => setFilters({ ...filters, collabStatus: "open" })}
                  />
                  <span className="text-sm">Open to Collab</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading creators...</p>
          </div>
        ) : creators.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No creators found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div 
                  className="cursor-pointer"
                  onClick={() => router.push(`/creators/${creator.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        {creator.avatarUrl ? (
                          <img
                            src={creator.avatarUrl}
                            alt={creator.displayName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-bold text-gray-600">
                            {creator.displayName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{creator.displayName}</h3>
                        <p className="text-sm text-gray-600">{creator.niche}</p>
                      </div>
                    </div>
                    {creator.collabStatus === "open" && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        OPEN
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {creator.bio}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{creator.city || creator.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{formatAudienceSize(creator.audienceSize)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={(e) => handleRequestCollab(e, creator.id, creator.displayName)}
                  className="w-full bg-black text-white hover:bg-gray-900"
                  disabled={creator.collabStatus !== "open"}
                >
                  {creator.collabStatus === "open" ? "Request Collab" : "Not Available"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}