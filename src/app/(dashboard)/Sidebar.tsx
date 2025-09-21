"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, CircleDollarSign, Settings, FileUser, Menu, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/editor", label: "Editor", icon: FileUser },
  { href: "/billing", label: "Billing", icon: CircleDollarSign },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-50 text-foreground w-full">
      <div className={`grid ${isCollapsed ? 'grid-cols-[70px_1fr]' : 'grid-cols-[220px_1fr]'} min-h-screen transition-all duration-300 w-full`}>
        {/* Sidebar with gradient background */}
        <aside 
          className="text-sidebar-foreground border-r border-sidebar-border relative"
          style={{
            background: "linear-gradient(180deg, rgba(79, 70, 229, 0.1) 0%, rgba(100, 49, 221, 0.1) 69.49%, rgba(109, 40, 217, 0.1) 100%)"
          }}
        >
          <div className="h-16 flex items-center px-6 justify-between backdrop-blur-sm bg-white/5">
            {!isCollapsed && (
              <div className="flex items-center gap-2 font-extrabold tracking-tight text-lg text-indigo-800">
                <div className="size-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CV</span>
                </div>
                CVHero
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="h-8 w-8 bg-white/10 hover:bg-white/20 text-indigo-700"
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <Separator className="bg-indigo-200/30" />
          <nav className="p-3">
            <div className="space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-black hover:bg-indigo-500/20 hover:text-indigo-800"
                    } ${isCollapsed ? "justify-center" : ""}`}
                    title={isCollapsed ? label : undefined}
                  >
                    <Icon className="size-5" />
                    {!isCollapsed && label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>
        
        <main className="w-full">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
            {/* <Input 
              className="w-80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400/30" 
              placeholder="Search resumes..." 
            /> */}
            <div className="flex items-center gap-3 ml-auto">
              <UserButton />
            </div>
          </header>
          <div className="p-6 w-full max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}