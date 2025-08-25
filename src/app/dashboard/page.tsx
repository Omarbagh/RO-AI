'use client';

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { House, Files, Mail, CircleDollarSign, ScanText, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import ResumesTable from "./components/ResumesTable";

export default function Dashboard() {
  const [count, setCount] = useState<number>(0);
  const { user } = useUser();
  const userId = user?.id ?? "";

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
      <div
        className="fixed left-0 top-0 w-[201px] h-screen flex flex-col justify-between
                   bg-[linear-gradient(180deg,_#7C3BEE1A_0%,_#7C3BEE1A_100%)]"
      >
        {/* Top: Logo + Menu */}
        <div>
          <div className="flex justify-center mt-6 mb-8">
            <Image src="/logo.png" alt="Logo" className="h-[29px] w-[117px]" width={117} height={29} />
          </div>

          <nav className="flex flex-col gap-1 items-center">
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none cursor-pointer">
              <House className="h-5 w-5" />
              Dashboard
            </Button>
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none cursor-pointer">
              <Files className="h-5 w-5" />
              Resumes
            </Button>
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none cursor-pointer">
              <Mail className="h-5 w-5" />
              Cover Letter
            </Button>
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none cursor-pointer">
              <CircleDollarSign className="h-5 w-5" />
              Billing
            </Button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="ml-[201px] p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between w-full text-xl font-semibold">
          <div className="flex items-center gap-2">
            <House className="h-6 w-6" aria-hidden="true" />
            <span>Dashboard</span>
          </div>
          <UserButton />
        </div>

        {/* Cards */}
        <div className="mt-[36px] flex flex-row gap-3.5">
          <Card className="w-[292px] h-[138px] relative">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">
                Total resumes created
              </CardDescription>
              <CardTitle className="mb-[14px]">Resumes</CardTitle>
              <CardTitle className="text-3xl">{count}</CardTitle>
              <div
                className="absolute bottom-4 right-4 flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#ECDFF9]"
              >
                <Files className="h-5 w-5" />
              </div>
            </CardHeader>
          </Card>


          <Card className="w-[292px] h-[138px] relative">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">
                Total cover letters created
              </CardDescription>
              <CardTitle className="mb-[14px]">Cover Letters</CardTitle>
              <div
                className="absolute bottom-4 right-4 flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#DFF9E2]"
              >
                <Mail className="h-5 w-5" />
              </div>
            </CardHeader>
          </Card>

          <Card className="w-[292px] h-[138px] relative">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">
                Number of views
              </CardDescription>
              <CardTitle className="mb-[14px]">Resumes Viewed</CardTitle>
              <div
                className="absolute bottom-4 right-4 flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#F9E7DF]"
              >
                <CircleDollarSign className="h-5 w-5" />
              </div>
            </CardHeader>
          </Card>

          <Card className="w-[292px] h-[138px] relative">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">
                Average score
              </CardDescription>
              <CardTitle className="mb-[14px]">ATS-score</CardTitle>
              <div
                className="absolute bottom-4 right-4 flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#F9DFF3]"
              >
                <ScanText className="h-5 w-5" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Middle Section Dashboard */}
        <div className="mt-[16px]"> 
          <div className="flex justify-end">
            <div
              className="w-[460px] h-[400px] rounded-2xl flex flex-col items-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(79,70,229,0.1) 0%, rgba(109,40,217,0.1) 100%)",
              }}
            >
              <div className="mt-4">
                <img src="/cardIllustration.png" />
              </div>
              <div className="w-full flex flex-col items-center mt-4">
                <span className="font-semibold text-3xl text-center">
                  Create a new resume
                </span>
                <Link href="/editor">
                  <Button className="mt-2.5 rounded-full w-[140px] bg-[#4F46E5] cursor-pointer">
                    <Plus /> Add resume
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ResumesTable userId={userId} />
      </main>
    </>
  );
}
