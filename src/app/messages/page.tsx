"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Thread {
  id: string;
  participants: Array<{
    id: string;
    displayName: string;
    avatarUrl: string | null;
  }>;
  lastMessage: {
    content: string;
    createdAt: string;
    senderId: string;
  } | null;
  unreadCount: number;
  updatedAt: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  generatedByAi: boolean;
  createdAt: string;
  sender: {
    id: string;
    displayName: string;
    avatarUrl: string | null;
  };
}

export default function MessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedThreadId = searchParams.get("thread");
  const { data: session, isPending } = useSession();
  
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetchThreads();
    }
  }, [session]);

  useEffect(() => {
    if (selectedThreadId && threads.length > 0) {
      const thread = threads.find(t => t.id === selectedThreadId);
      if (thread) {
        setSelectedThread(thread);
        fetchMessages(thread.id);
      }
    }
  }, [selectedThreadId, threads]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchThreads = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/threads", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setThreads(data.threads || []);
      }
    } catch (error) {
      console.error("Error fetching threads:", error);
      toast.error("Failed to load conversations");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (threadId: string) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/threads/${threadId}/messages`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread) return;

    setIsSending(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          threadId: selectedThread.id,
          content: newMessage.trim(),
        }),
      });

      if (response.ok) {
        setNewMessage("");
        await fetchMessages(selectedThread.id);
        await fetchThreads();
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

  const getOtherParticipant = (thread: Thread) => {
    return thread.participants.find(p => p.id !== session?.user?.id);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
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
                onClick={() => router.push("/discover")}
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

      <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {/* Threads List */}
          <div className="md:col-span-1 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-bold">Messages</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              {threads.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No conversations yet</p>
                  <p className="text-sm mt-2">Start by messaging a creator</p>
                </div>
              ) : (
                threads.map((thread) => {
                  const other = getOtherParticipant(thread);
                  if (!other) return null;

                  return (
                    <div
                      key={thread.id}
                      onClick={() => {
                        setSelectedThread(thread);
                        fetchMessages(thread.id);
                        router.push(`/messages?thread=${thread.id}`);
                      }}
                      className={`px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                        selectedThread?.id === thread.id ? "bg-gray-100" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          {other.avatarUrl ? (
                            <img
                              src={other.avatarUrl}
                              alt={other.displayName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-bold text-gray-600">
                              {other.displayName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{other.displayName}</h3>
                            {thread.unreadCount > 0 && (
                              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                                {thread.unreadCount}
                              </span>
                            )}
                          </div>
                          {thread.lastMessage && (
                            <p className="text-sm text-gray-600 truncate">
                              {thread.lastMessage.content}
                            </p>
                          )}
                          {thread.lastMessage && (
                            <p className="text-xs text-gray-400 mt-1">
                              {formatTime(thread.lastMessage.createdAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Messages View */}
          <div className="md:col-span-2 border border-gray-200 rounded-lg overflow-hidden flex flex-col">
            {selectedThread ? (
              <>
                {/* Thread Header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const other = getOtherParticipant(selectedThread);
                      if (!other) return null;

                      return (
                        <>
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {other.avatarUrl ? (
                              <img
                                src={other.avatarUrl}
                                alt={other.displayName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-lg font-bold text-gray-600">
                                {other.displayName.charAt(0)}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold">{other.displayName}</h3>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No messages yet</p>
                      <p className="text-sm mt-2">Start the conversation!</p>
                    </div>
                  ) : (
                    <>
                      {messages.map((message) => {
                        const isOwn = message.senderId === session?.user?.id;

                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`max-w-[70%] ${isOwn ? "bg-black text-white" : "bg-gray-100 text-black"} rounded-lg px-4 py-2`}>
                              {message.generatedByAi && (
                                <p className="text-xs opacity-70 mb-1">✨ AI-generated</p>
                              )}
                              <p className="whitespace-pre-wrap">{message.content}</p>
                              <p className={`text-xs mt-1 ${isOwn ? "text-gray-300" : "text-gray-500"}`}>
                                {formatTime(message.createdAt)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      disabled={isSending}
                    />
                    <Button type="submit" disabled={isSending || !newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
