"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface WaitlistDialogProps {
  children: React.ReactNode;
}

export function WaitlistDialog({ children }: WaitlistDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Invalid email format");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/join-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message || "Successfully added to waitlist!");
        setEmail("");
        setTimeout(() => {
          setOpen(false);
          setMessage("");
        }, 2000);
      } else {
        setError(data.error || "Failed to join waitlist");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[420px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-medium leading-tight tracking-[-0.177px] text-just_cod-gray">
            Join the Waitlist
          </DialogTitle>
          <DialogDescription className="text-sm font-normal leading-relaxed tracking-[-0.14px] text-just_cod-gray/70 pt-1">
            We're currently in beta. Enter your email and we'll send you a personal invite when spots open up.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-just_cod-gray"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full px-3 py-2.5 border border-just_black-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-just_cod-gray/20 text-sm"
              required
            />
          </div>
          
          {message && (
            <div className="text-sm text-green-600 bg-green-50 p-2.5 rounded-lg">
              {message}
            </div>
          )}
          
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2.5 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-sm cursor-pointer"
          >
            {loading ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
