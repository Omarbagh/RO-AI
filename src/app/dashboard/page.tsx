'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { House, Files, Mail, CircleDollarSign, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Dashboard() {
  const [count, setCount] = useState<number>(0);
  const { user } = useUser();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/resumes/count", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch count");
        const data = await res.json();
        if (active) setCount(data.count ?? 0);
      } catch {
        if (active) setCount(0);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 w-[201px] h-screen flex flex-col justify-between
                   bg-[linear-gradient(180deg,_#7C3BEE1A_0%,_#7C3BEE1A_100%)]"
      >
        {/* Top: Logo + Menu */}
        <div>
          <div className="flex justify-center mt-6 mb-8">
            <Image src="/logo.png" alt="Logo" className="h-[29px] w-[117px]" width={117} height={29} />
          </div>

          <nav className="flex flex-col gap-1 items-center">
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none">
              <House className="h-5 w-5" />
              Dashboard
            </Button>
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none">
              <Files className="h-5 w-5" />
              Resumes
            </Button>
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none">
              <Mail className="h-5 w-5" />
              Cover Letter
            </Button>
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none">
              <CircleDollarSign className="h-5 w-5" />
              Billing
            </Button>
          </nav>
        </div>

        {/* Bottom: user info */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 p-2 w-[180px] h-[40px] bg-white rounded-full shadow">
            <UserButton />
            <span className="text-gray-800 font-medium truncate" title={user?.fullName ?? ""}>
              {user?.fullName}
            </span>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="ml-[201px] p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between w-full text-xl font-semibold">
          <div className="flex items-center gap-2">
            <House className="h-6 w-6" aria-hidden="true" />
            <span>Dashboard</span>
          </div>

          {/* Add Resume button as link */}
          <Button
            asChild
            className="w-[140px] rounded-full bg-[#4F46E5] text-white hover:bg-[#6D5AE6] relative flex items-center justify-center gap-2"
          >
            <Link href="/editor" aria-label="Add a new resume">
              <Plus className="h-5 w-5" aria-hidden="true" />
              <span>Add Resume</span>
            </Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="mt-[36px] flex flex-row gap-3.5">
          <Card className="w-[292px] h-[138px]">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">
                Total resumes created
              </CardDescription>
              <CardTitle>Resumes</CardTitle>
              <CardTitle className="text-3xl">{count}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="w-[292px] h-[138px]">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">
                Total cover letters created
              </CardDescription>
              <CardTitle>Cover Letters</CardTitle>
            </CardHeader>
          </Card>

          <Card className="w-[292px] h-[138px]">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">
                Number of views
              </CardDescription>
              <CardTitle>Resumes Viewed</CardTitle>
            </CardHeader>
          </Card>

          <Card className="w-[292px] h-[138px]">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">
                Average score
              </CardDescription>
              <CardTitle>ATS-score</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
}
