'use client';

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { House, Files, Mail, CircleDollarSign } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();

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
            <img src="logo.png" alt="Logo" className="h-[29px] w-[117px]" />
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
            <span className="text-gray-800 font-medium truncate">
              {user?.fullName}
            </span>
          </div>
        </div>
      </aside>

      <main className="ml-[201px] p-6">
        {/* Top Dashboard */}
        <div className="flex items-center gap-2 text-xl font-semibold">
          <House className="h-6 w-6" />
          <span>Dashboard</span>
        </div>

        {/* Cards */}
        <div className="mt-[36px] flex flex-row gap-3.5">
          <Card className="w-[292px] h-[138px]">
            <CardHeader>
                <CardDescription className="text-[#475569] opacity-50 text-[12px]">Total resumes created </CardDescription>
              <CardTitle>Resumes</CardTitle>
            </CardHeader>
          </Card>
          <Card className="w-[292px] h-[138px]">
            <CardHeader>
                <CardDescription className="text-[#475569] opacity-50 text-[12px]">Total cover letters created</CardDescription>
              <CardTitle>Cover Letters</CardTitle>
            </CardHeader>
          </Card>
          <Card className="w-[292px] h-[138px]">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">Number of views</CardDescription>
              <CardTitle>Resumes Viewed</CardTitle>
            </CardHeader>
          </Card>
          <Card className="w-[292px] h-[138px]">
            <CardHeader>
              <CardDescription className="text-[#475569] opacity-50 text-[12px]">Average score</CardDescription>
              <CardTitle>ATS-score</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
}
