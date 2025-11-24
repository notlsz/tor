"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Copy, Check, Gift, Users, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Invite {
  id: string;
  code: string;
  expiresAt: string;
  createdAt: string;
  used: boolean;
  usedBy: {
    id: string;
    displayName: string;
    avatarUrl: string | null;
  } | null;
  usedAt: string | null;
}

export default function InvitesPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [invitesRemaining, setInvitesRemaining] = useState(3);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetchInvites();
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/profile", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInvitesRemaining(data.invitesRemaining || 0);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchInvites = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/invites", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInvites(data.invites || []);
      }
    } catch (error) {
      console.error("Error fetching invites:", error);
      toast.error("Failed to load invites");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateInvite = async () => {
    if (invitesRemaining <= 0) {
      toast.error("No invites remaining");
      return;
    }

    setIsGenerating(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/invites/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ count: 1 }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Invite code generated!");
        setInvitesRemaining(data.invitesRemaining);
        await fetchInvites();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to generate invite");
      }
    } catch (error) {
      console.error("Error generating invite:", error);
      toast.error("Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
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
              <Link href="/invites" className="text-sm font-medium hover:underline">
                Invites
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium text-gray-600 hover:underline">
                Leaderboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Invite Codes</h1>
          <p className="text-gray-600">
            Invite trusted creators to join the network
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="w-8 h-8" />
              <h3 className="text-lg font-bold">Invites Remaining</h3>
            </div>
            <p className="text-5xl font-bold">{invitesRemaining}</p>
            <p className="text-sm text-gray-300 mt-2">
              Generate new invite codes
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-gray-600" />
              <h3 className="text-lg font-bold">Total Invites</h3>
            </div>
            <p className="text-5xl font-bold">{invites.length}</p>
            <p className="text-sm text-gray-600 mt-2">
              Codes generated
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Check className="w-8 h-8 text-green-600" />
              <h3 className="text-lg font-bold">Used Invites</h3>
            </div>
            <p className="text-5xl font-bold">
              {invites.filter(i => i.used).length}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Successfully redeemed
            </p>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-8">
          <Button
            onClick={handleGenerateInvite}
            disabled={isGenerating || invitesRemaining <= 0}
            className="bg-black text-white hover:bg-gray-900"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Gift className="h-5 w-5 mr-2" />
                Generate New Invite Code
              </>
            )}
          </Button>
          {invitesRemaining <= 0 && (
            <p className="text-sm text-gray-600 mt-2">
              You've used all your invites. Invites refill monthly.
            </p>
          )}
        </div>

        {/* Invites List */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Your Invite Codes</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : invites.length === 0 ? (
            <div className="text-center py-12">
              <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No invite codes yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Generate your first invite to grow the network
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {invites.map((invite) => (
                <div key={invite.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-black text-white px-4 py-2 rounded-lg font-mono text-xl font-bold tracking-wider">
                          {invite.code}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyCode(invite.code)}
                          className="flex items-center gap-2"
                        >
                          {copiedCode === invite.code ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Created {new Date(invite.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Expires {new Date(invite.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {invite.used && invite.usedBy && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-green-900">
                                Used by {invite.usedBy.displayName}
                              </p>
                              <p className="text-xs text-green-700">
                                {new Date(invite.usedAt!).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => router.push(`/creators/${invite.usedBy!.id}`)}
                              className="ml-auto text-green-700 hover:text-green-900"
                            >
                              View Profile →
                            </Button>
                          </div>
                        </div>
                      )}

                      {!invite.used && new Date(invite.expiresAt) < new Date() && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm font-medium text-red-900">
                            This code has expired
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      {invite.used ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Used
                        </span>
                      ) : new Date(invite.expiresAt) < new Date() ? (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          Expired
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-3">How Invites Work</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-black mt-1">•</span>
              <span>Each creator receives 3 invite codes to start</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black mt-1">•</span>
              <span>Invite codes expire after 30 days if unused</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black mt-1">•</span>
              <span>Build your network by inviting trusted creators</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black mt-1">•</span>
              <span>Earn points and badges for successful invites</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
