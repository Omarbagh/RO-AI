"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
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

function scorePassword(pw: string): { strong: boolean; label: string } {
  if (pw.length === 0) return { strong: false, label: "" };
  const longEnough = pw.length >= 8;
  const hasNumber = /\d/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  if (longEnough && hasNumber && hasUpper)
    return { strong: true, label: "Sterk wachtwoord" };
  if (longEnough) return { strong: false, label: "Redelijk wachtwoord" };
  return { strong: false, label: "Te kort" };
}

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strength = scorePassword(password);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to Supabase auth (signUp with email/password + name metadata)
  }

  function handleSocial(provider: "google" | "linkedin") {
    // TODO: wire to Supabase OAuth (signInWithOAuth, provider)
    void provider;
  }

  return (
    <div>
      <h1 className="text-[30px] font-medium tracking-[-0.015em] text-foreground">
        Maak je account
      </h1>
      <p className="mb-6 mt-1.5 text-sm text-muted-foreground">
        Gratis. Geen creditcard nodig.
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
          <Label htmlFor="name">Volledige naam</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Sanne Bakker"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          <Label htmlFor="password">Wachtwoord</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Minimaal 8 tekens"
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

        {strength.label ? (
          <p
            className={cn(
              "mt-2 flex items-center gap-1.5 text-xs",
              strength.strong ? "text-success" : "text-muted-foreground",
            )}
          >
            {strength.strong ? <Check className="size-3.5" /> : null}
            {strength.label}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="mt-5 w-full">
          Account aanmaken
        </Button>
      </form>

      <p className="mt-[18px] text-center text-[13px] text-muted-foreground">
        Al een account?{" "}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
          Inloggen
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
