"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get('inviteCode');
  const { data: session, isPending } = useSession();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    niche: "",
    location: "",
    city: "",
    audienceSize: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    xiaohongshu: "",
    bilibili: "",
    douyin: "",
    website: "",
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  // More robust token ensure: fall back to calling get-session endpoint to refresh header-based token
  async function ensureBearerToken() {
    let token = typeof window !== 'undefined' ? localStorage.getItem("bearer_token") : null;
    if (token) return token;

    try {
      // First try via auth client (will attach any existing token and also store new token from header)
      await authClient.getSession();
      token = typeof window !== 'undefined' ? localStorage.getItem("bearer_token") : null;
      if (token) return token;

      // Fallback: directly call the session endpoint to capture header if available
      const res = await fetch('/api/auth/get-session', { method: 'GET' });
      const headerToken = res.headers.get('set-auth-token');
      if (headerToken && typeof window !== 'undefined') {
        localStorage.setItem('bearer_token', headerToken);
        return headerToken;
      }
    } catch (_) {}

    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsLoading(true);

    try {
      const token = await ensureBearerToken();
      
      // Parse audience size (remove commas)
      const audienceSize = parseInt(formData.audienceSize.replace(/,/g, "")) || 0;

      // Build socials object (only include non-empty values)
      const socials: Record<string, string> = {};
      if (formData.instagram) socials.instagram = formData.instagram;
      if (formData.tiktok) socials.tiktok = formData.tiktok;
      if (formData.youtube) socials.youtube = formData.youtube;
      if (formData.xiaohongshu) socials.xiaohongshu = formData.xiaohongshu;
      if (formData.bilibili) socials.bilibili = formData.bilibili;
      if (formData.douyin) socials.douyin = formData.douyin;
      if (formData.website) socials.website = formData.website;

      const buildHeaders = (bearer?: string): HeadersInit => ({
        "Content-Type": "application/json",
        ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      });

      if (!token) {
        toast.error("Your session is not ready yet. Please sign in again.");
        setIsLoading(false);
        return;
      }

      // Create creator profile (with single 401 retry after refreshing session)
      let createResponse: Response;
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        createResponse = await fetch("/api/profile", {
          method: "POST",
          headers: buildHeaders(token),
          body: JSON.stringify({
            displayName: formData.displayName,
            bio: formData.bio,
            niche: formData.niche,
            location: formData.location,
            city: formData.city || undefined,
            audienceSize: audienceSize,
            collabStatus: "open",
            socials: Object.keys(socials).length > 0 ? socials : undefined,
          }),
          cache: 'no-store',
          signal: controller.signal,
        });
        clearTimeout(timeout);
      } catch (err) {
        // Network level failure - surface a clearer message
        const isAbort = (err as any)?.name === 'AbortError';
        toast.error(isAbort ? 'Network timeout. Please try again.' : 'Network error. Please try again.');
        setIsLoading(false);
        return;
      }

      if (createResponse.status === 401) {
        await authClient.getSession();
        const refreshed = typeof window !== 'undefined' ? localStorage.getItem("bearer_token") : null;
        if (refreshed) {
          createResponse = await fetch("/api/profile", {
            method: "POST",
            headers: buildHeaders(refreshed),
            body: JSON.stringify({
              displayName: formData.displayName,
              bio: formData.bio,
              niche: formData.niche,
              location: formData.location,
              city: formData.city || undefined,
              audienceSize: audienceSize,
              collabStatus: "open",
              socials: Object.keys(socials).length > 0 ? socials : undefined,
            }),
            cache: 'no-store',
          });
        }
      }

      if (!createResponse.ok) {
        // If profile already exists, treat as success and continue
        try {
          const data = await createResponse.json();
          if (data?.code === 'PROFILE_EXISTS') {
            // proceed
          } else {
            throw new Error(data?.error || "Failed to create profile");
          }
        } catch (err) {
          if (err instanceof Error) throw err;
          throw new Error("Failed to create profile");
        }
      }

      // Mark invite as used (if inviteCode provided)
      if (inviteCode && session?.user?.id) {
        let useResponse: Response;
        try {
          useResponse = await fetch("/api/invites/use", {
            method: "POST",
            headers: buildHeaders(typeof window !== 'undefined' ? localStorage.getItem("bearer_token") || undefined : undefined),
            body: JSON.stringify({
              code: inviteCode,
              userId: session.user.id,
            }),
          });
        } catch (_) {
          // Non-blocking, log and continue
          console.warn("Network error when marking invite used");
          useResponse = new Response(null, { status: 0 });
        }

        if (useResponse.status === 401) {
          await authClient.getSession();
          const refreshed = typeof window !== 'undefined' ? localStorage.getItem("bearer_token") : null;
          if (refreshed) {
            try {
              useResponse = await fetch("/api/invites/use", {
                method: "POST",
                headers: buildHeaders(refreshed),
                body: JSON.stringify({ code: inviteCode, userId: session.user.id }),
              });
            } catch (_) {
              // still non-blocking
            }
          }
        }
      }

      toast.success("Welcome to Directory! Your profile is ready.");
      router.push("/discover");
    } catch (error) {
      console.error("Onboarding error:", error);
      const message = error instanceof Error ? error.message : "Network error. Please try again.";
      toast.error(message === 'Failed to fetch' ? 'Network error. Please try again.' : message);
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Directory</h1>
          <h2 className="text-2xl font-normal mb-2">Complete Your Profile</h2>
          <p className="text-gray-600">Step {step} of 3</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1">
                <div className={`h-2 ${s <= step ? 'bg-black' : 'bg-gray-200'} ${s === 1 ? 'rounded-l-full' : s === 3 ? 'rounded-r-full' : ''}`} />
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="Your creator name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself and your content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Niche *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                >
                  <option value="">Select your niche</option>
                  {NICHES.map((niche) => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (Country) *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., United States"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g., Los Angeles"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Audience Size *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.audienceSize}
                  onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                  placeholder="e.g., 150000"
                />
                <p className="mt-1 text-xs text-gray-500">Total followers across all platforms</p>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Add your social media handles or profile URLs (optional but recommended)
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TikTok
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.tiktok}
                    onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                    placeholder="@username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                  placeholder="Channel URL"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    小红书 (Xiaohongshu)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.xiaohongshu}
                    onChange={(e) => setFormData({ ...formData, xiaohongshu: e.target.value })}
                    placeholder="Username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bilibili
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.bilibili}
                    onChange={(e) => setFormData({ ...formData, bilibili: e.target.value })}
                    placeholder="Username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Douyin (抖音)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.douyin}
                  onChange={(e) => setFormData({ ...formData, douyin: e.target.value })}
                  placeholder="Username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </>
          )}

          <div className="flex gap-4">
            {step > 1 && (
              <Button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-black hover:bg-gray-300 py-6"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-black text-white hover:bg-gray-900 py-6"
            >
              {isLoading ? "Saving..." : step === 3 ? "Complete Setup" : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}