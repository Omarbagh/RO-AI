"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function GoogleMark() {
  return (
    <span
      aria-hidden
      className="inline-block size-[18px] rounded-full"
      style={{
        background:
          "conic-gradient(#EA4335, #FBBC05, #34A853, #4285F4)",
      }}
    />
  );
}

function LinkedInMark() {
  return (
    <span
      aria-hidden
      className="flex size-[18px] items-center justify-center rounded-[4px] bg-[#0A66C2] text-[10px] font-bold leading-none text-white"
    >
      in
    </span>
  );
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to Supabase auth (signInWithPassword with email/password)
  }

  function handleSocial(provider: "google" | "linkedin") {
    // TODO: wire to Supabase OAuth (signInWithOAuth, provider)
    void provider;
  }

  return (
    <div>
      <h1 className="text-[30px] font-medium tracking-[-0.015em] text-foreground">
        Welkom terug
      </h1>
      <p className="mb-6 mt-1.5 text-sm text-muted-foreground">
        Log in om verder te werken aan je cv.
      </p>

      <div className="mb-[22px] flex flex-col gap-2.5">
        <Button
          type="button"
          variant="secondary"
          className="w-full justify-center py-[11px]"
          onClick={() => handleSocial("google")}
        >
          <GoogleMark />
          Doorgaan met Google
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full justify-center py-[11px]"
          onClick={() => handleSocial("linkedin")}
        >
          <LinkedInMark />
          Doorgaan met LinkedIn
        </Button>
      </div>

      <div className="mb-[22px] flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-subtle">of met e-mail</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-3.5 flex flex-col gap-1.5">
          <Label htmlFor="email">E-mailadres</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="sanne.bakker@email.nl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Wachtwoord</Label>
            <Link
              href="/sign-in"
              className="text-xs font-medium text-primary hover:underline"
            >
              Wachtwoord vergeten?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Je wachtwoord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-16"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-3 flex items-center gap-1 text-xs font-medium text-primary"
              aria-label={
                showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"
              }
            >
              {showPassword ? (
                <EyeOff className="size-3.5" />
              ) : (
                <Eye className="size-3.5" />
              )}
              {showPassword ? "Verberg" : "Toon"}
            </button>
          </div>
        </div>

        <Button type="submit" size="lg" className="mt-5 w-full">
          Inloggen
        </Button>
      </form>

      <p className="mt-[18px] text-center text-[13px] text-muted-foreground">
        Nog geen account?{" "}
        <Link href="/sign-up" className="font-semibold text-primary hover:underline">
          Account aanmaken
        </Link>
      </p>

      <p className="mx-auto mt-[18px] max-w-[280px] text-center text-[11px] leading-[1.5] text-subtle">
        Door verder te gaan ga je akkoord met onze{" "}
        <Link href="/terms-of-service" className="underline">
          Voorwaarden
        </Link>{" "}
        en{" "}
        <Link href="/privacy-policy" className="underline">
          Privacy
        </Link>
        .
      </p>
    </div>
  );
}
