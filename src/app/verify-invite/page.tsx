"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function VerifyInvitePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnWaitlist, setIsOnWaitlist] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate 6-digit code format
    if (!/^\d{6}$/.test(inviteCode)) {
      toast.error("Please enter a valid 6-digit invite code");
      return;
    }

    setIsLoading(true);

    try {
      // Validate invite code
      const validateResponse = await fetch("/api/invites/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: inviteCode }),
      });

      const validateData = await validateResponse.json();

      if (validateResponse.ok && validateData.valid) {
        // Code is valid - redirect to onboarding with invite code
        toast.success("Invite code verified! Let's set up your profile.");
        router.push(`/onboarding?inviteCode=${inviteCode}`);
      } else {
        // Invalid code - add to waitlist
        const email = session?.user?.email;
        if (email) {
          await fetch("/api/waitlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              email, 
              failedCode: inviteCode 
            }),
          });
        }
        
        toast.error("Invalid invite code. You've been added to our waitlist.");
        setIsOnWaitlist(true);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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

  if (isOnWaitlist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-4xl font-bold">Directory</h1>
            </Link>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-normal mb-4">You're on the Waitlist</h2>
              <p className="text-gray-600 mb-6">
                We couldn't verify your invite code. You've been added to our waitlist and we'll notify you when you can join.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Request an invite from an existing creator or wait for our team to reach out.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-black text-white hover:bg-gray-900"
              >
                Return Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-4xl font-bold">Directory</h1>
          </Link>
          <h2 className="text-3xl font-normal mb-2">Enter Your Invite Code</h2>
          <p className="text-gray-600">
            Please enter your 6-digit invite code to access the platform
          </p>
        </div>

        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div>
            <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-2">
              Invite Code
            </label>
            <input
              id="inviteCode"
              type="text"
              required
              maxLength={6}
              pattern="\d{6}"
              placeholder="000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-center text-2xl tracking-widest font-mono"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.replace(/\D/g, ""))}
            />
            <p className="mt-2 text-xs text-gray-500">
              Enter the 6-digit code provided by your inviter
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading || inviteCode.length !== 6}
            className="w-full bg-black text-white hover:bg-gray-900 py-6 text-base"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an invite code?{" "}
            <button
              onClick={() => setIsOnWaitlist(true)}
              className="font-medium text-black hover:underline"
            >
              Join the waitlist
            </button>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">Invite-only creator network</p>
        </div>
      </div>
    </div>
  );
}