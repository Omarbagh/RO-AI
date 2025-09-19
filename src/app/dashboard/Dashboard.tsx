"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  House,
  CircleDollarSign,
  Settings,
  FileUser,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

type Resume = {
  id: string;
  data: string;
  template_id: string;
  user_id: string;
  created_at: string;
};

export default function Dashboard() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchResumes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("resumes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching resumes:", error);
        } else if (data) {
          setResumes(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user, isLoaded]);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: House },
    { href: "/editor", label: "Editor", icon: FileUser },
    { href: "/billing", label: "Billing", icon: CircleDollarSign },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-[201px] h-screen flex flex-col justify-between bg-[linear-gradient(180deg,_#7C3BEE1A_0%,_#7C3BEE1A_100%)]">
        <div>
          {/* Logo */}
          <div className="flex justify-center mt-6 mb-8">
            <Image
              src="/logo.png"
              alt="Logo"
              className="h-[29px] w-[117px]"
              width={117}
              height={29}
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 items-center">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="w-full flex justify-center"
                >
                  <Button
                    className={`w-[184px] justify-start gap-2 rounded-full shadow-none cursor-pointer
                      ${
                        isActive
                          ? "text-[#4F46E5] bg-white font-bold"
                          : "text-black bg-transparent hover:bg-white hover:text-[#4F46E5]"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="ml-[201px] p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between w-full text-xl font-semibold mb-6">
          <div className="flex items-center gap-2">
            <House className="h-6 w-6" aria-hidden="true" />
            <span>Dashboard</span>
          </div>
          <UserButton />
        </div>

        {/* Resume carousel */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Resumes</h2>
            <Button asChild>
              <Link href="/editor" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F46E5]"></div>
            </div>
          ) : resumes.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <FileUser className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No resumes
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new resume.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/editor" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Resume
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-4">
                {/* Card to create new resume */}
                <div className="flex-shrink-0 w-64 h-64 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 hover:border-[#4F46E5] transition-colors">
                  <Plus className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    Create new resume
                  </p>
                  <Button asChild variant="ghost" className="mt-4">
                    <Link href="/editor">Create</Link>
                  </Button>
                </div>

                {/* Existing resumes */}
                {resumes.map((resume) => {
                  let data;
                  try {
                    data = JSON.parse(resume.data);
                  } catch (e) {
                    console.error("Error parsing resume data:", e);
                    data = {};
                  }

                  return (
                    <div
                      key={resume.id}
                      className="flex-shrink-0 w-64 h-64 rounded-2xl border bg-white p-4 shadow flex flex-col"
                    >
                      <div className="flex-grow">
                        <div className="font-bold text-lg truncate">
                          {data.personal?.name || "Untitled Resume"}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {data.personal?.title || "No title"}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Created:{" "}
                          {new Date(resume.created_at).toLocaleDateString()}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Template: {resume.template_id || "Default"}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button asChild className="w-full">
                          <Link href={`/editor/${resume.id}`}>Open</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
